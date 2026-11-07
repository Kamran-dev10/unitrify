"use client";

import { useId, useState } from "react";
import { feetInchesToCm, formatResult } from "@/lib/convert";
import CopyButton from "@/components/CopyButton";

const inputClass =
  "mt-2 h-16 w-full rounded-control border border-line bg-surface px-4 text-3xl font-semibold outline-none transition-colors focus:border-accent";

// Height style converter: feet and inches together -> centimeters.
export default function FeetInchesConverter() {
  const [feet, setFeet] = useState("5");
  const [inches, setInches] = useState("4");
  const id = useId();

  const cm = feetInchesToCm(feet, inches);
  const isEmpty = feet.trim() === "" && inches.trim() === "";
  const resultText = formatResult(cm);

  return (
    <section className="rounded-card border border-line bg-surface p-5 shadow-card sm:p-8">
      <div className="flex gap-3">
        <div className="min-w-0 flex-1">
          <label htmlFor={`${id}-feet`} className="block text-sm font-medium text-muted">
            Feet
          </label>
          <input
            id={`${id}-feet`}
            type="text"
            inputMode="decimal"
            autoComplete="off"
            value={feet}
            onChange={(e) => setFeet(e.target.value)}
            className={inputClass}
          />
        </div>
        <div className="min-w-0 flex-1">
          <label htmlFor={`${id}-inches`} className="block text-sm font-medium text-muted">
            Inches
          </label>
          <input
            id={`${id}-inches`}
            type="text"
            inputMode="decimal"
            autoComplete="off"
            value={inches}
            onChange={(e) => setInches(e.target.value)}
            className={inputClass}
          />
        </div>
      </div>

      <div className="mt-6 rounded-control bg-accent-tint p-5" aria-live="polite">
        <p className="text-sm text-muted">Result</p>
        {!isEmpty && cm === null ? (
          <p className="mt-2 text-base text-ink">Please enter feet and inches as numbers, like 5 and 4.</p>
        ) : (
          <div className="mt-1 flex flex-wrap items-end justify-between gap-3">
            <p className="min-w-0 break-words text-4xl font-bold tracking-tight text-accent sm:text-5xl">
              <span className="select-all">{isEmpty ? "–" : resultText}</span>{" "}
              <span className="text-2xl font-semibold text-muted">cm</span>
            </p>
            <CopyButton text={isEmpty ? "" : resultText} />
          </div>
        )}
      </div>
    </section>
  );
}
