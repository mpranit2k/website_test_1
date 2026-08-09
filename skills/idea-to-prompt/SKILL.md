---
name: idea-to-prompt
description: Converts a raw, rough idea for a landing page section (hero, pricing, features, testimonials, FAQ, footer, CTA, etc.) into a fully-specified, implementation-ready build prompt for a frontend engineer or coding AI. Asks clarifying questions (tech stack, missing real assets/copy, ambiguous section type) before finalizing rather than silently guessing — the one exception is visual aesthetic, which defaults to premium/neutral unless told otherwise. Use whenever the user gives a short or loosely-described idea for a web page section and wants it turned into a structured, detailed prompt (not code). Trigger on "turn this idea into a prompt", "flesh this out into a spec", "make this into a build prompt", "expand this into a detailed prompt for [hero/pricing/features/etc]", or when the user pastes a one-liner/paragraph describing a UI section wanting a polished, copy-pasteable prompt back. Do NOT use to write actual code — output is always a prompt/spec, never a component implementation.
---

# Idea → Build Prompt

Turns a vague idea for a landing page section into a fully-specified, unambiguous build prompt, structured the way a senior frontend engineer would want to receive a ticket.

## When to use this

- User gives a one-liner: "private jet landing page hero" → expand into full spec
- User gives a paragraph of loose requirements → tighten and fill gaps
- User pastes an existing rough prompt and wants it made more rigorous/complete
- Output is **always a prompt**, never actual code. If the user then asks for code from the resulting prompt, that's a separate, explicit request.

## Workflow

### 1. Identify the section type

Landing pages are made of a small set of recurring section types. Identify which one the idea maps to (or ask if genuinely ambiguous — see "When to ask" below):

`hero`, `nav`, `features/benefits`, `pricing`, `testimonials/social-proof`, `FAQ`, `CTA/booking`, `footer`, `about/story`, `stats/numbers`, `gallery/showcase`, `contact/form`.

Read `references/section-checklists.md` for the specific fields expected for each section type — this is the core reference and should be consulted every time, not worked from memory.

### 2. Extract what's already known

Pull every concrete detail the user already gave you: brand name, colors, copy, tone, imagery/video, layout hints, tech stack. These are **facts** — carry them into the spec verbatim, don't paraphrase away specificity (e.g. if they gave a hex code, keep the hex code; if they gave exact copy text, keep the exact copy text in quotes).

### 2a. Animated backgrounds are a tech-stack choice, not a media asset

If the idea calls for a moving/animated background (as opposed to a static image or an actual uploaded video file), this is **not** something to generate — it's an implementation technique to specify, the same way "React + Tailwind" is a technique to specify. Never treat "animated background" as a request to produce a video or image file.

Pick the approach based on the vibe implied by the idea and state the choice explicitly:
- **CSS/SVG-based** (default for most premium/clean/minimal ideas): gradient animation, floating blobs/shapes, SVG line-drawing, keyframe-based particle drift. Cheap, no extra dependency, good performance.
- **Canvas/WebGL** (for ideas signaling depth, tech, immersive, "3D", "premium/futuristic", gaming, or data-heavy brands): particle systems, shader gradients, Three.js scenes. Specify library (e.g. Three.js, react-three-fiber, OGL) and describe the visual behavior concretely (particle count, motion pattern, color interpolation, mouse-reactivity if any, performance fallback for reduced-motion/mobile).

Read `references/animated-backgrounds.md` for the concrete spec template for each approach — use it every time an animated background is called for.

### 3. Flag what needs clarifying

For anything not specified — tech stack, ambiguous section type, missing real assets/copy, animated-background approach — do **not** silently fill it in. Collect these into the question round in step 4. The single exception is visual aesthetic (see step 4) which has a standing default and doesn't need to be asked.

### 4. Ask before finalizing — this is an ask-first skill

