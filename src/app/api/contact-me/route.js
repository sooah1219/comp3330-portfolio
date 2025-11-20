import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, message } = body || {};

    if (!name || !email || !message) {
      return Response.json(
        {
          ok: false,
          message: "Name, email, and message are all required.",
        },
        { status: 400 }
      );
    }

    const { error } = await resend.emails.send({
      from: process.env.RESEND_FROM,
      to: process.env.RESEND_TO,
      subject: `New Contact from ${name}`,
      text: `
New contact message from your portfolio site:

Name: ${name}
Email: ${email}

Message:
${message}
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return Response.json(
        {
          ok: false,
          message: "Failed to send email.",
        },
        { status: 500 }
      );
    }

    return Response.json(
      {
        ok: true,
        message: "Email sent successfully.",
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("Contact API error:", err);
    return Response.json(
      {
        ok: false,
        message: "Unexpected error while sending message.",
      },
      { status: 500 }
    );
  }
}

export function GET() {
  return Response.json({ error: "Method Not Allowed" }, { status: 405 });
}
