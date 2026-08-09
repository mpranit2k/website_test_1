# Style & Technical Defaults

Use these when the user's idea doesn't specify — and always list them under "Assumptions made".

## Tech stack (default)
- React + TypeScript
- Tailwind CSS for styling
- Lucide React for icons
- Framer Motion & GSAP (for animations)

## Typography (Fluid & Scale)
- Font: Inter (weights 400/500/600/700)
- Fluid scale formula: `clamp(min, preferred, max)`
  - H1: `clamp(2rem, 4vw, 3rem)`
  - Body: `clamp(1rem, 1vw, 1.1875rem)`
- Tight tracking (`tracking-tight`) on large display type

## Color (Semantic HSL Tokens)
- Define colors using HSL CSS variables for light/dark mode support.
- Neutral premium register:
  - Base: `hsl(222.2, 84%, 4.9%)` for dark backgrounds.
  - Text: `hsl(210, 40%, 98%)` for foreground text.
  - Accent: High contrast indigo `hsl(226, 71%, 60%)` or similar.

## Glassmorphism & Elevation
- Glass Card: `bg-slate-900/50 backdrop-blur-md border border-white/10`
- Elevation Shadows:
  - `shadow-md`: `0 8px 20px rgba(15, 23, 42, 0.08)`
  - Border Glow: Radial gradient pseudo-element on hover.

## Responsive conventions (default)
- Mobile-first breakpoints: base → md (`768px`) → lg (`1024px`)
- Nav: hamburger on mobile, full menu on md+
- Font sizes step down gracefully.
