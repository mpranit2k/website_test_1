# Architecture & QA

## Asset Placeholders
- NEVER hallucinate URLs (e.g. `https://example.com/video.mp4`).
- Use standardized placeholders: `https://placehold.co/600x400` or a gray `div`.

## Component Reusability (Anti-Duplication)
- Do not inline duplicate code.
- Stage 2 & 4 MUST extract UI atoms into reusable base components (e.g. `Button.tsx`, `Badge.tsx`, `Card.tsx`).
- Subsequent stages must import these components.

## Accessibility (a11y)
- Enforce `prefers-reduced-motion: reduce`.
- If triggered, GSAP timelines must seek(1) and WebGL canvases must not render.
- Ensure correct ARIA landmarks (`<main>`, `<nav>`, `<section aria-labelledby="...">`).

## Actionable QA (Stage 10)
- Do not generate vague "QA testing" statements.
- Output exact terminal commands: `npx @axe-core/cli URL` or Lighthouse CLI.
- Provide a literal step-by-step click test checklist for the developer (e.g., "Tab through nav, ensure focus rings appear").
