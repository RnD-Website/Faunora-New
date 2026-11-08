import { z } from "zod";

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(120),
  business: z.string().trim().max(160).optional().default(""),
  businessType: z.string().trim().min(1, "Please tell us who you are.").max(60),
  email: z.email("Please enter a valid email."),
  phone: z.string().trim().max(40).optional().default(""),
  country: z.string().trim().min(1, "Please choose a country.").max(80),
  animals: z.array(z.string().max(40)).min(1, "Please choose at least one animal.").max(10),
  headcount: z.string().trim().max(80).optional().default(""),
  timing: z.string().trim().max(60).optional().default(""),
  message: z.string().trim().max(2000).optional().default(""),
  product: z.string().trim().max(80).optional().default(""),
  website: z.string().optional(), // honeypot
});

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return Response.json({ error: parsed.error.issues[0]?.message ?? "Please check the form." }, { status: 422 });
  }
  const data = parsed.data;

  // Bots fill the hidden field — pretend success.
  if (data.website) return Response.json({ ok: true });

  // TODO: deliver the lead. Options: an email API (Resend/Postmark), a CRM webhook,
  // or a Netlify/Vercel form. Until configured, requests are logged on the server.
  const webhook = process.env.LEAD_WEBHOOK_URL;
  if (webhook) {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, website: undefined, receivedAt: new Date().toISOString() }),
    });
    if (!res.ok) return Response.json({ error: "Something went wrong while submitting the form." }, { status: 502 });
  } else {
    console.info("[faunora] new sample request", { ...data, website: undefined });
  }

  return Response.json({ ok: true });
}
