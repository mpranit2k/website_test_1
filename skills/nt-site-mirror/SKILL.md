---
name: nt-site-mirror
description: Capture, validate, audit, mirror, or recreate websites and landing pages with high visual, behavioral, animation, responsive, and asset fidelity. Use when asked to mirror, clone, copy, recreate, rebrand, or migrate a website or landing page. Chooses between Static Mirror Mode and Editable Recreation Mode, inventories routes and assets, verifies in browser, reports fidelity gaps honestly, and distinguishes complete static mirrors from editable recreation candidates.
license: Proprietary. Copyright (c) 2026 NomadaToast. See LICENSE.md.
---

# NT Site Mirror v1.1

Capture, mirror, audit, or recreate websites and landing pages with strict fidelity to the source. The goal is reproduction, validation, and honest editability assessment — not reinterpretation.

This folder contains supporting files. Load them only when directed:

- `modules/` — technology-specific requirements (see Module Dispatch)
- `templates/` — required report formats; fill them, do not re-derive them
- `scripts/` — deterministic helpers (require `pip install playwright && playwright install chromium`; `serve.py` needs only Python 3)

## Mode Selection

Choose a mode before any other work.

- **Static Mirror Mode** — preserve the deployed frontend runtime and reachable assets. Use first ONLY when the user states they own/control the site, have client approval, or are doing staging, migration, internal, or otherwise authorized work.
- **Editable Recreation Mode** — rebuild from observation and user-supplied or approved assets. DEFAULT whenever permission context is unclear. Also the right fit for clean editable source, rebrands, restructuring, deep changes, or when mirroring is blocked, unauthorized, or technically impossible.

Rules:

- Never infer authorization from public availability.
- Never copy proprietary source code or protected assets unless the user provided them or confirmed authorization.
- Do not ask which mode to use unless the goal genuinely requires confirmation. Tool permission requests are allowed; unnecessary strategy questions are not.

## Asset Classification (canonical — referenced by every module)

No asset is automatically downloadable — especially paid fonts, Vimeo, Mux, YouTube, provider-streamed media, external media, and protected assets. Classify every major asset as exactly one of:

`Original` | `Local Copy` | `Embed` | `Kept External` | `User-Supplied Replacement` | `Recreated` | `Recreated From Observation` | `Approximated` | `Blocked`

Local download is allowed only when authorized, licensed, and technically permitted. For each major asset record source URL or code path, chosen status, and why alternatives were rejected, in `templates/asset-preservation-table.md`.

## Core Fidelity Rules

- Fidelity — visual, behavioral, animation, responsive, asset — is the primary objective.
- Do not redesign, modernize, simplify, invent layouts, replace animations, or remove media unless the user explicitly asks.
- Never silently replace, disable, freeze, remove, or downgrade a major source feature. Treat visible motion, media, and audio as fidelity assets.
- Prefer observable evidence over assumption. Never invent files, components, routes, libraries, or assets; mark anything unverified as Unknown.
- Output findings before implementation. Never write implementation code during Discovery.
- Editable Recreation Mode: build one section at a time, never the whole site in one pass.

## Honesty Rules

- **Fidelity Gap Rule** — if a visible or audible source feature is absent, frozen, disabled, broken, replaced, or substantially downgraded in the result: the section is not complete, validation fails, the gap is documented as a `Fidelity Gap`, and the user is informed. Validation passes only after the user acknowledges or approves the gap.
- **Approval Gate** — when a major feature requires approximation: fill the Asset Preservation Table, explain the fidelity impact, present the options (Preserve / Extract / Recreate / Approximate), and wait for user approval before implementing the approximation. In Static Mirror Mode, attempt preservation BEFORE asking to approximate — never ask to approximate WebGL/canvas effects before attempting authorized preservation.
- **Completion Integrity** — compiling is not completing. A task is complete only when visuals, animations, and responsiveness match the source at desktop/tablet/mobile, major source systems are present and working, and browser verification passed on observed behavior — not code inspection alone. Otherwise report `Partial Completion`, separating: Completed / Blocked / Approximated / Not Yet Implemented. Never describe an approximation as a recreation or a partial implementation as complete.
- **Fidelity Escalation** — when a feature cannot be recreated with high confidence: stop that feature, name the blocking technology, state what evidence or access is missing, list the available paths, and continue unrelated sections. Never silently approximate.

## Evidence Priority

1. User-provided screen recordings
2. User-provided screenshots
3. Live website
4. Source inspection

Higher priority wins; call out conflicts in Risks. Separate all findings into **Facts** (observed), **Assumptions** (unverified), **Unknowns** (need investigation).

## Workflow

