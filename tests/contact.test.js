import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { validateContact, spamReason, createRateLimiter, contactSubject, CONTACT_LIMITS, CONTACT_TOPICS } from "../lib/contact.js";
import { POST } from "../app/api/contact/route.js";

const GOOD = { name: "Ali Khan", email: "ali@example.com", topic: "Suggest a converter", message: "Please add a bigha converter." };
const human = { website: "", elapsedMs: 8000 };

describe("contact form validation", () => {
  it("accepts a complete message and trims spaces", () => {
    const r = validateContact({ ...GOOD, name: "  Ali Khan  " });
    expect(r.ok).toBe(true);
    expect(r.data.name).toBe("Ali Khan");
  });

  it("empty fields: one message per field", () => {
    const r = validateContact({ name: "", email: "", topic: "", message: "   " });
    expect(r.ok).toBe(false);
    expect(Object.keys(r.errors).sort()).toEqual(["email", "message", "name", "topic"]);
  });

  it("bad email addresses", () => {
    for (const email of ["ali", "ali@", "ali@example", "ali @example.com", "@example.com"]) {
      expect(validateContact({ ...GOOD, email }).errors?.email, email).toMatch(/valid email/);
    }
  });

  it("too long: every field has a max length", () => {
    for (const [key, max] of Object.entries(CONTACT_LIMITS)) {
      if (key === "topic") continue; // topic must be one of the list anyway
      const long = key === "email" ? `${"a".repeat(max)}@example.com` : "a".repeat(max + 1);
      expect(validateContact({ ...GOOD, [key]: long }).errors?.[key], key).toMatch(/under/);
      if (key !== "email") expect(validateContact({ ...GOOD, [key]: "a".repeat(max) }).ok, key).toBe(true);
    }
  });

  it("topic must be one of the list", () => {
    expect(validateContact({ ...GOOD, topic: "Free money" }).errors.topic).toBeTruthy();
    for (const topic of CONTACT_TOPICS) expect(validateContact({ ...GOOD, topic }).ok).toBe(true);
  });

  it("subject: [Unitrify] <topic> from <name>, no line breaks", () => {
    expect(contactSubject("Unitrify", GOOD)).toBe("[Unitrify] Suggest a converter from Ali Khan");
    expect(contactSubject("Unitrify", { ...GOOD, name: "Ali\r\nBcc: x" })).not.toMatch(/[\r\n]/);
  });
});

describe("contact form spam protection", () => {
  it("honeypot filled in -> spam", () => expect(spamReason({ website: "http://spam.example", elapsedMs: 9000 })).toBe("honeypot"));
  it("sent within 3 seconds -> spam", () => expect(spamReason({ website: "", elapsedMs: 1200 })).toBe("too-fast"));
  it("no timing at all -> spam", () => expect(spamReason({ website: "" })).toBe("too-fast"));
  it("a person -> not spam", () => expect(spamReason(human)).toBeNull());

  it("rate limit: 5 per window per IP, then blocked, then allowed again", () => {
    const allow = createRateLimiter({ max: 5, windowMs: 1000 });
    for (let i = 0; i < 5; i++) expect(allow("1.2.3.4", 0)).toBe(true);
    expect(allow("1.2.3.4", 10)).toBe(false);
    expect(allow("5.6.7.8", 10)).toBe(true);
    expect(allow("1.2.3.4", 1000)).toBe(true);
  });
});

describe("POST /api/contact", () => {
  const saved = {};
  const KEYS = ["SMTP_HOST", "SMTP_PORT", "SMTP_USER", "SMTP_PASS", "CONTACT_TO", "CONTACT_FAKE_SEND"];
  beforeEach(() => KEYS.forEach((k) => ((saved[k] = process.env[k]), delete process.env[k])));
  afterEach(() => KEYS.forEach((k) => (saved[k] === undefined ? delete process.env[k] : (process.env[k] = saved[k]))));

  let ip = 0;
  const post = (body) =>
    POST(
      new Request("http://localhost/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-forwarded-for": `10.0.0.${++ip}` },
        body: JSON.stringify(body),
      }),
    );

  it("honeypot: answers like a success but sends nothing", async () => {
    process.env.SMTP_HOST = "smtp.invalid"; // would fail if it tried to send
    const res = await post({ ...GOOD, website: "spam", elapsedMs: 9000 });
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: true });
  });

  it("too fast: rejected", async () => {
    const res = await post({ ...GOOD, website: "", elapsedMs: 500 });
    expect(res.status).toBe(400);
    expect((await res.json()).error).toBe("too-fast");
  });

  it("invalid input: rejected with field messages (checked on the server too)", async () => {
    const res = await post({ ...GOOD, email: "nope", ...human });
    expect(res.status).toBe(400);
    expect((await res.json()).errors.email).toBeTruthy();
  });

  it("SMTP not set up: a friendly 'not-configured' answer, no crash", async () => {
    const res = await post({ ...GOOD, ...human });
    expect(res.status).toBe(503);
    expect((await res.json()).error).toBe("not-configured");
  });

  it("mocked sender: success", async () => {
    process.env.CONTACT_FAKE_SEND = "1";
    const res = await post({ ...GOOD, ...human });
    expect(await res.json()).toEqual({ ok: true });
  });

  it("rate limit per IP: the 6th message in a row is refused", async () => {
    process.env.CONTACT_FAKE_SEND = "1";
    const send = () =>
      POST(
        new Request("http://localhost/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json", "x-forwarded-for": "10.9.9.9" },
          body: JSON.stringify({ ...GOOD, ...human }),
        }),
      );
    for (let i = 0; i < 5; i++) expect((await send()).status).toBe(200);
    expect((await send()).status).toBe(429);
  });
});
