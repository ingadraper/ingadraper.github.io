---
name: "Site Design Loop"
description: "Use when: iterating on the Inga Draper site design, judging aesthetics, refining visual polish, reviewing screenshots, or preparing a design change for GitHub Pages deploy."
agent: "agent"
tools: [read, search, edit, execute, agent, todo]
argument-hint: "Describe the site section, concern, or deployment goal"
---

Run an iterative design-quality loop for the Inga Draper real estate site.

## Goal

Improve the actual rendered site until it feels polished, calm, editorial, trustworthy, and conversion-ready for Charlotte-area real estate visitors.

## Brand Direction

Use a refined Lauren Conrad editorial feel: airy, polished, soft, feminine, modern, and credible. The rose palette is inspiration, not a rigid recipe:

- Ivory backgrounds: `#FAF7F2`
- Blush fills: `#F5E6E0`
- Dusty rose accents: `#D4A5A0`
- Deep rose CTAs: `#B05070`
- Burgundy headlines or hover states: `#7A2E48`

Adjust these with warm neutrals, image-forward sections, stronger contrast, and calmer spacing when the page starts to feel monochrome, overly pink, or emotionally heavy.

## Compliance And Content Guardrails

- Refer to Inga as `REALTOR®` when using the professional designation.
- Keep license numbers visible only where they are already part of the compliance pattern.
- Keep repeated public facts in `src/siteConfig.ts`.
- Keep the site static-export friendly for GitHub Pages.
- Do not add runtime secrets, private API calls, databases, server actions, or API routes.

## Loop

1. Inspect the current repo state with `git status --short --branch` and avoid touching unrelated user changes.
2. Run `npm run build` before visual iteration if dependencies are already installed.
3. Start `npm run dev` and review the rendered site, not just source.
4. Capture or observe at least desktop hero, about/image-caption area, YouTube or social proof area, contact form, and one mobile-width viewport.
5. Invoke the `Aesthetic Review` subagent with the rendered observations and ask for prioritized findings.
6. For messaging or conversion concerns, invoke the `Real Estate Brand Coach` subagent.
7. Implement only focused changes that directly address the highest-priority findings.
8. Rebuild with `npm run build`.
9. Recheck the affected desktop and mobile views.
10. Repeat the review and edit cycle up to three times, stopping when no high-priority visual issues remain or when remaining work needs new assets or user decisions.

## Deployment Gate

If the user asked to deploy:

- Confirm the production build passes.
- Commit only the relevant workflow/site changes.
- Do not include unrelated untracked files.
- Push the branch that feeds `.github/workflows/deploy.yml`.
- Report that GitHub Pages deployment is triggered by the push, and mention any local preview URL still running.

## Final Response

Summarize:

- What changed.
- What was visually reviewed.
- Build/deploy status.
- Any remaining design risks or asset needs.