**Phase 1 — Discovery.** Fill `templates/discovery-report.md`. It requires: Scope Classification (`Hero Only` | `Homepage` | `Landing Page` | `Multi-Route Site` | `Portfolio Site` | `Application`); stack and styling architecture; measured typography, color, spacing, and breakpoints; the Link & Route Inventory (an explicit status for every same-site link — no silently broken local links); the Source Module Inventory in source order (every section, table, pricing/comparison grid, form, legal block, and any hidden, desktop-only, or scroll-loaded module); and the Module Trigger Scan. In Static Mirror Mode, run `scripts/capture_assets.py <url>` to build the runtime asset graph instead of guessing.

**Phase 2 — Animation Audit.** Fill `templates/animation-audit.md` for every meaningful animation. Label estimated timings as estimates.

**Phase 3 — Implementation Plan.** Component hierarchy, file structure, implementation sequence, safe change boundary, asset preservation plan, partial-completion boundaries, and whether Framer Motion alone suffices or GSAP + ScrollTrigger is required. Prefer a shared motion-config layer for repeated durations, easings, and scroll thresholds.

**Phase 4 — Implementation.** Order: navigation → hero → remaining sections → footer, unless the user requested narrower scope. One section at a time: compare against source evidence, fix typography/spacing/layout/motion, and make it responsive before starting the next. If a feature is blocked, apply Fidelity Escalation and keep going on unrelated sections.

**Phase 5 — Validation.** Fill `templates/validation-report.md`. Run `scripts/viewports.py` for desktop/tablet/mobile full-page screenshots of local and source pages; exercise scroll, hover, transitions, loading states, and every active module's checks. In Static Mirror Mode, serve the mirror with `scripts/serve.py`, compare against the live source side by side, and do not declare completion until Deep Static Mirror Discovery has passed.

## Module Dispatch

During Discovery, run a mandatory trigger scan. Read a module file only when its trigger is detected or reasonably suspected. If a feature is suspected but unverified, mark it Unknown and read the module to investigate — never assume absence. Inactive modules add no requirements.

| Trigger detected or suspected | Read |
| --- | --- |
| WebGL, Three.js, R3F, canvas scenes, GLSL/shaders, 3D, GLB/GLTF, Draco | `modules/webgl.md` |
| Background music, ambient/UI sounds, Web Audio API, mute/volume controls | `modules/audio.md` |
| Video files, Vimeo, YouTube, Mux, CDN/background/scroll-linked video | `modules/video.md` |
| Multiple routes, detail pages, app screens, shared/nested layouts, CMS collections | `modules/multi-route.md` |
| Dynamic imports, lazy chunks, runtime-loaded assets, late-loading media | `modules/runtime-assets.md` |

## Static Mirror Mode Specifics

