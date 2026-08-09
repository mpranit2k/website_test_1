---
name: idea-to-prompt-v2
description: Converts a raw idea for a landing page into an industrial 10-stage sequential development pipeline. Enforces strict zero-assumption for inspiration sites (using Perplexity fallbacks), Caveman token-saving mode for output, frontend/backend security handshakes, and prevents LLM code-drift. Outputs stateful prompts step-by-step.
---

# Idea → 10-Stage Build Pipeline (Stateful Engine)

Turns a vague idea into a rigorous, step-by-step 10-stage industrial build pipeline.
Never dump all prompts at once. Use a stateful command sequence (`init`, `next`, `jump`) to manage the LLM context window.

## Workflow Commands

### 1. `idea-to-prompt init [idea or inspiration URL]`
- **Action:** Analyze the idea. If an inspiration site (e.g. `motionsites.ai`, `godly.website`) is provided but data is missing/unverified, **DO NOT GUESS**. Generate the `Perplexity Scraper Prompt` (see `references/inspiration-directories.md`).
- **Action:** Check for local `nt-site-mirror` discovery reports in the workspace. If present, ingest them.
- **Output:** 
  1. The Master 10-Stage Roadmap.
  2. Instructions for the user to create `pipeline-tracker.md` (or generates it).
  3. **Stage 1 Prompt** (Funnel Architecture & Dependencies).

### 2. `idea-to-prompt next`
- **Action:** Read `pipeline-tracker.md` to verify the previous stage is checked off. 
- **Action:** Verify the codebase to ensure the LLM actually wrote the code and didn't drift.
- **Output:** The next consecutive stage prompt.

### 3. `idea-to-prompt jump [stage number]`
- **Output:** Generates the specific prompt for the requested stage.

---

## The 10-Stage Industrial Pipeline

**Stage 1:** Funnel & Inspiration Architecture (`funnel-architect`)
**Stage 2:** Semantic HTML & Accessibility Skeleton (`frontend-design`)
**Stage 3:** High-Converting Copy & Messaging (`copywriting-master`)
**Stage 4:** Design System & Visual Aesthetics (`design-taste-frontend`)
**Stage 5:** Responsive & Adaptive Layout Breakpoints
**Stage 6:** UI Micro-Interactions & State Motion (`design-motion-principles`)
**Stage 7:** Scroll Mechanics & GSAP Timelines (`gsap-scrolltrigger`)
**Stage 8:** Awwwards-Grade WebGL & Canvas Polish (`awwwards-animations`)
**Stage 9:** Performance & GPU Acceleration
**Stage 10:** Production QA & Final Ticket

---

## 🚫 HARD CONSTRAINTS (Inject into EVERY generated prompt)

When generating prompts for the downstream coding LLM, you MUST inject these rules into the system instructions:

1. **CAVEMAN MODE CONSTRAINT (Token Saver):**
   > *"SYSTEM RULE: Output strictly executable code or crisp markdown bullet lists. Zero filler, zero pleasantries. Do not explain the code. Max non-code token cap: 100 words."*

2. **CODE DRIFT GUARD (Stages 3+):**
   > *"SYSTEM RULE: DO NOT modify or restructure existing HTML elements, container hierarchies, or component interfaces created in Stage 2. Only append CSS classes, inline styles, or motion props to the existing DOM skeleton."*

3. **TRACKER SYNC GUARD:**
   > *"SYSTEM RULE: Before writing code, read `pipeline-tracker.md` and `index.html`. Verify the previous stage is complete. Check the box in `pipeline-tracker.md` when done."*

4. **DEPENDENCY PRE-REQUISITE (Stage 1):**
   > *"SYSTEM RULE: Execute this install command before proceeding: `npm install gsap @gsap/react framer-motion clsx tailwind-merge`"*

5. **BAD PASTE FALLBACK:**
   > *"SYSTEM RULE: If search/Perplexity data is broken or missing exact tokens, instantly fallback to the neutral premium palette in `style-defaults.md`. Do not halt."*

---

## Required Reading
Always consult these reference files when crafting stage prompts:
- `references/style-defaults.md` (Design Tokens)
- `references/animated-backgrounds.md` (Motion & GSAP Guards)
- `references/section-checklists.md` (Section structures)
- `references/funnel-copywriting.md` (Copy frameworks)
- `references/inspiration-directories.md` (Perplexity fallbacks)
- `references/frontend-backend-security.md` (Security protocol)
- `references/architecture-and-qa.md` (Placeholders & QA)
