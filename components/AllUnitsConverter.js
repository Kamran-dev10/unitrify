"use client";

import { useId, useState } from "react";
import { convert, formatSmart, getUnits, hasMarlaStandard, inputMessage } from "@/lib/convert";
import { getUnitCategory } from "@/lib/categories/index";
import { MARLA_STANDARDS } from "@/lib/units";
import MarlaSizePicker from "@/components/MarlaSizePicker";
import UnitOptionPicker from "@/components/UnitOptionPicker";
import CopyButton from "@/components/CopyButton";

const fieldClass =
  "mt-2 h-12 w-full rounded-control border border-line bg-surface px-4 text-base outline-none transition-colors focus:border-accent";

// One value in every unit of a category.
// Props: category (unit category id, e.g. "length").
export default function AllUnitsConverter({ category }) {
  const cat = getUnitCategory(category);
  const [value, setValue] = useState("1");
  const [fromId, setFromId] = useState(cat?.defaultFrom ?? cat?.baseUnit);
  const [marlaSize, setMarlaSize] = useState(MARLA_STANDARDS.revenue);
  const option = cat?.option;
  const [optionValue, setOptionValue] = useState(option?.defaultValue);
  const id = useId();

  if (!cat) return null;
  const options = option ? { marlaSize, [option.key]: optionValue } : { marlaSize };
  const units = getUnits(category, options);
  const isEmpty = value.trim() === "";
  const message = isEmpty ? "" : inputMessage(value, category);

  return (
    <section className="rounded-card border border-line bg-surface p-5 shadow-card sm:p-8">
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="sm:flex-1">
          <label htmlFor={`${id}-value`} className="block text-sm font-medium text-muted">
            Value
          </label>
          <input
            id={`${id}-value`}
            type="text"
            inputMode="decimal"
            autoComplete="off"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            aria-invalid={message ? true : undefined}
            aria-describedby={message ? `${id}-message` : undefined}
            className={`${fieldClass} text-xl font-semibold`}
          />
        </div>
        <div className="sm:flex-1">
          <label htmlFor={`${id}-unit`} className="block text-sm font-medium text-muted">
            Unit
          </label>
          <select
            id={`${id}-unit`}
            value={fromId}
            onChange={(e) => setFromId(e.target.value)}
            className={`select-chevron appearance-none ${fieldClass}`}
          >
            {units.map((u) => (
              <option key={u.id} value={u.id}>
                {u.name} ({u.symbol})
              </option>
            ))}
          </select>
        </div>
      </div>

      {hasMarlaStandard(category) && <MarlaSizePicker value={marlaSize} onChange={setMarlaSize} />}
      {option && <UnitOptionPicker option={option} value={optionValue} onChange={setOptionValue} />}

      {/* Same height whether a message shows or not, so nothing jumps. */}
      <p id={`${id}-message`} className="mt-3 min-h-6 text-sm text-ink" aria-live="polite">
        {message}
      </p>

      <div className="mt-2 overflow-x-auto">
        <table className="w-full min-w-[22rem] border-collapse text-left">
          <thead>
            <tr className="border-b border-line">
              <th scope="col" className="py-3 pr-3 text-sm font-medium text-muted">Unit</th>
              <th scope="col" className="py-3 pr-3 text-sm font-medium text-muted">Symbol</th>
              <th scope="col" className="py-3 pr-3 text-sm font-medium text-muted">Result</th>
              <th scope="col" className="py-3 text-sm font-medium text-muted">
                <span className="sr-only">Copy</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {units.map((u) => {
              const text = message || isEmpty ? "" : formatSmart(convert(value, fromId, u.id, category, options));
              const selected = u.id === fromId;
              return (
                <tr key={u.id} className={`border-b border-line last:border-b-0 ${selected ? "bg-accent-tint" : ""}`}>
                  <th scope="row" className="py-2 pr-3 pl-2 text-left font-medium">
                    {u.name}
                  </th>
                  <td className="whitespace-nowrap py-2 pr-3 text-muted">{u.symbol}</td>
                  <td className="py-2 pr-3 font-semibold tabular-nums break-all">{text || "–"}</td>
                  <td className="py-2 pr-2 text-right">
                    <CopyButton text={text} label={u.name} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
