# Inspiration Directories & Scraper

## Indexed Repositories
- `motionsites.ai`: High-end React scroll narratives, liquid glass CTAs.
- `awwwards.com`: WebGL, 3D product exploders, experimental transitions.
- `godly.website`: Typography-led layouts, minimal magnetic interactions.
- `hover.dev`: Framer Motion addictive hovers and components.
- `codrops`: Experimental GSAP + CSS WebGL filters.

## Zero Assumption Rule
If the user references an inspiration site (e.g. "Like stripe.com") but does not provide exact hex colors or animation numbers, **DO NOT GUESS**.

## Perplexity Scraper Fallback
Generate this exact prompt for the user to run in Perplexity:

```
Act as a Principal Web Design Architect. Perform a deep technical crawl of [INSPIRATION_URL].
Extract:
1. Exact CSS tokens (HSL colors, typography families, clamp formulas).
2. Layout grid specifics (Flex/Grid structures, padding, responsive breakpoints).
3. Animation techniques (GSAP ScrollTrigger configs, Framer Motion spring stiffness/damping, WebGL usage).
Output as structured markdown specs.
```
