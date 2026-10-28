#!/usr/bin/env python3
"""Refresh the Highland Creek county-sales snapshot from Mecklenburg County GIS.

Deterministic data collection only: no judgement, no invented values. Updates
`countyComps.sales`, `countyComps.metadata.{asOf,windowStart,sourceCheckedAt}` in
src/data/highland-creek-market.json. The examples' `sourcesChecked`, address-lookup
`properties` list, MLS context and Terra Vista examples are left untouched.

Exit codes: 0 = refreshed or already current, 1 = failure (source error/validation).
Prints `CHANGED=true|false` and `ASOF=<date>` lines for the workflow.
"""
import argparse
import datetime as dt
from html.parser import HTMLParser
import json
import math
from pathlib import Path
import subprocess
import sys
import urllib.parse
import urllib.request

BASE = "https://meckgis.mecklenburgcountync.gov/server/rest/services/"
SALES, PARCELS, SUBDIVS = ("TaxParcelSales/MapServer/0", "TaxParcel_camadata/MapServer/0", "Subdivisions/FeatureServer/0")
DATA = "src/data/highland-creek-market.json"
TODAY = dt.datetime.now(dt.timezone.utc)


def q(path, **p):
    p.setdefault("f", "json")
    expected_ids = None
    oid = ""
    if "outStatistics" not in p and p.get("returnIdsOnly") != "true":
        # ArcGIS spatial returnCountOnly fails on this service. IDs are not
        # subject to its feature limit; reconcile identity, not merely length.
        id_params = {k: v for k, v in p.items() if k not in ("outFields", "returnGeometry")}
        identity = q(path, **id_params, returnIdsOnly="true")
        oid = identity["objectIdFieldName"]
        expected_ids = set(identity["objectIds"])
        fields = p.get("outFields", "*").split(",")
        if "*" not in fields and oid not in fields:
            p["outFields"] = ",".join([*fields, oid])
    req = urllib.request.Request(BASE + path + "/query", data=urllib.parse.urlencode(p).encode(),
                                 headers={"User-Agent": "ingadraper-site-refresh/1.0"})
    # No retry of bad source data. Network/HTTP/JSON errors propagate to the job.
    with urllib.request.urlopen(req, timeout=120) as response:
        r = json.load(response)
    if not isinstance(r, dict) or "error" in r or r.get("exceededTransferLimit"):
        raise ValueError(f"{path}: invalid or paginated county response: {r}")
    if p.get("returnIdsOnly") == "true":
        ids = r.get("objectIds")
        if (not isinstance(r.get("objectIdFieldName"), str) or not r["objectIdFieldName"]
            or not isinstance(ids, list) or any(type(i) is not int for i in ids)
            or len(ids) != len(set(ids))):
            raise ValueError(f"{path}: missing/invalid object IDs")
        return r
    features = r.get("features")
    if not isinstance(features, list) or any(
        not isinstance(f, dict) or not isinstance(f.get("attributes"), dict) for f in features
    ):
        raise ValueError(f"{path}: missing/invalid features")
    if expected_ids is not None:
        actual = [f["attributes"].get(oid) for f in features]
        if (any(type(i) is not int for i in actual) or len(actual) != len(set(actual))
            or set(actual) != expected_ids):
            raise ValueError(f"{path}: incomplete/mismatched object IDs")
    return r


def number(value):
    return type(value) in (int, float) and math.isfinite(value)


def records(response, fields):
    rows = [f["attributes"] for f in response["features"]]
    if any(not set(fields.split(",")).issubset(row) for row in rows):
        raise ValueError("County response missing requested fields")
    return rows


def sales_key(sale):
    return (-dt.date.fromisoformat(sale["saleDate"]).toordinal(), sale["parcelId"], sale["transactionId"])


def normalized_sales(sales):
    return sorted(sales, key=sales_key)


def iso(ms):
    return dt.datetime.fromtimestamp(ms / 1000, dt.timezone.utc).date().isoformat()


def months_back(d, n):
    y, m = d.year, d.month - n
    while m < 1:
        y, m = y - 1, m + 12
    import calendar
    return dt.date(y, m, min(d.day, calendar.monthrange(y, m)[1]))


