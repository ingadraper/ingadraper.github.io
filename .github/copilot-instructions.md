## Mission

This repository is a static GitHub Pages landing page for Inga Draper, a Charlotte-area eXp Realty agent. The primary job of the site is to turn QR-code, social, and referral traffic into a clear next step: contact Inga, request a consult, or learn more about her local point of view.

Keep the site static-export friendly. Do not add API routes, server actions, databases, private webhooks, private API keys, or runtime secrets unless the hosting model changes away from GitHub Pages.

## Stack And Hosting

- Astro with TypeScript and Tailwind CSS.
- Production builds export static files to `dist` for GitHub Pages. Local `npm run dev` should remain a normal Astro dev server.
- The custom domain is `ingadraper.com`; `public/CNAME` should continue to contain that value.
- GitHub Pages deploys from the generated `dist` directory via `.github/workflows/deploy.yml`.

## Source Of Truth

- Use `src/siteConfig.ts` for repeated public facts: contact info, public social links, connector URLs, channel labels, and placeholder image URLs.
- Use `docs/link-inventory.md` as the broader log of Inga's public profiles, review sources, channel URLs, and research references. Add new links there first, then decide whether they belong in `src/siteConfig.ts` or the visible UI.
- Avoid hardcoding the same URL or phone/email value across components.
- When Inga provides photos, prefer adding them under `public/images/` and update `siteConfig.images` to local paths such as `/images/inga-hero.jpg`.
- Placeholder images should be tasteful real-estate, Charlotte-area, or polished lifestyle photography that can be swapped without component rewrites.

## Design Standard

Use a refined Lauren Conrad editorial direction: airy, polished, soft, feminine, modern, and credible. The site should feel like a thoughtful real estate advisor, not a generic SaaS dashboard or loud brokerage template.

- Favor quiet editorial layouts, generous whitespace, sharp typography, restrained color, and real visual assets.
- Avoid emoji UI, fake badges, decorative blobs/orbs, bulky gradients, nested cards, and overly rounded pill-heavy interfaces.
- Keep cards to repeated items, modals, or genuinely framed tools. Do not put cards inside cards.
- Buttons and form controls must be easy to read in every state. Watch for low-contrast text on image overlays, translucent backgrounds, pale borders, and hover states that reduce contrast.
- First viewport content should immediately identify Inga and Charlotte-area real estate; do not make a marketing-only landing page before the useful experience.
- Make mobile layouts calm and readable. Text must not overlap, clip, or rely on viewport-scaled font sizes.

## Aesthetic Review Workflow

Use `.github/agents/aesthetic-review.agent.md` when the user asks for visual polish, readability, UI critique, screenshot review, button contrast, spacing, layout balance, or brand/aesthetic alignment. The reviewer should return prioritized findings and suggested fixes before implementation.

Use `.github/prompts/site-design-loop.prompt.md` when the user asks to judge, create, refine, review, or deploy the site design as an iterative workflow. The loop should render the site, gather desktop and mobile observations, ask the aesthetic reviewer for findings, make focused design changes, rebuild, and repeat until no high-priority visual issues remain or the remaining items are clearly deferred.

Treat the rose palette as inspiration rather than a rigid recipe: ivory `#FAF7F2`, blush `#F5E6E0`, dusty rose `#D4A5A0`, deep rose `#B05070`, and burgundy `#7A2E48` should guide the mood, but the finished page should have enough warm neutrals, image clarity, and contrast that it does not read as one-note pink or burgundy.

For meaningful visual work, inspect the page locally with `npm run dev` after edits. Check at least a desktop viewport and a mobile-width viewport when layout, hero, forms, buttons, or image treatments changed.

When asking the aesthetic reviewer for a whole-page opinion, gather rendered screenshots or browser observations first. Include at least the hero, about/image-caption area, YouTube or social proof area, contact form, and one mobile-width view. A source-only review is useful for risks, but it should not be treated as final visual validation.

## Real Estate Brand Coaching Workflow

Use `.github/agents/real-estate-brand-coach.agent.md` when the user asks about Inga's modern real estate image, brand positioning, website effectiveness, conversion messaging, trust signals, public profile consistency, content strategy, lead capture, or what the site needs to convey to be more effective. The coach should return prioritized recommendations before implementation.

## Connector Pattern

GoHighLevel connectors must use public embed/widget values unless hosting changes. Do not put private API keys, bearer tokens, private webhooks, or private GHL endpoints in client code. Preferred environment variables are:

- `PUBLIC_GHL_FORM_URL`
- `PUBLIC_GHL_CALENDAR_URL`
- `PUBLIC_GHL_CHAT_WIDGET_ID`

Public connector values can also be committed in `src/siteConfig.ts`, which is the simplest GitHub Pages path when those values are not secret.

If no GoHighLevel form URL is configured, the contact form should remain usable through the mailto fallback. The form should never show a broken connector state to visitors.

## YouTube Pattern

- Correct channel: `https://www.youtube.com/@ingaintheqc`
- Channel label: `Inga in the QC`
- Keep channel URLs and labels in `src/siteConfig.ts`.
- Static GitHub Pages has no private backend, so do not use a private YouTube API key in client code.
- Featured video: `https://www.youtube.com/watch?v=LYM-e6syfmQ`
- For a manually featured video, copy the latest video ID from YouTube and embed `https://www.youtube.com/embed/VIDEO_ID`.
- For an auto-updating latest-upload embed, use YouTube's public uploads playlist format: replace a channel ID beginning with `UC` with `UU`, then embed `https://www.youtube.com/embed/videoseries?list=UU...`.

## Current Content Facts

- Agent: Inga Draper
- Brokerage: eXp Realty
- Phone: `(704) 560-9101`
- Email: `ingibjorg.draper@exprealty.com`
- YouTube: `https://www.youtube.com/@ingaintheqc`
- Instagram: `https://www.instagram.com/ingaintheqc`
- Facebook: `https://www.facebook.com/profile.php?id=61555586323443`
- Nextdoor: `https://nextdoor.com/page/inga-draper-homes-charlotte-nc`
- Experience.com reviews: `https://www.experience.com/reviews/inga-18104411`
- LinkedIn: `https://www.linkedin.com/in/ingadraper`
- Zillow profile: `https://www.zillow.com/profile/ingaintheqc`
- Service areas: Charlotte, Huntersville, Cornelius, Lake Norman
- Zillow facts currently used: 5.0 rating, 3 total sales, $347K average price

## Validation Expectations

After meaningful changes, run `npm run build`. For visual changes, start `npm run dev` and inspect the page locally before calling the work done.