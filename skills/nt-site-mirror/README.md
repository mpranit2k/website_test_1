# NT Site Mirror v1.1

Use NT Site Mirror only for websites and assets you own, control, have client approval for, or are otherwise authorized to work with. It is a recreation and validation workflow, not a copy-a-competitor tool.

NT Site Mirror v1.1 helps Claude Code and Codex capture, validate, audit, mirror, and recreate authorized, high-fidelity website mirrors and editable recreations.

## What Is Included

- `SKILL.md` — the skill instructions Claude Code and Codex load
- `modules/` — technology-specific requirements (WebGL, audio, video, multi-route, runtime assets), loaded only when triggered
- `templates/` — required report formats (discovery, animation audit, asset preservation table, validation)
- `scripts/` — deterministic helpers (`capture_assets.py`, `mirror_assets.py`, `serve.py`, `viewports.py`)
- `NT-Site-Mirror-v1.1-Guide.pdf` — product overview, usage, validation, expectations, and step-by-step install instructions
- `LEGAL_NOTICE.md` — responsible-use boundaries
- `LICENSE.md` — usage and redistribution terms

## Package Structure

```text
NT_Site_Mirror/
├── NT-Site-Mirror-v1.1-Guide.pdf
└── nt-site-mirror/
    ├── README.md
    ├── SKILL.md
    ├── LEGAL_NOTICE.md
    ├── LICENSE.md
    ├── modules/
    │   ├── audio.md
    │   ├── multi-route.md
    │   ├── runtime-assets.md
    │   ├── video.md
    │   └── webgl.md
    ├── templates/
    │   ├── animation-audit.md
    │   ├── asset-preservation-table.md
    │   ├── discovery-report.md
    │   └── validation-report.md
    └── scripts/
        ├── capture_assets.py
        ├── mirror_assets.py
        ├── serve.py
        └── viewports.py
```

Install the full nt-site-mirror/ folder into your Claude or Codex skills folder. The PDF guide stays in the top-level NT_Site_Mirror/ folder for reading; it is not required inside the installed skill folder.

Install the **whole folder**. Do not install only `SKILL.md`.

## What's New in v1.1

- Deeper Static Mirror discovery: authorized manifests, build artifacts, and runtime/lazy-loaded assets are used for verification and completeness, not only the first-load network log
- Runtime/lazy-loaded asset capture via local serving and interaction
- Dynamic chunk/WASM/worker/model/texture/audio detection through bundle inspection
- Local font handling for openly licensed fonts where authorization/licensing allows
- Stronger offline validation with reported asset counts, folder size, missing files, and external dependencies
- Static Mirror results are reported as one of three honest tiers: first-render mirror, complete static mirror, or editable recreation candidate

v1.1's deeper discovery steps are guided workflows the agent performs using the included instructions and scripts; some checks may require browser/tool access and are not one-click automation.

## How It Works

v1.1 uses two modes:

- Static Mirror Mode preserves the authorized deployed frontend runtime and reachable assets first. Use it first only when the user states they own/control the site, have client approval, or are doing staging, migration, internal, or otherwise permitted work.
- Editable Recreation Mode recreates from observation and available user-supplied assets. It is the default when permission context is unclear, and it is the right fit for clean editable source, deeper rebrands, restructuring, blocked mirrors, or cases where copying deployed assets is not permitted.

Static mirrors are best for fidelity and surface changes. Editable recreations are better for deep changes and long-term maintainability.

Paid fonts, Vimeo, Mux, YouTube, external media, provider-streamed media, and protected assets are not automatically downloadable. Classify them as embedded, kept external, user-supplied replacements, recreated from observation, or blocked.

## Quick Usage Examples

```text
Mirror https://example.com with NT Site Mirror for an owner-approved staging migration. Preserve the authorized deployed runtime and reachable assets first, then report local copies, external dependencies, blocked assets, and fidelity gaps.
```

```text
Recreate https://example.com with NT Site Mirror in Editable Recreation Mode with clean editable source. Use observation and available evidence, then validate across desktop, tablet, and mobile.
```

## Responsible Use

Use NT Site Mirror only for authorized work. Respect copyright, licenses, trademarks, provider restrictions, privacy, and client authorization. See `LEGAL_NOTICE.md` and `LICENSE.md`.
