import { NextResponse } from "next/server";
import { newsletterSchema } from "@/lib/schemas";

export async function POST(request: Request) {
  const body: unknown = await request.json().catch(() => null);
  const result = newsletterSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 },
    );
  }

  // Connect your email provider here (Mailchimp, Resend, ConvertKit, ...)
  // and subscribe `result.data.email`.

  return NextResponse.json({ ok: true });
}
