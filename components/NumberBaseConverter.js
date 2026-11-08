"use client";

import { useId, useState } from "react";
import { convertBase, baseName } from "@/lib/number-base";
import ResultBox from "@/components/ResultBox";

const fieldClass =
  "mt-2 h-12 w-full rounded-control border border-line bg-surface px-4 text-base outline-none transition-colors focus:border-accent";
const BASES = Array.from({ length: 35 }, (_, i) => i + 2);

function BaseSelect({ id, label, value, onChange }) {
  return (
    <div className="min-w-0 flex-1">
      <label htmlFor={id} className="block text-sm font-medium text-muted">
        {label}
      </label>
      <select id={id} value={value} onChange={(e) => onChange(Number(e.target.value))} className={`select-chevron appearance-none ${fieldClass}`}>
        {BASES.map((b) => (
          <option key={b} value={b}>
            {baseName(b) === `base ${b}` ? `Base ${b}` : `${baseName(b).replace(/^./, (c) => c.toUpperCase())} (base ${b})`}
          </option>
        ))}
      </select>
    </div>
  );
}

// Whole numbers between any two bases from 2 to 36 (BigInt, any length).
export default function NumberBaseConverter({ defaultValue = "255", defaultFrom = 10, defaultTo = 2 }) {
  const [value, setValue] = useState(defaultValue);
  const [from, setFrom] = useState(defaultFrom);
  const [to, setTo] = useState(defaultTo);
  const id = useId();
  const result = convertBase(value, from, to);

  return (
    <section className="rounded-card border border-line bg-surface p-5 shadow-card sm:p-8">
      <label htmlFor={`${id}-value`} className="block text-sm font-medium text-muted">
        Number
      </label>
      <input
        id={`${id}-value`}
        type="text"
        autoComplete="off"
        spellCheck={false}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        aria-invalid={result.error ? true : undefined}
        aria-describedby={result.error ? `${id}-message` : undefined}
        className="mt-2 h-16 w-full rounded-control border border-line bg-surface px-4 font-mono text-2xl outline-none transition-colors focus:border-accent"
      />
      <div className="mt-5 flex items-end gap-3">
        <BaseSelect id={`${id}-from`} label="From" value={from} onChange={setFrom} />
        <button
          type="button"
          onClick={() => {
            setFrom(to);
            setTo(from);
            if (result.value !== undefined) setValue(result.value);
          }}
          aria-label="Swap bases"
          title="Swap bases"
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-control border border-line bg-surface text-xl text-muted transition-colors hover:border-ink hover:text-ink"
        >
          ⇄
        </button>
        <BaseSelect id={`${id}-to`} label="To" value={to} onChange={setTo} />
      </div>
      <ResultBox
        label={`Result (${baseName(to)})`}
        value={result.value ?? ""}
        copyText={result.value ?? ""}
        message={result.error || ""}
        messageId={`${id}-message`}
      />
    </section>
  );
}