**Default behavior is to ask, not assume.** Before writing the final prompt, use `ask_user_input_v0` (or ask inline if that tool isn't available) to confirm anything not already stated in the idea, specifically:

- **Tech stack — always ask if not specified.** Never default to React/TypeScript/Tailwind or any other stack silently. This is a hard rule: if the user's idea doesn't name a framework/styling approach, ask before finalizing.
- **Section type**, if it could plausibly map to more than one checklist in `references/section-checklists.md`.
- **Any real asset** (brand name, real image/video URLs, real copy) that's required and missing — never invent a working URL or fabricate real brand/product facts.
- **Animated background approach** (CSS/SVG vs. Canvas/WebGL), if the idea calls for a moving background but doesn't make the intended feel obvious.
- Anything else genuinely unclear or where more than one reasonable interpretation exists.

**The one default that does NOT require asking:** visual aesthetic. If the idea doesn't specify a style, use the premium/neutral aesthetic in `references/style-defaults.md` (matching the register of the private-jet example: Inter font, neutral grays + one dark accent, rounded-full buttons, generous whitespace) without asking — this is the confirmed standing default. Still name it explicitly in the final output so the user can see the choice and override it.

Batch these into a single round of questions where possible rather than going back and forth repeatedly. Only proceed to writing the prompt once the open questions are resolved.

### 5. Write the prompt

Structure the output using the categories in `references/prompt-structure.md`. Always use these section headers in this order, and omit any that are genuinely not applicable:

1. **Section overview** (one line: what this is, e.g. "Create a premium private jet landing page hero section")
2. **Media/Assets** (images, uploaded video files, icons — exact URLs if given, placeholders if not)
2b. **Animated background** (if applicable — technique, library, concrete visual behavior; see step 2a)
3. **Structure/Layout** (the DOM-level composition: nav / content wrapper / sections)
4. **Content blocks** (copy, headings, labels — exact text in quotes)
5. **Interactive elements** (buttons, menus, toggles — states, hover behavior)
6. **Typography**
7. **Technical setup** (framework, styling approach, libraries, state management — always confirmed with the user per step 4, never defaulted)
8. **Responsive behavior**
9. **Layout structure** (concrete container hierarchy with exact classes/measurements, mirroring the granularity of the example)

Each bullet should be **specific enough to implement without follow-up questions**: exact classes/measurements when using Tailwind-style output, exact copy in quotes, exact colors (hex or named), exact behavior (hover states, transitions, breakpoints).

### 6. Close with one short section

- **Choices made** — bullet list of the standing defaults applied (aesthetic, and anything the user explicitly approved during the question round) — not "assumptions," since nothing should reach the final output without either being stated by the user or being the one approved standing default.

## Output format

Plain text/markdown in the chat, formatted so it's directly copy-pasteable as a prompt (matching the register of the example the user is likely to have seen — declarative, categorized, bullet-heavy, no filler prose). Do not wrap it in a code artifact unless the user asks — it's meant to be read and copied, not executed.

**Downstream-model compatibility:** the resulting prompt is often handed to a separate coding model (e.g. a Qwen-family coding model, or any other LLM/agent) to actually implement. Keep every instruction self-contained and unambiguous — exact class names, exact hex/measurements, exact copy in quotes, no pronouns referring back to earlier context, no "as mentioned above." A prompt that only makes sense with the original conversation in view is a bad prompt for this use case.

## Example transformation

Input: `"pricing section for a SaaS tool, 3 tiers, one highlighted as popular"`

Before writing anything, ask: tech stack (not specified), real tier names/prices/features (not specified — these are real product facts, not inventable), whether a monthly/annual toggle is wanted. Once answered, expand into: section overview, content blocks for each of the 3 tiers using the real answers, the "popular" tier's visual distinction (border/badge/scale), CTA button per tier, typography, responsive stacking behavior (grid on desktop → stack on mobile), and the confirmed technical setup — following the same structure as the hero example, using `references/section-checklists.md` → pricing checklist.
