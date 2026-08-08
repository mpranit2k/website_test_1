import { NextRequest, NextResponse } from "next/server";
import { quoteFormSchema } from "@/lib/schemas";

const API_KEY = process.env.QUOTE_API_KEY;
const QUOTE_BACKEND = process.env.QUOTE_BACKEND_URL;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = quoteFormSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid form data" },
        { status: 400 },
      );
    }

    if (!QUOTE_BACKEND) {
      return NextResponse.json(
        { error: "Quote backend not configured" },
        { status: 500 },
      );
    }

    const res = await fetch(`${QUOTE_BACKEND}/quote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: API_KEY ? `Bearer ${API_KEY}` : "",
      },
      body: JSON.stringify(parsed.data),
    });

    if (!res.ok) throw new Error("Backend rejected request");
    return NextResponse.json(await res.json(), { status: 200 });
  } catch (e) {
    console.error("quote submit failed", e);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
