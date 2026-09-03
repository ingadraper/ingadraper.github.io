# Inga Draper Website — AEO + Professional Realtor Regrade

**Date:** September 3, 2026  
**Canonical site:** <https://ingadraper.com/>  
**Release candidate:** local repository `/home/thor/src/ingadraper.github.io`  
**Production status:** not deployed in this review

## Executive result

| Evaluation | Before | Local release candidate | Production today |
|---|---:|---:|---:|
| AEO / GEO readiness | 60/100 | **94/100 (A)** | **20/100 (F)** until deployment |
| Professional realtor-site quality | 67/100 | **91/100 (A-)** | Older production experience remains live |

The release candidate now balances the two goals: plain-English, decision-oriented content for consumers and explicit, source-backed, machine-readable pages for search and answer engines. The production score remains unchanged because publishing was outside the authorized scope.

## What changed

### AEO and entity architecture

- Repaired malformed canonical/schema URLs and added a production-output validator.
- Re-modeled JSON-LD into separate, linked entities: `Person` (Inga), `RealEstateAgent` (the local service business), `RealEstateOrganization` (eXp Realty LLC), and `WebSite`.
- Linked Article authors to the Person and publishers to the RealEstateAgent entity.
- Added validated Breadcrumb, Article, FAQ (only where visible), CollectionPage, WebPage, and Service semantics.
- Removed homepage FAQ markup whose questions were not visible on the homepage.
- Added a stable Google Business Profile Place-ID URL to visible navigation and `sameAs`.
- Added canonical-domain Open Graph/Twitter images and a branded 1200×630 social asset.
- Corrected `robots.txt`, sitemap, and `llms.txt` consistency through validation.
- Added the validator to the GitHub Pages workflow so crawl/schema drift blocks deployment.

### Consumer content and internal journeys

- Added dedicated `/buying/`, `/selling/`, and `/relocating/` service journeys.
- Each service page opens with a direct answer, explains a concrete process, links to related source-backed guides, and provides a contact path.
- Published one researched draft after complete primary-source review and conservative revisions:
  - Lake Norman investment-property checks
- Kept three higher-risk drafts gated rather than publishing them prematurely:
  - Charlotte-area town comparison pending a complete current source review
  - jurisdiction-specific short-term-rental rules
  - sell/hold/rent tax and landlord-law analysis
- The site now builds seven answer pages plus an Answers hub, three service pages, privacy notice, homepage, and custom 404.

### Professional quality, performance, and trust

- Replaced remote hero/about assets with responsive local WebP sets.
- Replaced generic About imagery with a first-party image of Inga and Charlotte; provenance is recorded.
- Added a privacy-friendly click-to-load YouTube experience. No third-party YouTube frame or cookie loads until the visitor chooses to play.
- Fixed contrast, prohibited ARIA, undescriptive link text, mobile navigation, image dimensions, and responsive image delivery.
- Added visible Google Business Profile and Zillow profile links.
- Corrected the public rating label to **Zillow rating** rather than attributing the observed value to both platforms.
- Removed the context-free `$6.5M+` volume statistic from public display while preserving its prior-verification record for a future primary-record refresh.
- Added the licensed firm name **eXp Realty LLC** to compliance output.
- Linked the licensed firm name to eXp Realty's official brokerage homepage in every page footer and added that URL to the brokerage entity.
- Added direct Zillow source links to both displayed reviews and visibly scoped the rating to **5.0 from 2 Zillow reviews, checked September 2026**.
- Recorded the homepage hero's exact Unsplash source URL, source-download SHA-256, license URL, checked date, and non-listing stock-image role in the evidence register.
- Corrected `Lake Norman, NC` from `City` to `Place` in structured service-area data.
- Made the mailto form explicit: entries stay in the browser, open an email draft, are not sent until the user sends, and are no longer erased immediately.
- Added a privacy notice and linked it from both the form and footer.

## AEO / GEO rubric — 94/100

| Category | Weight | Score | Evidence |
|---|---:|---:|---|
| Technical discovery and indexability | 15 | **15** | Canonicals, sitemap, robots, 13 indexable release routes, custom 404, no broken internal routes |
| Answer architecture and retrieval | 18 | **16** | Seven focused answer pages, direct-answer openings, three service journeys, related questions |
| Source quality and claim discipline | 15 | **14** | Primary-source citations, visible checked dates, disclaimers, three unsafe drafts withheld |
| Entity and local authority | 14 | **13** | Person/business/brokerage/site graph, GBP Place ID, licenses, service areas, sameAs links |
| Structured data and semantics | 14 | **14** | Validator confirms URLs, IDs, authors, publisher, dates, FAQ visibility, breadcrumbs, and social metadata |
| Internal linking and consumer journeys | 8 | **8** | Home→service→answer→contact paths; valid local links and fragments |
| Performance, accessibility, renderability | 10 | **10** | Final Lighthouse 98–100 performance and 100 accessibility/SEO on audited release pages |
| Measurement and maintenance | 6 | **4** | CI validator and evidence register exist; Search Console/Bing/GBP analytics still require account-owner access |
| **Total** | **100** | **94** | **A** |

### Why this is not 100

- Search Console, Bing Webmaster Tools, and production citation/traffic monitoring are not connected.
- Two legally or tax-sensitive drafts remain intentionally unpublished pending qualified review, and the town-comparison draft remains gated pending a complete current primary-source review.
- Several third-party profiles contain stale or inconsistent details that require Inga's account access.
- AEO value cannot accrue until the release is deployed and crawled.

## Professional realtor-site rubric — 91/100

