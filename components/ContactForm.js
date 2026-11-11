"use client";

import { useEffect, useRef, useState } from "react";
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { CONTACT_LIMITS, CONTACT_TOPICS, HONEYPOT_FIELD, validateContact } from "@/lib/contact";

const field =
  "w-full rounded-control border border-field bg-surface px-4 text-base text-ink outline-none transition-colors placeholder:text-muted focus:border-accent aria-[invalid=true]:border-ink aria-[invalid=true]:border-2";
const labelClass = "block text-sm font-medium text-ink";
const errorClass = "mt-1.5 text-sm font-medium text-ink before:mr-1 before:content-['!'] before:font-bold before:text-accent";

const EMPTY = { name: "", email: "", topic: "", message: "" };

// Contact form: checked in the browser first, then again on the server
// (/api/contact). email: CONTACT_EMAIL, shown when sending is not possible.
export default function ContactForm({ email }) {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [problem, setProblem] = useState("");
  const loadedAt = useRef(0);
  const honeypot = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    loadedAt.current = Date.now();
  }, []);

  const set = (key) => (e) => {
    setValues((v) => ({ ...v, [key]: e.target.value }));
    if (errors[key]) setErrors((er) => ({ ...er, [key]: undefined }));
  };

  async function onSubmit(e) {
    e.preventDefault();
    const check = validateContact(values);
    if (!check.ok) {
      setErrors(check.errors);
      // Move focus to the first field with a problem.
      const first = ["name", "email", "topic", "message"].find((k) => check.errors[k]);
      formRef.current?.querySelector(`[name="${first}"]`)?.focus();
      return;
    }
    setStatus("sending");
    setProblem("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...check.data,
          [HONEYPOT_FIELD]: honeypot.current?.value ?? "",
          elapsedMs: Date.now() - loadedAt.current,
        }),
      });
      const body = await res.json().catch(() => ({}));
      if (res.ok && body.ok) {
        setStatus("sent");
        setValues(EMPTY);
        return;
      }
      if (body.errors) setErrors(body.errors);
      setProblem(
        {
          "too-fast": "That was very quick! Please wait a few seconds and press Send again.",
          "rate-limit": "You have sent several messages in a short time. Please try again in a few minutes.",
          "not-configured": "Our message form is not available right now.",
          invalid: "Please check the fields marked above.",
        }[body.error] ?? "Sorry, your message could not be sent.",
      );
      setStatus("error");
    } catch {
      setProblem("Sorry, your message could not be sent. Please check your connection.");
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div role="status" className="flex gap-3 rounded-control bg-accent-tint px-5 py-4">
        <CheckCircle2 aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
        <div>
          <p className="font-semibold text-ink">Thank you, your message has been sent.</p>
          <p className="mt-1 text-base text-muted">We usually reply within 2 business days.</p>
          <button
            type="button"
            onClick={() => {
              setStatus("idle");
              loadedAt.current = Date.now();
            }}
            className="mt-2 inline-flex min-h-11 items-center text-base text-accent underline-offset-2 hover:underline"
          >
            Send another message
          </button>
        </div>
      </div>
    );
  }

  const describe = (k) => (errors[k] ? `contact-${k}-error` : undefined);
  const sending = status === "sending";

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate aria-label="Contact form" className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className={labelClass}>
            Name
          </label>
          <input
            id="contact-name"
            name="name"
            autoComplete="name"
            maxLength={CONTACT_LIMITS.name}
            value={values.name}
            onChange={set("name")}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={describe("name")}
            className={`mt-1.5 h-11 ${field}`}
          />
          {errors.name && <p id="contact-name-error" className={errorClass}>{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="contact-email" className={labelClass}>
            Email
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            maxLength={CONTACT_LIMITS.email}
            value={values.email}
            onChange={set("email")}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={describe("email")}
            className={`mt-1.5 h-11 ${field}`}
          />
          {errors.email && <p id="contact-email-error" className={errorClass}>{errors.email}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="contact-topic" className={labelClass}>
          Topic
        </label>
        <select
          id="contact-topic"
          name="topic"
          value={values.topic}
          onChange={set("topic")}
          aria-invalid={Boolean(errors.topic)}
          aria-describedby={describe("topic")}
          className={`select-chevron mt-1.5 h-11 appearance-none ${field}`}
        >
          <option value="">Choose a topic</option>
          {CONTACT_TOPICS.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
        {errors.topic && <p id="contact-topic-error" className={errorClass}>{errors.topic}</p>}
      </div>

      <div>
        <label htmlFor="contact-message" className={labelClass}>
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={6}
          maxLength={CONTACT_LIMITS.message}
          value={values.message}
          onChange={set("message")}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={describe("message")}
          className={`mt-1.5 py-3 ${field}`}
        />
        {errors.message && <p id="contact-message-error" className={errorClass}>{errors.message}</p>}
      </div>

      {/* Honeypot: hidden from people and screen readers; bots fill it in. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="contact-website">Website</label>
        <input ref={honeypot} id="contact-website" name={HONEYPOT_FIELD} tabIndex={-1} autoComplete="off" defaultValue="" />
      </div>

      {status === "error" && (
        <div role="alert" className="flex gap-3 rounded-control border border-line bg-page px-4 py-3 text-base">
          <AlertCircle aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-ink" />
          <p>
            {problem} You can also email us at{" "}
            <a href={`mailto:${email}`} className="font-medium text-accent underline">
              {email}
            </a>
            .
          </p>
        </div>
      )}

      <button
        type="submit"
        disabled={sending}
        className="inline-flex min-h-11 items-center justify-center gap-2 rounded-control bg-accent px-6 font-semibold text-white transition-colors hover:bg-accent-hover disabled:opacity-70"
      >
        {sending && <Loader2 aria-hidden="true" className="h-4 w-4 animate-spin" />}
        {sending ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
