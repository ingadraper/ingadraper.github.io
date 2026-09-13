# Inga Draper Link Inventory

Use this file as the broader reference log for Inga's public profiles, review sources, channel URLs, and marketing references. Add new links here first, then decide whether each link belongs in `src/siteConfig.ts`, a visible page section, or internal research only.

## How To Use

- `src/siteConfig.ts`: public facts or links reused by the live site.
- Visible UI: high-signal links that help a visitor take action or trust Inga.
- This document only: references that help future research, SEO checks, content writing, or profile cleanup but do not need to appear on the landing page.

## Live Site And Contact

| Item | URL or Value | Use | Notes |
| --- | --- | --- | --- |
| Website | https://www.ingadraper.com | Live site | Custom domain for GitHub Pages. |
| GitHub Pages domain | https://ingadraper.github.io | Internal reference | Repository Pages address. |
| Phone | (704) 560-9101 | Live site | Keep in `src/siteConfig.ts`. |
| Email | ingibjorg.draper@exprealty.com | Live site | Keep in `src/siteConfig.ts`. |
| Brokerage | eXp Realty LLC | Live site | Licensed firm name shown in compliance output; brand assets use eXp Realty. |

## Highland Creek Homeowner Resource

Reviewed September 13, 2026. See `docs/highland-creek-review.md` for scope, source conflicts, and validation limits.

| Item | URL | Use | Notes |
| --- | --- | --- | --- |
| Homeowner guide | https://ingadraper.com/highland-creek/ | Contextual homepage card after services; selling-page pricing card | For Ridgefield and Bell's Mills homeowners in Highland Creek. Normal internal links use `/highland-creek/`, without UTMs; no primary-navigation addition. |
| Home Review anchor | https://ingadraper.com/highland-creek/#home-review | Internal offer links use `#home-review` | Complimentary review: recent comparable sales, likely price range and practical prep considerations. Email draft only; nothing sends until the visitor sends. |
| Selected sale examples | https://ingadraper.com/highland-creek/#snapshot | Back-link from Home Review | Two selected single-family examples, not a complete village inventory or a claim of the latest sales. |
| External postcard destination | https://ingadraper.com/highland-creek/?utm_source=postcard&utm_medium=direct_mail&utm_campaign=hc_owner5_phase1&utm_content=mailer_1_a#home-review | External campaign/QR reference only | Route, query and anchor retained. Not used on ordinary internal links. Physical artwork not scanned; query parameters do not prove analytics, consent or CRM delivery. |
| 6634 Bells Mill Drive, MLS 4406999 | https://www.terravistarealty.com/sold-single-property-details.cfm?PID=4406999 | Individual sale detail source | Closed September 4, 2026; source identifies Highland Creek, not a proven Bell's Mills parcel assignment. |
| 6408 Fillian Lane, MLS 4374628 | https://www.terravistarealty.com/sold-single-property-details.cfm?PID=4374628 | Individual sale detail source | Closed June 25, 2026; same provider and subdivision, not independent corroboration. |
| Official HOA resources | https://www.highlandcreek.com/community-info/ | Homeowner Q&A | Association site navigation includes ARC information and design guidelines; check current project requirements before work. |
| General architectural approval request | https://www.highlandcreek.com/wp-content/uploads/2026/04/ARC-Form-General-HCCA-Updated-4.23.26.pdf | Official ARC form (PDF) | Linked from the association's ARC menu when checked. Project-specific rules and forms may differ. |
| Official community maps | https://www.highlandcreek.com/maps | Geographic context | Official map labels Ridgefield and Bell's Mills within Highland Creek; not current parcel-level boundary evidence. |

## Brand And Design References

| Item | URL | Use | Notes |
| --- | --- | --- | --- |
| eXp Realty brand guide | https://www.canva.com/design/DAGdJKsWnpg/j4RnyVFqu4jTHTslj1Icjw/view?utm_content=DAGdJKsWnpg&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=hb25cfc0b7b#1 | Design reference | 2026 guide: black/white logo usage, clear space, eXp color palette, Manrope headlines, Roboto body copy. |

