# Validation Report

> Completion requires observed behavior, not code inspection. Run `scripts/viewports.py` on local and source pages.

## Per-section checks

| Section / route | Desktop | Tablet | Mobile | Scroll behavior | Animation timing | Interaction states | Verdict (Pass / Fidelity Gap) |
| --- | --- | --- | --- | --- | --- | --- | --- |
| | | | | | | | |

## Global checks

- [ ] Typography matches measured source values
- [ ] Spacing matches measured source values
- [ ] All kept same-site links resolve locally, intentionally point live/external, or are documented out of scope
- [ ] Every structured module (tables, pricing, forms, legal) exists on the correct route and is structurally recognizable
- [ ] No text overlap; no stuck/frozen animations; no missing source assets
- [ ] Performance acceptable for the target experience
- [ ] Active module validation passed: (list modules)
- [ ] Asset Preservation Table statuses verified — no silent substitutions

## Static Mirror audit (Static Mirror Mode only)

- Acceptance tier reached: `First-render mirror` | `Complete static mirror` | `Editable recreation candidate`
- Deep Static Mirror Discovery passed: yes / no (which steps remain)
- Asset count: / Total folder size:
- Missing files:
- Remaining external requests (critical vs harmless fallback):
- Known fallbacks / stubs (fonts, analytics, etc.):
- Practically editable: yes / no — why

## Fidelity Gaps

| Feature | What's missing / downgraded | Blocking technology | Available paths | User response (Pending / Acknowledged / Approved) |
| --- | --- | --- | --- | --- |
| | | | | |

## Project status

`Complete` | `Partial Completion`

If Partial — separate clearly:

- Completed:
- Blocked:
- Approximated (approved):
- Not Yet Implemented:
