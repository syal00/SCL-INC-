import { NextResponse } from "next/server";
import { estimateServiceOptions } from "@/lib/services";

export const runtime = "nodejs";

const hits = new Map<string, number[]>();
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type FieldErrors = Record<string, string>;

function clientIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || "local";
}

function allowRequest(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((time) => now - time < 60 * 60 * 1000);
  if (recent.length >= 5) {
    hits.set(ip, recent);
    return false;
  }
  recent.push(now);
  hits.set(ip, recent);
  return true;
}

function text(value: FormDataEntryValue | null) {
  return String(value ?? "")
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "")
    .trim();
}

function sniff(bytes: Uint8Array) {
  if (bytes.length > 3 && bytes[0] === 0xff && bytes[1] === 0xd8) return "image/jpeg";
  if (bytes.length > 8 && bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47) return "image/png";
  if (
    bytes.length > 12 &&
    String.fromCharCode(...bytes.slice(0, 4)) === "RIFF" &&
    String.fromCharCode(...bytes.slice(8, 12)) === "WEBP"
  ) {
    return "image/webp";
  }
  return null;
}

export async function POST(request: Request) {
  if (!allowRequest(clientIp(request))) {
    return NextResponse.json(
      {
        ok: false,
        code: "REJECTED",
        message: "Too many requests were sent from this network. Please wait and try again.",
      },
      { status: 429 },
    );
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json(
      {
        ok: false,
        code: "VALIDATION",
        message: "The form could not be read. If you attached photos, try fewer or smaller files.",
      },
      { status: 400 },
    );
  }

  if (text(form.get("company_website"))) {
    return NextResponse.json(
      { ok: false, code: "REJECTED", message: "The form could not be submitted. Please try again." },
      { status: 400 },
    );
  }

  const startedAt = Number(text(form.get("startedAt")));
  if (!Number.isFinite(startedAt) || Date.now() - startedAt < 2500) {
    return NextResponse.json(
      { ok: false, code: "REJECTED", message: "The form could not be submitted. Please try again." },
      { status: 400 },
    );
  }

  const name = text(form.get("name"));
  const email = text(form.get("email"));
  const phone = text(form.get("phone"));
  const service = text(form.get("service"));
  const location = text(form.get("location"));
  const description = text(form.get("description"));
  const fieldErrors: FieldErrors = {};

  if (name.length < 2 || name.length > 120) fieldErrors.name = "Enter your name.";
  if (!emailPattern.test(email) || email.length > 200) fieldErrors.email = "Enter a valid email address.";
  if (phone.replace(/\D/g, "").length < 7 || phone.length > 40) fieldErrors.phone = "Enter a phone number we can use to reach you.";
  if (!estimateServiceOptions.includes(service)) fieldErrors.service = "Choose a service.";
  if (location.length < 2 || location.length > 200) fieldErrors.location = "Enter the project location.";
  if (description.length < 20 || description.length > 5000) fieldErrors.description = "Describe the project in at least a few sentences.";

  const files = form
    .getAll("photos")
    .filter((item): item is File => item instanceof File && item.size > 0);

  if (files.length > 4) fieldErrors.photos = "Attach up to 4 photos.";
  if (files.some((file) => file.size > 4 * 1024 * 1024)) fieldErrors.photos = "Each photo must be 4 MB or smaller.";

  const attachments: { filename: string; content: string }[] = [];
  for (const [index, file] of files.entries()) {
    const bytes = new Uint8Array(await file.arrayBuffer());
    const kind = sniff(bytes);
    if (!kind) {
      fieldErrors.photos = "Photos must be JPG, PNG, or WebP.";
      break;
    }
    const extension = kind === "image/png" ? "png" : kind === "image/webp" ? "webp" : "jpg";
    attachments.push({
      filename: `project-photo-${index + 1}.${extension}`,
      content: Buffer.from(bytes).toString("base64"),
    });
  }

  if (Object.keys(fieldErrors).length > 0) {
    return NextResponse.json(
      { ok: false, code: "VALIDATION", message: "Check the highlighted fields and try again.", fieldErrors },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY?.trim();
  const from = process.env.ESTIMATE_FROM_EMAIL?.trim();
  const to = process.env.ESTIMATE_TO_EMAIL?.trim();

  if (!apiKey || !from || !to) {
    return NextResponse.json(
      {
        ok: false,
        code: "NOT_CONFIGURED",
        message:
          "This form is not delivering messages yet, so nothing was sent and no photos were stored. To turn delivery on, create a Resend account, verify the sending domain, then set RESEND_API_KEY, ESTIMATE_FROM_EMAIL (an address on that verified domain), and ESTIMATE_TO_EMAIL. Restart the site and submit again.",
      },
      { status: 503 },
    );
  }

  const subject = `Estimate request: ${service} — ${name}`.replace(/[\r\n]/g, " ");
  const body = [
    "New estimate request from the Sandhu Construction and Landscaping website.",
    "",
    `Name: ${name}`,
    `Email: ${email}`,
    `Phone: ${phone}`,
    `Service: ${service}`,
    `Project location: ${location}`,
    "",
    "Description:",
    description,
    "",
    attachments.length ? `Photos attached: ${attachments.length}` : "Photos attached: none",
  ].join("\n");

  const delivery = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: email,
      subject,
      text: body,
      attachments: attachments.length ? attachments : undefined,
    }),
  });

  if (!delivery.ok) {
    return NextResponse.json(
      {
        ok: false,
        code: "DELIVERY_FAILED",
        message:
          "The email service rejected the message, so it was not delivered. Check that RESEND_API_KEY is valid and that ESTIMATE_FROM_EMAIL uses a domain verified in Resend, then try again.",
      },
      { status: 502 },
    );
  }

  return NextResponse.json({
    ok: true,
    message: "Your estimate request was sent. Keep a copy of your details in case you need to follow up.",
  });
}