## Social And Video

| Item | URL | Use | Notes |
| --- | --- | --- | --- |
| YouTube channel | https://www.youtube.com/@ingaintheqc | Live site | Correct channel label: Inga in the QC. |
| Featured YouTube video | https://www.youtube.com/watch?v=LYM-e6syfmQ | Live site | Embedded in the YouTube section. |
| Instagram | https://www.instagram.com/ingaintheqc | Live site | User-provided current profile. |
| Facebook | https://www.facebook.com/profile.php?id=61555586323443 | Live site | User-provided current profile. |
| LinkedIn | https://www.linkedin.com/in/ingadraper | Reference or footer | Useful for professional credibility. |
| Nextdoor | https://nextdoor.com/page/inga-draper-homes-charlotte-nc | Reference | User-provided; fetch returned a temporary 502 on 2026-05-17. |
| Google Business Profile | https://www.google.com/maps/place/?q=place_id:ChIJbdGzb90THSMRszXPLr08Jmw | Live site | Stable Place ID corroborated on 2026-09-03; exact rating was not asserted from CAPTCHA-limited anonymous access. |

## Reviews And Trust Sources

| Item | URL | Use | Notes |
| --- | --- | --- | --- |
| Zillow profile | https://www.zillow.com/profile/ingaintheqc | Live site | Checked 2026-09-03: public surfaces corroborate a 5.0 rating and 2 reviews; transaction totals vary by indexed surface and are not used as a claim. |
| Experience.com reviews | https://www.experience.com/reviews/inga-18104411 | Research only | Checked 2026-09-03: profile is presented as unclaimed; do not use as a primary factual source. |
| Google review action | https://search.google.com/local/writereview?placeid=ChIJbdGzb90THSMRszXPLr08Jmw | Optional future review CTA | Stable Place-ID action; requires Google sign-in to leave a review. |

## Connector And CRM References

| Item | URL or Value | Use | Notes |
| --- | --- | --- | --- |
| GoHighLevel form URL | Pending | Live site when available | Must be a public embed URL, not a private webhook or API endpoint. |
| GoHighLevel calendar URL | Pending | Live site when available | Public scheduling URL can go in `src/siteConfig.ts`. |
| GoHighLevel chat widget ID | Pending | Live site when available | Public widget ID can go in `src/siteConfig.ts`. |

## Content Facts To Recheck Periodically

| Fact | Current Value | Source | Notes |
| --- | --- | --- | --- |
| Service areas | Charlotte, Huntersville, Cornelius, Lake Norman | Zillow and site copy | Also mentions surrounding areas. |
| Zillow rating | 5.0 | Zillow | Recheck before publishing major updates. |
| NC license | 351209, active full broker | NCREC | Official lookup checked 2026-09-03. |
| SC license | 147132 | Maintainer attestation / prior verification | Retain; refresh against the official SC lookup when the anti-bot challenge can be completed by the owner. |
| Licensed firm | eXp Realty LLC | NCREC | NCREC identifies primary firm C22682 EXP REALTY LLC. |
| Sales volume | $6.5M+ | Prior maintainer verification | Evidence retained in `docs/evidence/`; not currently displayed until a dated primary record is stored. |

## Link Selection Guidance

Do not show every link just because we have it. Prioritize links that help visitors trust Inga or take the next step.

Recommended visible links:
- Phone and email.
- YouTube channel and featured video.
- Instagram and Facebook.
- Zillow profile for reviews.
- Google Business Profile.

Recommended internal-only or secondary links:
- Nextdoor, unless the profile becomes an active local referral source.
- Experience.com until Inga claims or corrects the profile.
- LinkedIn, unless the page needs a professional credibility link in the footer.
- Any profile that is stale, gated, duplicated, or inconsistent with the current brand.