"use client";

import { formatResult } from "@/lib/convert";
import { MARLA_STANDARDS } from "@/lib/units";

const OPTIONS = [MARLA_STANDARDS.revenue, MARLA_STANDARDS.scheme, MARLA_STANDARDS.urban];

export default function MarlaSizePicker({ value, onChange }) {
  return (
    <fieldset className="mt-5">
      <legend className="text-sm font-medium text-muted">Marla size</legend>
      <div className="mt-2 flex flex-wrap gap-2">
        {OPTIONS.map((size) => {
          const active = size === value;
          return (
            <button
              key={size}
              type="button"
              onClick={() => onChange(size)}
              aria-pressed={active}
              className={`h-11 rounded-control border px-4 text-sm transition-colors ${
                active
                  ? "border-accent bg-accent-tint font-medium text-accent"
                  : "border-line bg-surface text-ink hover:border-ink"
              }`}
            >
              {formatResult(size)} sq ft
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
