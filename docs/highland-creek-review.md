# Highland Creek homeowner guide — September 13, 2026

Implementation review note; not a claim of publication. Independent review and a separately authorized release are required.

## Evidence and scope

The [official Highland Creek map](https://www.highlandcreek.com/maps) labels Ridgefield and Bell's Mills as areas within Highland Creek. It does not establish current parcel-level village boundaries. Preserve the map label “Bell's Mills” separately from the street name “Bells Mill Drive.”

Two selected single-family sales are maintained in `src/data/highland-creek-market.json`:

| Address / detail source | Closed | Sale price | Bedrooms | Bathrooms | Size | Cumulative days on market |
| --- | --- | --- | --- | --- | --- | --- |
| [6634 Bells Mill Drive — MLS 4406999](https://www.terravistarealty.com/sold-single-property-details.cfm?PID=4406999) | 2026-09-04 | $425,000 | 3 | 2 full + 1 half | 2,124 sq. ft. | 8 |
| [6408 Fillian Lane — MLS 4374628](https://www.terravistarealty.com/sold-single-property-details.cfm?PID=4374628) | 2026-06-25 | $412,500 | 4 | 2 full + 1 half | 2,019 sq. ft. | 25 |

Both individual detail bodies identify Highland Creek subdivision, Charlotte / Mecklenburg County. The supplied public research was read, including each detail body; these are two records from one provider, not independent corroboration or all local sales. No village assignment, sample median, trend, turnover, projected return, expected marketing time or causal explanation is inferred. The older 7600 Ridgefield Drive sale (June 20, 2025) is excluded; it is not part of this selected sample. No owner data, listing photos or broker remarks are reproduced.

“Sources checked September 13, 2026” means retrieval/review date, not completeness through that date. The selected closing range is June 25–September 4, 2026; the page does not claim these are the latest sales.

## Why the aggregate dashboard was removed

The supplied September 13 research found 261 past-year sales in an extracted [Terra Vista sold-home page](https://www.terravistarealty.com/recently-sold-highland-creek-charlotte.cfm), 258 in repeated live bodies, and 165 in the [neighborhood summary](https://www.terravistarealty.com/neighborhood-nc-charlotte-highland-creek.cfm). Price and active-listing figures also conflicted; the grid used a different time window. Inclusion, geography and update differences were not reconciled. None of those aggregates is substituted for another or presented as a verified consistent snapshot.

## Content, contact and links

- Compact opening and labeled sale cards use shared Playfair Display, Jost and Cormorant Garamond fonts, existing cream/blush/espresso colors and scoped wine accents. Shared styles, footer, eXp artwork and licenses are unchanged.
- Three visible Q&A answers cover maintenance versus cosmetic work, useful comparisons, and checking the official HOA/ARC process before work. Links go to [official community information](https://www.highlandcreek.com/community-info/), the [general ARC request PDF](https://www.highlandcreek.com/wp-content/uploads/2026/04/ARC-Form-General-HCCA-Updated-4.23.26.pdf), and the official map.
- The exact offer remains “Request your complimentary Highland Creek Home Review”: recent comparable sales, a likely price range and practical prep considerations. It is not an appraisal or guaranteed price.
- The action opens an email draft with optional prompts and the existing public business email/phone fallback. Nothing sends until the visitor sends. No automatic consent, response deadline, instant valuation or CRM workflow is asserted.
- Homepage resource card follows services; the selling-page link sits in “Choose a pricing approach.” Both use `/highland-creek/`, without UTMs. No primary-nav item was added.
- Internal offer links use `#home-review`; that section links back to `#snapshot`. The external postcard URL recorded in `docs/link-inventory.md` retains its route, query and anchor. Native fragment navigation preserves incoming queries; there is no runtime attribution rewriting. Query parameters alone establish neither analytics nor GHL delivery.

## Implementation validation

- `npm run build`: passed, 15 generated pages including the 404 page.
- `npm run validate:aeo`: passed, 10 source answers, 7 generated answer routes, 14 total routes.
- Local automated source/output validation: 230 checks passed. Strict JSON keys/types/dates and the exact two records are checked against the supplied public evidence; 10 negative fixtures reject invalid data, aggregates and the excluded record. Built HTML checks cover labeled metrics, source links, canonical/FAQ/entity JSON-LD, internal discovery and anchor targets, mailto subject/body, disclosures, unchanged shared footer, no placeholders and no organic UTMs.
- Headless installed Microsoft Edge tested local production preview at 390×844, 320×740 and 1440×900. No horizontal guide/document overflow; guide links have at least 44px height. Shared fonts and lazy-loaded footer brand images loaded. Keyboard navigation shows a 2px focus outline on the email-draft button.
- At 390×844, the first sale card spans approximately y=491–827px, entirely within the opening viewport. At 320×740, its price is visible by y=703px, while the full card extends below the fold. At 1440×900, both cards fit above the fold.
- Six contextual-link checks passed (homepage and selling page at each width). Local external-campaign entry exposes the Home Review heading; native offer and return links work, and incoming campaign parameters remain unchanged. Font loading can shift the precise initial anchor offset; no script forces a scroll position.
- Sampled text contrast ratios are at least 8.21:1, including the previously low-contrast return/local labels and the wine-section eyebrow. This is computed DOM/color evidence, not a full accessibility certification.

Validation scripts, JSON results and screenshots are retained as local review evidence, not copied into the public site. Run build and AEO validation again after any source change. Keep the same exact-record validation during review; when replacing examples, re-read individual sources and update the checked date explicitly rather than generating it from build time.

## Limits and release gate

The first build exposed an email-line-break string escaping error, which was fixed before the successful build. Playwright's bundled browser was unavailable; existing headless Edge was used without dependency installation. The layout harness was corrected to test keyboard focus via Tab and useful external-anchor arrival rather than demand an exact pixel offset.

Not performed: physical QR scan, email submission/delivery, CRM/consent/analytics testing, independent MLS/deed reconciliation, exhaustive village inventory, cross-browser/device hardware or screen-reader review, visual screenshot certification, brokerage/MLS rights approval, or production deployment verification. Review source attribution/rights and the retained brokerage identity before release. Do not call this published until separate review, explicit publication authorization, deployment and live-target verification are complete.
