import type { QuoteFormValues } from "@/lib/schemas";

export async function submitQuote(values: QuoteFormValues) {
  const res = await fetch("/api/quote", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(values),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => null);
    throw new Error(err?.message ?? "Something went wrong. Please try again.");
  }

  return res.json();
}
