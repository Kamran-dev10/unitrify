import nodemailer from "nodemailer";
import { SITE_NAME } from "../../../lib/config.js";
import { validateContact, spamReason, createRateLimiter, contactSubject } from "../../../lib/contact.js";

// POST /api/contact: checks the message again on the server, then emails it.
// SMTP settings come only from environment variables (see .env.example);
// no password is ever in the code.
const allow = createRateLimiter({ max: 5, windowMs: 10 * 60 * 1000 });

const json = (body, status = 200) => Response.json(body, { status });

function smtpConfig() {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_TO } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !CONTACT_TO) return null;
  const port = Number(SMTP_PORT) || 465;
  return { host: SMTP_HOST, port, secure: port === 465, auth: { user: SMTP_USER, pass: SMTP_PASS }, to: CONTACT_TO, from: SMTP_USER };
}

// CONTACT_FAKE_SEND is for local browser tests only. On the live Vercel
// site (VERCEL_ENV=production) it is ignored, so real messages are never dropped.
export function fakeSendEnabled(env = process.env) {
  if (env.CONTACT_FAKE_SEND !== "1") return false;
  if (env.VERCEL_ENV === "production") {
    console.warn("Contact form: CONTACT_FAKE_SEND is set in production and is ignored. Remove it from the environment.");
    return false;
  }
  return true;
}

function clientIp(request) {
  const forwarded = request.headers.get("x-forwarded-for");
  return (forwarded?.split(",")[0] || request.headers.get("x-real-ip") || "unknown").trim();
}

export async function POST(request) {
  let input;
  try {
    input = await request.json();
  } catch {
    return json({ ok: false, error: "invalid" }, 400);
  }

  // Bots that fill the hidden field get a normal-looking reply, and nothing is sent.
  const spam = spamReason(input);
  if (spam === "honeypot") return json({ ok: true });
  if (spam === "too-fast") return json({ ok: false, error: "too-fast" }, 400);

  const result = validateContact(input);
  if (!result.ok) return json({ ok: false, error: "invalid", errors: result.errors }, 400);

  if (!allow(clientIp(request))) return json({ ok: false, error: "rate-limit" }, 429);

  // Browser tests set CONTACT_FAKE_SEND=1: everything runs except the real email.
  if (fakeSendEnabled()) return json({ ok: true });

  const smtp = smtpConfig();
  if (!smtp) return json({ ok: false, error: "not-configured" }, 503);

  const { data } = result;
  try {
    const transporter = nodemailer.createTransport({ host: smtp.host, port: smtp.port, secure: smtp.secure, auth: smtp.auth });
    await transporter.sendMail({
      from: `"${SITE_NAME} contact form" <${smtp.from}>`,
      to: smtp.to,
      replyTo: { name: data.name, address: data.email },
      subject: contactSubject(SITE_NAME, data),
      text: `Name: ${data.name}\nEmail: ${data.email}\nTopic: ${data.topic}\n\n${data.message}\n`,
    });
    return json({ ok: true });
  } catch (err) {
    console.error("Contact form: sending failed:", err?.message);
    return json({ ok: false, error: "send-failed" }, 502);
  }
}