def main():
    doc = json.loads(Path(DATA).read_text(encoding="utf-8"))
    cc = doc["countyComps"]
    stat = q(SALES, where="1=1", outStatistics=json.dumps([{"statisticType": "max", "onStatisticField": "saledate", "outStatisticFieldName": "m"}]))
    maximum = records(stat, "m")
    if len(maximum) != 1 or not number(maximum[0]["m"]):
        raise ValueError("Invalid county maximum sale date")
    as_of = dt.date.fromisoformat(iso(maximum[0]["m"]))
    start = months_back(as_of, 6)

    g = q(SUBDIVS, where="neighborho='HIGHLAND CREEK' AND type='SFR'", outFields="name", returnGeometry="true")
    if len(g["features"]) < 20:
        raise ValueError(f"Expected ~37 Highland Creek SFR subdivisions, got {len(g['features'])}")
    for f in g["features"]:
        rings = f.get("geometry", {}).get("rings")
        if not isinstance(rings, list) or not rings or any(
            not isinstance(ring, list) or len(ring) < 4 or ring[0] != ring[-1]
            or any(not isinstance(point, list) or len(point) != 2 or not all(map(number, point)) for point in ring)
            for ring in rings
        ):
            raise ValueError("Invalid Highland Creek subdivision geometry")
    geom = {"rings": [r for f in g["features"] for r in f["geometry"]["rings"]], "spatialReference": g["spatialReference"]}
    sr = g["spatialReference"]["latestWkid"]
    if type(sr) is not int or sr <= 0:
        raise ValueError("Invalid county spatial reference")
    sale_fields = "parcelid,transferid,saleprice,saledate,soldasvacantflag,deeddescription,salesvalidity,naldesc,landusefulldescription"
    rows = records(q(
        SALES, where=f"saledate >= date '{start}' AND saledate <= date '{as_of}'", geometry=json.dumps(geom),
        geometryType="esriGeometryPolygon", spatialRel="esriSpatialRelIntersects", inSR=sr,
        outFields=sale_fields, returnGeometry="false"), sale_fields)
    seen = set()
    for row in rows:
        key = (row["parcelid"], str(row["transferid"]))
        if (not isinstance(row["parcelid"], str) or not row["parcelid"].isdigit()
            or not str(row["transferid"]).isdigit() or key in seen
            or not number(row["saledate"]) or not start.isoformat() <= iso(row["saledate"]) <= as_of.isoformat()
            or (row["saleprice"] is not None and not number(row["saleprice"]))
            or any(row[k] is not None and not isinstance(row[k], str) for k in (
                "soldasvacantflag", "deeddescription", "salesvalidity", "naldesc", "landusefulldescription"))):
            raise ValueError("Invalid/duplicate county sale record")
        seen.add(key)
    elig = [x for x in rows
            if "SINGLE FAMILY" in (x["landusefulldescription"] or "").upper()
            and x["soldasvacantflag"] == "No" and (x["saleprice"] or 0) > 0
            and x["deeddescription"] in ("WARRANTY DEED", "SPECIAL WARRANTY DEED")
            and not (x["salesvalidity"] or "").strip() and not (x["naldesc"] or "").strip()]

    ids = sorted({x["parcelid"] for x in elig})
    attrs = {}
    for i in range(0, len(ids), 100):
        w = "parcelid IN (%s)" % ",".join("'%s'" % p for p in ids[i:i + 100])
        parcel_fields = "parcelid,address,loccity,state,yearbuilt,heatedarea,bedrooms,fullbath,halfbath,gisacres,xcoord,ycoord"
        for a in records(q(PARCELS, where=w, outFields=parcel_fields, returnGeometry="false"), parcel_fields):
            if a["parcelid"] not in ids[i:i + 100] or a["parcelid"] in attrs:
                raise ValueError("Unexpected/duplicate county parcel")
            # County publishes these two numeric coordinates as text fields.
            for key, limit in (("xcoord", 90), ("ycoord", 180)):
                if a[key] is not None:
                    value = float(a[key]) if isinstance(a[key], str) else a[key]
                    if not number(value) or not -limit <= value <= limit:
                        raise ValueError("Invalid county coordinate")
                    a[key] = value
            if any(a[k] is not None and not isinstance(a[k], str) for k in ("address", "loccity", "state")) or any(
                a[k] is not None and not number(a[k]) for k in (
                    "yearbuilt", "heatedarea", "bedrooms", "fullbath", "halfbath", "gisacres", "xcoord", "ycoord")
            ):
                raise ValueError("Invalid county parcel attributes")
            attrs[a["parcelid"]] = a
    if set(attrs) != set(ids):
        raise ValueError("Incomplete county parcel response")

    sales = []
    for x in sorted(elig, key=lambda r: (-r["saledate"], r["parcelid"], str(r["transferid"]))):
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
        raise ValueError(f"Only {len(sales)} eligible sales for {start}..{as_of}; refusing to publish a thin snapshot")

    sales = normalized_sales(sales)
    old_key = (cc["metadata"]["asOf"], cc["metadata"]["windowStart"], normalized_sales(cc["sales"]))
    new_key = (as_of.isoformat(), start.isoformat(), sales)
    changed = old_key != new_key
    if changed:
        cc["sales"] = sales
        cc["metadata"]["asOf"] = as_of.isoformat()
        cc["metadata"]["windowStart"] = start.isoformat()
        cc["metadata"]["sourceCheckedAt"] = TODAY.isoformat()

        with open(DATA, "w", encoding="utf-8", newline="\n") as fh:
            json.dump(doc, fh, indent=2, ensure_ascii=False); fh.write("\n")
    print(f"sales={len(sales)} window={start}..{as_of}")
    print(f"CHANGED={'true' if changed else 'false'}")
    print(f"ASOF={as_of.isoformat()}")