- Pipeline: `scripts/capture_assets.py <url>` (observe the full runtime asset graph including scroll-triggered loads) → `scripts/mirror_assets.py asset-graph.json --authorized "<user-stated context>"` (download the live HTML and authorized same-origin runtime assets — JS chunks, CSS, images, GLB/GLTF, HDR, textures, decoders, manifests — preserving deployed folder paths, and emit `mirror-manifest.json` as the audit trail) → `scripts/serve.py mirror/` → validate.
- The mirror script refuses to run without the user's authorization context and never downloads blocked/protected provider assets; openly licensed fonts may be localized only when authorization/licensing allows (via explicit `--allow-host`). Its `skipped` lists feed the Asset Preservation Table — every entry gets a status.
- Use `--allow-host` only for external hosts the user explicitly confirmed are licensed/authorized (e.g. the client's own CDN).
- Do not manually rebuild sections before attempting the mirror. Fall back to Editable Recreation only if mirroring is blocked, unauthorized, or technically impossible.
- Keep the mirror minimal: no refactoring, redesign, or framework conversion unless explicitly requested.
- The first-load pipeline above is the floor, not the finish. A static mirror may not be declared complete until Deep Static Mirror Discovery (below) has passed.
- For `Multi-Route Site`, `Portfolio Site`, or `Application` scope: capture each in-scope reachable route separately with `scripts/capture_assets.py`, merge graphs where possible, and preserve each route's HTML/path when mirroring into one output folder. Do not overwrite route-specific HTML unless the site is a true SPA shell. A homepage-only capture is not a complete mirror of a multi-route site.

## Deep Static Mirror Discovery (mandatory before declaring a static mirror complete)

First-load network logs are not sufficient evidence of completeness — especially for WebGL, game-like, Vite/SPA, and lazy-loading sites, where critical assets load only after interaction. All five steps below are required. Authorization, licensing, and Asset Classification rules govern every download in every step.

1. **Source/repo discovery (authorized contexts only).** Source repos, source maps, exposed build artifacts, and manifests may be inspected only when the user owns or controls the site, has client approval, or the source/assets are explicitly licensed or authorized for this use. Use these sources for route and asset verification and completeness checks — not for copying proprietary source code or protected assets. Inspect the live page for links to source repos. Probe these candidate URLs on the origin to verify routes and assets: `/manifest.webmanifest`, `/sitemap.xml`, `/robots.txt`, `/asset-manifest.json`, `/.vite/manifest.json`, `/_next/build-manifest.json`, `/package.json`. Warning: SPA servers often return `200` + `index.html` for missing paths — verify content type and body before treating any probe result as a real manifest or `package.json`. Discovery via a repo, manifest, or source map does not by itself authorize copying any of its contents; the Asset Classification and authorization rules govern every download.
2. **Multi-pass asset capture.** Capture asset references from all of: HTML, CSS, JS bundles, manifest files, browser network logs (`scripts/capture_assets.py`), and runtime interactions. Where source maps are available in an authorized context, use them only to verify asset references and route completeness — not to reconstruct or copy proprietary source code. Scan downloaded JS bundles by searching for these concrete patterns: `import(`, `new Worker`, `new URL(`, `import.meta.url`, `fetch(`, and the extensions `.wasm`, `.glb`, `.gltf`, `.ktx`, `.ktx2`, `.hdr`, `.exr`, `.drc`, `.bin`, `.mp3`, `.ogg`, `.woff`, `.woff2`. These surface dynamic imports, lazy chunks, WASM, workers, decoder/transcoder files (e.g. Draco, Basis/KTX2, Meshopt), models, textures, audio, and fonts. Resolve hits against the origin, confirm they exist, and feed confirmed URLs to `scripts/mirror_assets.py --extra-urls <file>` (same authorization and classification gates apply). Never rely only on first-load page requests.
3. **Runtime exploration.** Serve the mirror locally (`scripts/serve.py`) and drive it in a browser beyond the first render: click intro/start buttons, open menus and modals, scroll fully, hover, navigate routes, and perform the obvious app/game interactions where applicable. During local interaction testing, treat the `scripts/serve.py` 404 log lines as the authoritative missing-local-asset list. Resolve local missing paths against the original source origin before passing them to `--extra-urls` — a local 404 for `/assets/car.glb` becomes `https://source-site.com/assets/car.glb`. Download (via `--extra-urls`, subject to classification) or classify each missing same-origin/runtime-critical asset, then repeat validation until interaction stops surfacing missing files.
4. **Offline dependency cleanup.** Localize openly licensed font providers (e.g. Google Fonts — OFL/Apache, self-hostable) when authorization/licensing allows: fetch the provider CSS, download the referenced `.woff2` files, rewrite the `@font-face` URLs to local paths, and classify as `Local Copy`. Paid/protected font providers (Adobe Fonts/Typekit, Monotype, Hoefler&Co) remain never-downloadable — classify them per Asset Classification. Remove or stub analytics/tracking scripts when they are not required for local functionality. Identify every remaining external request and classify it as critical (mirror breaks without it) or harmless fallback.
5. **Validation.** Verify through a local server, never `file://`. Confirm console errors, failed network requests, and missing assets. Search mirrored HTML/CSS/JS for references to the original source host — `https://<source-host>/...` and protocol-relative `//<source-host>/...` — which silently load from the live site during local testing. Rewrite authorized same-origin asset references to local/relative paths where safe, or document each one as an external dependency. Validation with internet access enabled does not prove offline completeness: a complete static mirror must either pass with external network blocked or show that every runtime request resolves locally except explicitly approved harmless fallbacks. Screenshot desktop/tablet/mobile (`scripts/viewports.py`). For interactive/WebGL/game sites, verify actual interaction works — not only that the first canvas renders. Report: asset count, total folder size, missing files, external dependencies, and any known fallbacks.

**Completion standard.** A mirror is not complete just because the homepage visually renders. A complete static mirror must pass offline/local validation after runtime exploration. If the mirror is technically complete but not practically editable (minified bundles, baked build output), report that clearly — completeness and editability are separate claims.

## Static Mirror Acceptance Tiers

Name the tier reached in every Static Mirror report; never present a lower tier as a higher one.

- **First-render mirror** — the homepage renders locally from first-load capture. Not complete: interactions, lazy chunks, and runtime assets are unverified.
- **Complete static mirror** — passed Deep Static Mirror Discovery end to end: multi-pass capture, runtime exploration, offline dependency cleanup, and local validation including real interaction. May still be impractical to edit directly.
- **Editable recreation candidate** — a complete (or honestly-partial) capture plus an assessment that the site is suitable for Editable Recreation Mode. The skill captures, validates, and audits mirrors, and optionally helps recreate suitable sites into editable projects — it does not make every website editable.

## Defaults

- Preferred stack for new Editable Recreation projects: Next.js, Tailwind CSS, Framer Motion; add GSAP + ScrollTrigger for complex scroll choreography (pinning, scrubbing, parallax layers, multi-section timelines).
- Inside an existing repository: follow its conventions and architecture; do not introduce new libraries or frameworks when equivalents exist.
- Response format — analysis/planning tasks: Findings → Animation Audit → Implementation Plan → Risks → Implementation Request. Implementation/fix tasks: brief — root cause, files involved, safe change boundary, risks. Use Risks to surface blocked assets, font availability, timing uncertainty, hidden responsive states, and fidelity gaps — never as permission to simplify.
