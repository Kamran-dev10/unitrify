// Contact form rules, shared by the form (browser) and the route handler
// (server). Pure: no Node or Next.js imports, so the browser can use it too.

export const CONTACT_TOPICS = ["Report a wrong result", "Suggest a converter", "Business or partnership", "Other"];

// Max length of every field (characters).
export const CONTACT_LIMITS = { name: 100, email: 200, topic: 60, message: 5000 };

// Submissions faster than this after the page loaded are treated as bots.
export const MIN_FILL_MS = 3000;

// The honeypot: a field people never see. Bots fill it in.
export const HONEYPOT_FIELD = "website";

// A practical email check (one @, a dot in the domain, no spaces).
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const str = (v) => (typeof v === "string" ? v.trim() : "");

// Returns { ok: true, data } or { ok: false, errors: { field: message } }.
export function validateContact(input) {
  const data = {
    name: str(input?.name),
    email: str(input?.email),
    topic: str(input?.topic),
    message: str(input?.message),
  };
  const errors = {};
  if (!data.name) errors.name = "Please enter your name.";
  else if (data.name.length > CONTACT_LIMITS.name) errors.name = `Please keep your name under ${CONTACT_LIMITS.name} characters.`;

  if (!data.email) errors.email = "Please enter your email address.";
  else if (data.email.length > CONTACT_LIMITS.email) errors.email = `Please keep your email under ${CONTACT_LIMITS.email} characters.`;
  else if (!EMAIL_RE.test(data.email)) errors.email = "Please enter a valid email address, like name@example.com.";

  if (!CONTACT_TOPICS.includes(data.topic)) errors.topic = "Please choose a topic.";

  if (!data.message) errors.message = "Please write a message.";
  else if (data.message.length > CONTACT_LIMITS.message)
    errors.message = `Please keep your message under ${CONTACT_LIMITS.message.toLocaleString("en-US")} characters.`;

  return Object.keys(errors).length ? { ok: false, errors } : { ok: true, data };
}

// Spam signals: "honeypot" (hidden field filled in) or "too-fast" (sent
// less than 3 seconds after the page loaded). null = looks human.
export function spamReason(input) {
  if (str(input?.[HONEYPOT_FIELD]) !== "") return "honeypot";
  const elapsed = Number(input?.elapsedMs);
  if (!Number.isFinite(elapsed) || elapsed < MIN_FILL_MS) return "too-fast";
  return null;
}

// Simple fixed-window rate limit per key (IP): `max` messages per `windowMs`.
// Kept in memory, so it is per server instance: enough to stop one sender
// from flooding the form, not a global guarantee.
export function createRateLimiter({ max = 5, windowMs = 10 * 60 * 1000 } = {}) {
  const hits = new Map();
  return function allow(key, now = Date.now()) {
    const entry = hits.get(key);
    if (!entry || now - entry.start >= windowMs) {
      hits.set(key, { start: now, count: 1 });
      if (hits.size > 5000) for (const [k, e] of hits) if (now - e.start >= windowMs) hits.delete(k);
      return true;
    }
    entry.count += 1;
    return entry.count <= max;
  };
}

// "[Unitrify] Suggest a converter from Ali"
export function contactSubject(siteName, data) {
  return `[${siteName}] ${data.topic} from ${data.name.replace(/[\r\n]+/g, " ")}`;
}