| Category | Weight | Score | Evidence |
|---|---:|---:|---|
| Positioning and service clarity | 15 | **15** | Clear Charlotte/Lake Norman positioning and distinct buyer, seller, relocation journeys |
| Trust, identity, and proof | 15 | **14** | Inga imagery, licenses, linked legal brokerage, directly sourced reviews, GBP/Zillow links, documented stock-image provenance; volume claim withheld |
| Consumer usefulness and process | 15 | **15** | Decision-first guidance, plain English, address-specific diligence, fair-housing-safe language |
| Lead conversion and contact | 15 | **10** | Call, email, form, social/profile paths; no live CRM form or calendar without connector details |
| Visual polish and mobile UX | 12 | **12** | Consistent hierarchy, responsive navigation, local optimized images, reviewed mobile layouts |
| Accessibility and performance | 10 | **10** | Lighthouse accessibility 100; explicit controls and labels; production-preview performance 98–100 |
| Compliance and claim discipline | 10 | **9** | Legal firm name, license line, Equal Housing, privacy, cautious claims; SC primary refresh remains due |
| Local credibility and maintenance | 8 | **6** | GBP and Charlotte entity signals are present; off-site profile cleanup remains owner-gated |
| **Total** | **100** | **91** | **A-** |

## Measured performance

All final scores below were measured against the production build served by `astro preview`, not the development server.

| Audit | Before | Final |
|---|---|---|
| Home, mobile | Perf 60 / A11y 92 / SEO 92; LCP 10.6 s | **Perf 99 / A11y 100 / Best Practices 100 / SEO 100 / Agentic 100; LCP 1.9 s** |
| Answer, mobile | Perf 68 / A11y 95 / SEO 92; LCP 6.3 s | **Perf 99 / A11y 100 / Best Practices 100 / SEO 100 / Agentic 100; LCP 1.8 s** |
| Home, desktop | Perf 81 / A11y 92 / Best Practices 96 / SEO 92; LCP 2.4 s | **100 in all five categories; LCP 0.5 s** |
| Relocation, mobile | New | **Perf 98 / A11y 100 / Best Practices 100 / SEO 100; LCP 1.8 s, CLS 0.074** |

## Verification evidence

- `npm run build` — **passed**, 14 static pages built.
- `npm run validate:aeo` — **passed**: 10 source answers, 7 published answer routes, 13 indexable routes.
- Independent generated-output crawl — **passed**: 14 HTML files, 58 image tags, zero missing dimensions, broken local targets/fragments, malformed JSON-LD, or dangling local entity references.
- Click-to-load video test — **passed**: zero iframe before consent; one `youtube-nocookie.com` iframe after activation.
- JSON-LD check — **passed**: no `undefined` URLs; stable Person, RealEstateAgent, brokerage, website, article, and breadcrumb IDs.
- Visual review completed on desktop homepage, mobile homepage, mobile relocation page, and mobile answer page.

## Google Business Profile handling

The supplied Google search URL was CAPTCHA-blocked in anonymous automation, so it was not stored as a canonical identity link. A stable Place ID was corroborated through the existing public review endpoint and the maintainer's attestation:

- Place ID: `ChIJbdGzb90THSMRszXPLr08Jmw`
- Stable profile URL: <https://www.google.com/maps/place/?q=place_id:ChIJbdGzb90THSMRszXPLr08Jmw>
- Review action: <https://search.google.com/local/writereview?placeid=ChIJbdGzb90THSMRszXPLr08Jmw>

The website links the profile and uses the stable profile URL for entity resolution. It does **not** claim a current Google rating because the anonymous response did not expose one.

## Durable verification artifacts

- `docs/evidence/README.md`
- `docs/evidence/claims-2026-09-03.json`
- `docs/link-inventory.md`
- Obsidian: `projects/Inga Website AEO Rubric.md`

These artifacts distinguish official verification, current public corroboration, owner/maintainer attestation, and items requiring a controlled refresh. Evidence is preserved even when a claim is not currently displayed.

## Remaining owner-gated work

1. Approve deployment/push, then read back every live route and submit the sitemap.
2. Provide the GoHighLevel form/calendar/chat IDs if CRM delivery and scheduling should replace the honest mailto fallback.
3. Confirm GBP display name, category, phone, service area, website, and current review count while signed into Inga's own profile.
4. Correct Zillow's stale YouTube link, Homes.com's stale phone/history, and optionally claim the Experience.com profile.
5. Save a dated primary MLS/brokerage production record before restoring a sales-volume statistic.
6. Connect Search Console and Bing Webmaster Tools under explicit account-owner approval.

## Research basis

- Google Search Central, AI optimization: <https://developers.google.com/search/docs/fundamentals/ai-optimization-guide>
- Google Search Central, AI features: <https://developers.google.com/search/docs/appearance/ai-features>
- Google structured-data policies: <https://developers.google.com/search/docs/appearance/structured-data/sd-policies>
- Google organization markup: <https://developers.google.com/search/docs/appearance/structured-data/organization>
- Schema.org `RealEstateAgent`: <https://schema.org/RealEstateAgent>
- Bing Webmaster Tools, AI Performance: <https://blogs.bing.com/webmaster/February-2026/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview>
- OpenAI crawler controls: <https://platform.openai.com/docs/bots>
- web.dev Core Web Vitals: <https://web.dev/articles/vitals>
- NCREC Tech Corner: <https://bulletins.ncrec.gov/tech-corner-2/>
- NAR fair-housing advertising guidance: <https://www.nar.realtor/fair-housing-corner/create-advertisements-with-fair-housing-in-mind>
