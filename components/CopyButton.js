"use client";

import { useEffect, useRef, useState } from "react";

// label: what is copied, for screen readers ("Copy result", "Copy Kilogram").
export default function CopyButton({ text, label = "result" }) {
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

  return (
    <>
      <button
        type="button"
        onClick={copy}
        disabled={!text}
        aria-label={copied ? `Copied ${label}` : `Copy ${label}`}
        // Fixed width so "Copy" → "Copied" does not move anything.
        className="h-11 w-24 shrink-0 rounded-control border border-field bg-surface text-sm font-medium text-ink transition-colors hover:border-ink disabled:opacity-50"
      >
        {copied ? "Copied" : "Copy"}
      </button>
      <span className="sr-only" aria-live="polite">
        {copied ? `Copied ${label}` : ""}
      </span>
    </>
  );
}
