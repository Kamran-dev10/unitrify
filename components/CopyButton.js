"use client";

import { useEffect, useRef, useState } from "react";

export default function CopyButton({ text }) {
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
    <button
      type="button"
      onClick={copy}
      disabled={!text}
      className="h-11 shrink-0 rounded-control border border-line bg-surface px-4 text-sm font-medium text-ink transition-colors hover:border-ink disabled:opacity-50"
    >
      {copied ? "Copied" : "Copy"}
    </button>
  );
}
