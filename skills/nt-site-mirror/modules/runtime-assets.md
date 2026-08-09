# Runtime Asset Graph Module

Triggers: dynamic imports, lazy-loaded chunks, runtime-loaded assets (video, audio, shaders, GLB/GLTF, textures), Draco dependencies, provider-loaded embeds, assets that appear only after scroll, hover, click, route transition, media playback, intro/start screens, game/app interaction, or other obvious runtime triggers.

Do not assume the initially loaded page contains all required assets.

## Discovery additions

- Run `scripts/capture_assets.py <url>` to capture the network-level asset graph including scroll-triggered loads. Use its JSON output as evidence in the Discovery report.
- Go beyond first-load and scroll. Exercise hover, click, route transitions, media playback, intro/start screens, game/app interaction, and other obvious runtime triggers that may reveal additional assets.
- From the capture and from authorized source inspection, identify: dynamic imports, lazy chunks, runtime-loaded media and models, decoder/shader/texture dependencies, and the interaction/scroll/route/media triggers that load them.
- Scan downloaded JS/CSS bundles for runtime asset references and loaders, including `import(`, `new Worker`, `new URL(`, `import.meta.url`, and `fetch(`. Look for `.wasm`, `.glb`, `.gltf`, `.ktx`, `.ktx2`, `.hdr`, `.exr`, `.drc`, `.bin`, `.mp3`, `.ogg`, `.woff`, and `.woff2`.
- Source repos, source maps, exposed build artifacts, and manifests may be used only in authorized contexts and only for route/asset verification and completeness checks, not to reconstruct or copy proprietary source code.
- Resolve confirmed runtime asset URLs against the original source origin and feed them into `scripts/mirror_assets.py --extra-urls <file>`. The same authorization, provider, license, and Asset Classification gates apply.
- Before implementing an affected feature, verify the complete runtime asset graph is known. Record source URLs or code paths; list blocked or unresolved dependencies in Risks.

## Validation additions

Trigger the interactions and scroll states that load runtime assets. Verify interaction-triggered assets load, no critical chunks/models/textures/audio/video/fonts are missing, and no unapproved external dependency is required for the mirrored experience.

During local validation with `scripts/serve.py`, treat 404 log lines as missing-local-asset evidence. For each missing local path, resolve it against the original source origin, download it with `scripts/mirror_assets.py --extra-urls <file>` if authorized, or classify it as blocked, kept external, unknown, or another applicable Asset Classification. Repeat until interactions stop surfacing missing files.

Every blocked dependency must be documented as `Fidelity Gap`, `Unknown`, or an approved approximation.
