# Multi-Route Module

Triggers: Scope Classification of `Multi-Route Site`, `Portfolio Site`, or `Application`; multiple routes; route transitions; detail/portfolio pages; app screens; shared or nested layouts; content collections; CMS-driven routes; navigation targets outside the requested page.

## Discovery additions

- Map the route structure: route files, layout files, shared components, navigation behavior, route transitions, app state, loading and not-found states, CMS/content sources.
- Mark which routes are in scope and which are out of scope. Identify route-specific assets, animation timelines, metadata, and responsive differences.
- If a linked route contains structured content (tables, pricing/comparison grids, data grids, shipping rates, legal/policy sections, spec matrices, forms), document whether that route is in scope BEFORE implementation.

## Implementation

- Do not expand beyond the user's requested routes without approval.
- Reuse the existing routing architecture; preserve shared layouts and route transition behavior.
- Never silently omit, flatten, merge, or convert structured content modules into unrelated cards or lists without approval.

## Validation additions

Validate every in-scope route at desktop, tablet, and mobile. Verify every kept same-site link resolves locally, intentionally points to the live/external target, or is documented out of scope. Verify every structured module exists on the correct route and remains structurally recognizable.

For `Hero Only`, `Homepage`, or `Landing Page` scope, keep route analysis brief unless route transitions are detected.
