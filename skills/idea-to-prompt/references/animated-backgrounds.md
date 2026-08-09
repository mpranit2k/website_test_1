# Animated Backgrounds

Animated backgrounds are a **tech-stack/implementation choice**, not a media asset. Never generate an actual video or image file for these — always describe the technique precisely enough that a coding model or developer can implement it from the spec alone.

## Choosing the approach

| Signal in the idea | Approach |
|---|---|
| clean, minimal, premium, calm, corporate, editorial | CSS/SVG |
| futuristic, immersive, tech, gaming, data, "3D", experimental, high-energy | Canvas/WebGL |
| no strong signal | Default to CSS/SVG (cheaper, safer default, better performance/accessibility) |

State the choice explicitly in the output, e.g.: *"Animated background: CSS-based gradient blob animation (no WebGL) — chosen for the clean/premium tone of the brief."*

## CSS/SVG spec template

When specifying this approach, cover:
- **Base**: gradient direction/colors, or SVG shape set
- **Motion**: what moves and how (drift, pulse, rotate, morph) — describe direction/speed qualitatively (e.g. "slow, 20s ease-in-out loop") since exact keyframe values are an implementation detail the coding model can fill in
- **Layering**: how many layers, z-index relative to content, blur/opacity if layered under text
- **Reduced motion**: note `prefers-reduced-motion` fallback (freeze or slow the animation)
- **Library** (optional): none needed for pure CSS; mention Framer Motion only if the idea implies React-driven orchestration beyond CSS keyframes

Example line for the spec:
> Background: animated gradient mesh (3 soft blurred blobs in brand colors), slow independent drift via CSS keyframes, 20-30s loop per blob, blur-3xl, opacity 40-60%, positioned behind content with z-index below text layer. Respect `prefers-reduced-motion` by pausing animation.

## Canvas/WebGL spec template

When specifying this approach, cover:
- **Library**: name one concretely (Three.js, react-three-fiber, OGL, plain Canvas 2D) based on stack — default to react-three-fiber if React is the stated/assumed framework
- **Scene**: what's rendered (particle field, shader gradient, geometric mesh, wireframe)
- **Motion/behavior**: autonomous animation loop description; mouse/scroll reactivity if implied
- **Color**: how colors interpolate or are sourced (brand palette, gradient stops)
- **Performance**: target particle/object count, fallback for low-end devices or reduced-motion (e.g. static gradient image fallback)
- **Placement**: full-bleed behind content, canvas sizing/resize behavior

Example line for the spec:
> Background: WebGL particle field via react-three-fiber, ~800 points drifting slowly upward with slight horizontal noise, colors interpolated between two brand hex values, subtle parallax on mouse move (max 10px offset), full-viewport canvas behind content (z-index below UI layer), static CSS gradient fallback for `prefers-reduced-motion` and low-end/mobile devices.

## Always include regardless of approach

- Where it sits in the DOM/z-index stack relative to content
- Whether it needs to work behind text (contrast/legibility considerations — overlay/scrim if needed)
- Reduced-motion accessibility fallback
