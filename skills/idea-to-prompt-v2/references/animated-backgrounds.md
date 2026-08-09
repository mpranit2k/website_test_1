# Animated Backgrounds & Motion Mechanics

## Mobile Lag Guard (Crucial)
Use `gsap.matchMedia()` to disable pinning, parallax, or WebGL on viewports `< 768px`. Provide a static CSS fallback (e.g. `overflow-y: auto`, flat gradient) to avoid lag.

## GSAP ScrollTrigger Configurations
- **Pinning**: `pin: true`, `start: "top top"`, `end: "+=100%"` for hero stacks.
- **Scrubbing**: `scrub: 1` for smooth interpolation.

## Framer Motion Springs
When using Framer Motion, avoid default bounces. Use these presets:
- `SPRING_SNAPPY`: `{ type: "spring", stiffness: 260, damping: 26, mass: 0.9 }`
- `SPRING_SOFT`: `{ type: "spring", stiffness: 140, damping: 24, mass: 1.1 }`

## WebGL Memory Cleanup
When using Three.js/R3F:
- Ensure strict memory management.
- Always call `.dispose()` on unmounted geometries, materials, and textures.

## CSS Easings
- `--ease-standard`: `cubic-bezier(0.4, 0.0, 0.2, 1)`
- `--ease-out`: `cubic-bezier(0.0, 0.0, 0.58, 1.0)`
