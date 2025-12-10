// src/app/api/book/route.js
import { NextResponse } from "next/server";
import { z } from "zod";

const BookingSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/), // YYYY-MM-DD
  time: z.string().min(1),
  note: z.string().max(1000).optional(),
});

// (optional) ensure this runs on Node runtime (not edge) if you use certain libs
export const runtime = "nodejs";

export async function POST(req) {
  try {
    const body = await req.json();
    const parsed = BookingSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, message: "Invalid request" },
        { status: 400 }
      );
    }

    const { name, email, date, time, note } = parsed.data;

    // --- Email notification via Resend (optional) ---
    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    const TO = process.env.BOOKING_NOTIFICATION_EMAIL;
    const FROM = process.env.BOOKING_FROM_EMAIL || "bookings@your-domain.com";

    if (RESEND_API_KEY && TO) {
      const text = `
New booking request

Name: ${name}
Email: ${email}
Date: ${date}
Time: ${time}
Note: ${note || "(none)"}
`.trim();

      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: FROM,
          to: [TO],
          subject: `New booking: ${date} ${time} — ${name}`,
          text,
        }),
      }).catch((e) => console.error("Resend error:", e));
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("POST /api/book error:", e);
    return NextResponse.json(
      { ok: false, message: "Server error" },
      { status: 500 }
    );
  }
}
