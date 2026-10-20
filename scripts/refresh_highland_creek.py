#!/usr/bin/env python3
"""Refresh the Highland Creek county-sales snapshot from Mecklenburg County GIS.

Deterministic data collection only: no judgement, no invented values. Updates
`countyComps.sales`, `countyComps.metadata.{asOf,windowStart,sourceCheckedAt}` and
top-level `sourcesChecked` in src/data/highland-creek-market.json. The address-lookup
`properties` list, MLS context and Terra Vista examples are left untouched.

Exit codes: 0 = refreshed or already current, 1 = failure (source error/validation).
Prints `CHANGED=true|false` and `ASOF=<date>` lines for the workflow.
"""
import datetime as dt, json, sys, urllib.parse, urllib.request

BASE = "https://meckgis.mecklenburgcountync.gov/server/rest/services/"
SALES, PARCELS, SUBDIVS = ("TaxParcelSales/MapServer/0", "TaxParcel_camadata/MapServer/0", "Subdivisions/FeatureServer/0")
DATA = "src/data/highland-creek-market.json"
TODAY = dt.datetime.now(dt.timezone.utc)


def q(path, **p):
    p.setdefault("f", "json")
    req = urllib.request.Request(BASE + path + "/query", data=urllib.parse.urlencode(p).encode(),
                                 headers={"User-Agent": "ingadraper-site-refresh/1.0"})
    for attempt in range(4):
        try:
            r = json.load(urllib.request.urlopen(req, timeout=120))
            if "error" in r:
                raise RuntimeError(r["error"])
            if r.get("exceededTransferLimit"):
                raise RuntimeError(f"{path}: result exceeded transfer limit; paginate before trusting output")
            return r
        except Exception as e:  # noqa: BLE001
            if attempt == 3:
                sys.exit(f"FAIL: {path}: {e}")
            import time; time.sleep(5 * (attempt + 1))


def iso(ms):
    return dt.datetime.fromtimestamp(ms / 1000, dt.timezone.utc).date().isoformat()


def months_back(d, n):
    y, m = d.year, d.month - n
    while m < 1:
        y, m = y - 1, m + 12
    import calendar
    return dt.date(y, m, min(d.day, calendar.monthrange(y, m)[1]))


def main():
    doc = json.load(open(DATA, encoding="utf-8"))
    cc = doc["countyComps"]
    stat = q(SALES, where="1=1", outStatistics=json.dumps([{"statisticType": "max", "onStatisticField": "saledate", "outStatisticFieldName": "m"}]))
    as_of = dt.date.fromisoformat(iso(stat["features"][0]["attributes"]["m"]))
    start = months_back(as_of, 6)

    g = q(SUBDIVS, where="neighborho='HIGHLAND CREEK' AND type='SFR'", outFields="name", returnGeometry="true")
    if len(g["features"]) < 20:
        sys.exit(f"FAIL: expected ~37 Highland Creek SFR subdivisions, got {len(g['features'])}")
    geom = {"rings": [r for f in g["features"] for r in f["geometry"]["rings"]], "spatialReference": g["spatialReference"]}
    sr = g["spatialReference"]["latestWkid"]
    rows = [f["attributes"] for f in q(
        SALES, where=f"saledate >= date '{start}' AND saledate <= date '{as_of}'", geometry=json.dumps(geom),
        geometryType="esriGeometryPolygon", spatialRel="esriSpatialRelIntersects", inSR=sr,
        outFields="parcelid,transferid,saleprice,saledate,soldasvacantflag,deeddescription,salesvalidity,naldesc,landusefulldescription",
        returnGeometry="false")["features"]]
    elig = [x for x in rows
            if "SINGLE FAMILY" in (x["landusefulldescription"] or "").upper()
            and x["soldasvacantflag"] == "No" and (x["saleprice"] or 0) > 0
            and x["deeddescription"] in ("WARRANTY DEED", "SPECIAL WARRANTY DEED")
            and not (x["salesvalidity"] or "").strip() and not (x["naldesc"] or "").strip()]

    ids = sorted({x["parcelid"] for x in elig})
    attrs = {}
    for i in range(0, len(ids), 100):
        w = "parcelid IN (%s)" % ",".join("'%s'" % p for p in ids[i:i + 100])
        for f in q(PARCELS, where=w, outFields="parcelid,address,loccity,state,yearbuilt,heatedarea,bedrooms,fullbath,halfbath,gisacres,xcoord,ycoord",
                   returnGeometry="false")["features"]:
            attrs[f["attributes"]["parcelid"]] = f["attributes"]

    sales = []
    for x in sorted(elig, key=lambda r: (-r["saledate"], r["parcelid"])):
        a = attrs.get(x["parcelid"])
        # Incomplete county records are excluded, as documented in the page's limitations.
        if not a or not all(a.get(k) for k in ("address", "yearbuilt", "heatedarea", "bedrooms", "fullbath", "gisacres", "xcoord", "ycoord")):
            continue
        tid = str(x["transferid"])
        sales.append({
            "parcelId": x["parcelid"], "county": "Mecklenburg",
            "address": " ".join(a["address"].replace(" CHARLOTTE NC", "").split()), "city": (a["loccity"] or "CHARLOTTE").strip(), "state": "NC",
            "latitude": round(float(a["xcoord"]), 8), "longitude": round(float(a["ycoord"]), 8),
            "propertyType": "single-family", "yearBuilt": a["yearbuilt"], "heatedSqFt": a["heatedarea"],
            "bedrooms": a["bedrooms"], "fullBaths": a["fullbath"], "halfBaths": a["halfbath"], "lotAcres": a["gisacres"],
            "sourceUrl": BASE + SALES.rsplit("/0", 1)[0] + "/0",
            "saleDate": iso(x["saledate"]), "salePrice": x["saleprice"], "transactionId": tid,
            "recordUrl": BASE + SALES + "/query?" + urllib.parse.urlencode(
                {"f": "pjson", "where": f"transferid={tid} AND parcelid='{x['parcelid']}'",
                 "outFields": "parcelid,saleprice,saledate,salesvalidity,naldesc", "returnGeometry": "false"}),
            "propertySourceUrl": BASE + PARCELS,
            "withinHighlandCreek": True, "countySaleFlag": "",
        })
    if len(sales) < 20:
        sys.exit(f"FAIL: only {len(sales)} eligible sales for {start}..{as_of}; refusing to publish a thin snapshot")

    old_key = (cc["metadata"]["asOf"], [(s["parcelId"], s["transactionId"], s["salePrice"]) for s in cc["sales"]])
    new_key = (as_of.isoformat(), [(s["parcelId"], s["transactionId"], s["salePrice"]) for s in sales])
    changed = old_key != new_key
    if changed:
        cc["sales"] = sales
        cc["metadata"]["asOf"] = as_of.isoformat()
        cc["metadata"]["windowStart"] = start.isoformat()
        cc["metadata"]["sourceCheckedAt"] = TODAY.isoformat()
        doc["sourcesChecked"] = TODAY.date().isoformat()
        with open(DATA, "w", encoding="utf-8", newline="\n") as fh:
            json.dump(doc, fh, indent=2, ensure_ascii=False); fh.write("\n")
    print(f"sales={len(sales)} window={start}..{as_of}")
    print(f"CHANGED={'true' if changed else 'false'}")
    print(f"ASOF={as_of.isoformat()}")


if __name__ == "__main__":
    main()
