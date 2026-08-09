# Frontend-Backend Security Handshake

When building CTAs, Forms, or Auth flows, inject these backend-protection guards:

## No Hardcoded Secrets
- Never hardcode Stripe keys, Supabase URLs, or other API endpoints.
- MUST use environment variables (e.g., `process.env.NEXT_PUBLIC_API_URL`).

## Armor Plating (Validation)
- Do not use raw HTML form submissions.
- Implement strict client-side schema validation (Zod + React Hook Form).
- Sanitize inputs to prevent SQLi / XSS payloads.

## Spam Protection (Rate Limits)
- All submit buttons MUST have a reactive `loading` and `disabled` state.
- Button must disable immediately onClick to prevent double-submissions.

## Graceful Error Handling
- Wrap API fetch calls in `try/catch` blocks.
- On failure, show a toast notification (e.g. `sonner` or `react-hot-toast`); never let the app white-screen.