class PublicPayload(HTMLParser):
    def __init__(self):
        super().__init__()
        self.active = False
        self.payloads = []

    def handle_starttag(self, tag, attrs):
        if tag == "script" and dict(attrs).get("id") == "hc-public-data":
            self.active = True
            self.payloads.append("")

    def handle_data(self, data):
        if self.active:
            self.payloads[-1] += data

    def handle_endtag(self, tag):
        if tag == "script":
            self.active = False


def verify_payload(html, doc):
    parser = PublicPayload()
    parser.feed(html)
    if len(parser.payloads) != 1:
        raise ValueError("Missing/duplicate hc-public-data payload")
    expected = {"county": doc["countyComps"], "criteria": doc["comparisonCriteria"]}
    if json.loads(parser.payloads[0]) != expected:
        raise ValueError("Live county payload does not match candidate")
    print(f"Verified exact county payload: {len(expected['county']['sales'])} sales, "
          f"{len(expected['county']['properties'])} properties")


def verify_deployment(sha):
    if len(sha) != 40 or any(c not in "0123456789abcdef" for c in sha):
        raise ValueError("Expected full candidate SHA")
    repo = "repos/ingadraper/ingadraper.github.io"

    def api(path):
        return json.loads(subprocess.check_output(["gh", "api", path], text=True))

    # Latest deployment, not an arbitrary historical success for the same date.
    deployments = api(f"{repo}/deployments?environment=github-pages&per_page=1")
    if not deployments or deployments[0]["sha"] != sha:
        raise ValueError("Latest Pages deployment is not the exact candidate SHA")
    statuses = api(f"{repo}/deployments/{deployments[0]['id']}/statuses?per_page=1")
    if not statuses or statuses[0]["state"] != "success":
        raise ValueError("Exact candidate Pages deployment is not successful")
    print(f"Verified successful Pages deployment {deployments[0]['id']} for {sha}")


def cli():
    parser = argparse.ArgumentParser(description=__doc__)
    mode = parser.add_mutually_exclusive_group()
    mode.add_argument("--verify-html", type=Path, help="Verify built hc-public-data against local data")
    mode.add_argument("--verify-live", action="store_true", help="Verify Pages SHA and complete live payload")
    parser.add_argument("--sha", help="Exact deployed candidate commit (required with --verify-live)")
    args = parser.parse_args()
    if args.verify_live:
        if not args.sha:
            parser.error("--verify-live requires --sha")
        verify_deployment(args.sha)
        url = "https://ingadraper.com/highland-creek/?hc-verify=" + args.sha
        request = urllib.request.Request(url, headers={"Cache-Control": "no-cache"})
        with urllib.request.urlopen(request, timeout=120) as response:
            html = response.read().decode("utf-8")
        verify_payload(html, json.loads(Path(DATA).read_text(encoding="utf-8")))
        verify_deployment(args.sha)
    elif args.verify_html:
        verify_payload(args.verify_html.read_text(encoding="utf-8"), json.loads(Path(DATA).read_text(encoding="utf-8")))
    else:
        main()


if __name__ == "__main__":
    cli()
