"use client";

import { formatResult } from "@/lib/engine";

// Buttons for a category's one setting (category.option), such as the base
// font size for em and rem. Same look as MarlaSizePicker.
// Props: option ({ label, choices, suffix }), value, onChange.
export default function UnitOptionPicker({ option, value, onChange }) {
  return (
    <fieldset className="mt-5">
      <legend className="text-sm font-medium text-muted">{option.label}</legend>
      <div className="mt-2 flex flex-wrap gap-2">
        {option.choices.map((choice) => {
          const active = choice === value;
          return (
            <button
              key={choice}
              type="button"
              onClick={() => onChange(choice)}
              aria-pressed={active}
              className={`h-11 min-w-11 rounded-control border px-4 text-sm transition-colors ${
                active
                  ? "border-accent bg-accent-tint font-medium text-accent"
                  : "border-field bg-surface text-ink hover:border-ink"
              }`}
            >
              {formatResult(choice)} {option.suffix}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
