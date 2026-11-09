"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Copy } from "lucide-react";

// label: what is copied, for screen readers ("Copy result", "Copy Kilogram").
// variant "text": the "Copy" button under results.
// variant "icon": a small copy icon (tables) with a short "Copied" tooltip.
export default function CopyButton({ text, label = "result", variant = "text" }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef(null);

  useEffect(() => () => clearTimeout(timer.current), []);

  async function copy() {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard can be blocked by the browser; the result is still selectable.
    }
  }

  const name = copied ? `Copied ${label}` : `Copy ${label}`;
  const live = (
    <span className="sr-only" aria-live="polite">
      {copied ? `Copied ${label}` : ""}
    </span>
  );

  if (variant === "icon") {
    const Icon = copied ? Check : Copy;
    return (
      <span className="relative inline-flex">
        <button
          type="button"
          onClick={copy}
          disabled={!text}
          aria-label={name}
          title={`Copy ${label}`}
          className="flex h-9 w-9 items-center justify-center rounded-control text-muted transition-colors hover:bg-page hover:text-accent disabled:opacity-40"
        >
          <Icon aria-hidden="true" className="h-4 w-4" strokeWidth={2} />
        </button>
        {copied && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute right-full top-1/2 mr-1 -translate-y-1/2 whitespace-nowrap rounded-control bg-ink px-2 py-1 text-xs font-medium text-surface"
          >
            Copied
          </span>
        )}
        {live}
      </span>
    );
  }

  return (
    <>
      <button
        type="button"
        onClick={copy}
        disabled={!text}
        aria-label={name}
        // Fixed width so "Copy" → "Copied" does not move anything.
        className="h-11 w-24 shrink-0 rounded-control border border-field bg-surface text-sm font-medium text-ink transition-colors hover:border-ink disabled:opacity-50"
      >
        {copied ? "Copied" : "Copy"}
      </button>
      {live}
    </>
  );
}
