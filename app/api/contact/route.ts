import { NextResponse } from "next/server";

type ContactPayload = {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let payload: ContactPayload;

  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json(
      { message: "Invalid JSON body." },
      { status: 400 },
    );
  }

  const name = payload.name?.trim() ?? "";
  const email = payload.email?.trim() ?? "";
  const subject = payload.subject?.trim() ?? "";
  const message = payload.message?.trim() ?? "";

  if (!name || !EMAIL_PATTERN.test(email) || message.length < 10) {
    return NextResponse.json(
      {
        message:
          "Please provide a name, a valid email address, and a message of at least 10 characters.",
      },
      { status: 400 },
    );
  }

  // No mail provider is configured in this demo, so the submission is logged
  // server-side instead of being forwarded. Wire this up to Resend, Nodemailer,
  // or a form service (Formspree, Getform, …) in a real deployment.
  console.log("[api/contact] message received:", {
    name,
    email,
    subject,
    message,
  });

  return NextResponse.json(
    {
      message:
        "Thanks for reaching out! Your message has been received and I'll get back to you within 24 hours.",
    },
    { status: 200 },
  );
}
