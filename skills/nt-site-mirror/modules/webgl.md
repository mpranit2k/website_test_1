# WebGL / Canvas / 3D Module

Triggers: WebGL, Three.js, React Three Fiber, canvas-rendered scenes, GLSL or shader files, shader-like effects, 3D scenes, GLB/GLTF assets, Draco dependencies, procedural animation systems.

## Discovery additions

- Identify: rendering technology, scene-owner files, canvas placement, viewport and camera behavior, renderer configuration, textures, models, shaders, masks, postprocessing, interaction handlers, and fallback behavior.
- Map GLB/GLTF, Draco, texture, shader, and runtime dependencies. If any are runtime-loaded, also read `modules/runtime-assets.md`.

## Audit additions

Include every WebGL/canvas/shader system in the Animation Audit: triggers, timing, frame behavior, scroll coupling, opacity, transforms, layering, and interaction states.

## Implementation

- Prefer preserving the original motion source when legally and technically possible; otherwise recreate; otherwise document the exact limitation and expected fidelity loss (core Fidelity Gap Rule).
- Never replace a WebGL, canvas, shader, or procedural feature with a static image without user approval (core Approval Gate).

## Validation additions

Verify the effect renders, moves, responds to interaction, resizes, layers correctly, performs acceptably, and matches the source at desktop, tablet, and mobile.
