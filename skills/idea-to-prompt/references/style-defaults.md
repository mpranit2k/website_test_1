# Style & Technical Defaults

Use these when the user's idea doesn't specify — and always list them under "Assumptions made" when used.

## Tech stack (default)
- React + TypeScript
- Tailwind CSS for styling
- Lucide React for icons
- useState for simple local UI state (menus, toggles, form fields)

## Typography (default)
- Font: Inter, imported from Google Fonts (weights 400/500/600/700)
- Headline scale: text-5xl → text-8xl across breakpoints for hero-level headings
- Body scale: text-base to text-xl for subheadings/body copy
- Tight tracking (tracking-tight / tracking-tighter) on large display type
- leading-none or leading-tight on multi-line large headlines

## Color (default, premium/neutral register)
- Neutral grays (gray-50 to gray-900) as base palette
- One dark accent (near-black, e.g. a custom hex like #202A36) for primary buttons/emphasis
- Avoid saturated brand colors unless the user's idea implies a specific industry palette

## Buttons (default)
- Rounded-full pill buttons for primary premium aesthetic
- Primary: dark bg, white text, hover darkens slightly
- Secondary: light gray bg, dark text, hover darkens slightly
- transition-colors on all interactive elements

## Layout conventions (default)
- Outer container: min-h-screen
- Max content width: max-w-7xl, centered, horizontal padding (px-8 or px-6 on mobile)
- Mobile-first responsive breakpoints: base → md → lg
- Hero sections: h-screen or 100vh, overflow-hidden, flex column structure

## Responsive conventions (default)
- Nav: full menu on md+, hamburger + dropdown below md
- Grids: 1 column mobile → 2-3 columns md/lg
- Font sizes step down at least one Tailwind size step per breakpoint drop

## Motion (default)
- Simple transition-colors / transition-all on hover states
- Avoid heavy animation unless the user's idea signals a playful/dynamic brand
