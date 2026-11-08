"use client";

import { useId, useState } from "react";
import { feetInchesToCmWith, formatResult } from "@/lib/engine";
import ResultBox from "@/components/ResultBox";

const inputClass =
  "mt-2 h-16 w-full rounded-control border border-field bg-surface px-4 text-3xl font-semibold outline-none transition-colors focus:border-accent";

// Height style converter: feet and inches together -> centimeters.
// Props: data (length unit data from categoryData("length")).
export default function FeetInchesConverter({ data }) {
  const [feet, setFeet] = useState("5");
  const [inches, setInches] = useState("4");
  const id = useId();

  const cm = feetInchesToCmWith(data, feet, inches);
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

      <ResultBox
        value={isEmpty ? "" : resultText}
        unit="cm"
        copyText={isEmpty ? "" : resultText}
        message={!isEmpty && cm === null ? "Please enter feet and inches as numbers, like 5 and 4." : ""}
      />
    </section>
  );
}
