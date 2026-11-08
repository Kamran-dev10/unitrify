"use client";

import { useId, useState } from "react";
import { toRoman, fromRoman } from "@/lib/roman";
import ResultBox from "@/components/ResultBox";

// Roman numerals <-> numbers (1-3999). mode: "toRoman" or "fromRoman".
export default function RomanConverter({ defaultMode = "toRoman", defaultValue = "2026" }) {
  const [mode, setMode] = useState(defaultMode);
  const [value, setValue] = useState(defaultValue);
  const id = useId();
  const result = mode === "toRoman" ? toRoman(value) : fromRoman(value);
  const out = result.value === undefined ? "" : String(result.value);

  function switchMode(next) {
    if (next === mode) return;
    if (out) setValue(out);
    setMode(next);
  }

  return (
    <section className="rounded-card border border-line bg-surface p-5 shadow-card sm:p-8">
      <div className="flex flex-wrap gap-2" role="group" aria-label="Direction">
        {[
          ["toRoman", "Number → Roman"],
          ["fromRoman", "Roman → Number"],
        ].map(([m, label]) => (
          <button
            key={m}
            type="button"
            onClick={() => switchMode(m)}
            aria-pressed={mode === m}
            className={`h-11 rounded-control border px-4 text-sm transition-colors ${
              mode === m ? "border-accent bg-accent-tint font-medium text-accent" : "border-field bg-surface text-ink hover:border-ink"
            }`}
          >
            {label}
          </button>
        ))}
      </div>
      <label htmlFor={`${id}-value`} className="mt-5 block text-sm font-medium text-muted">
        {mode === "toRoman" ? "Number (1 to 3999)" : "Roman numeral"}
      </label>
      <input
        id={`${id}-value`}
        type="text"
        inputMode={mode === "toRoman" ? "numeric" : "text"}
        autoComplete="off"
        spellCheck={false}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        aria-invalid={result.error ? true : undefined}
        aria-describedby={result.error ? `${id}-message` : undefined}
        className="mt-2 h-16 w-full rounded-control border border-field bg-surface px-4 text-2xl font-semibold uppercase outline-none transition-colors focus:border-accent"
      />
      <ResultBox
        label={mode === "toRoman" ? "Roman numeral" : "Number"}
        value={out}
        copyText={out}
        message={result.error || ""}
        messageId={`${id}-message`}
      />
    </section>
  );
}
