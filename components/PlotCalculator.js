"use client";

import { useId, useState } from "react";
import { formatResult, plotArea } from "@/lib/convert";
import { MARLA_STANDARDS } from "@/lib/units";
import MarlaSizePicker from "@/components/MarlaSizePicker";
import ResultBox from "@/components/ResultBox";

const inputClass =
  "mt-2 h-16 w-full rounded-control border border-line bg-surface px-4 text-3xl font-semibold outline-none transition-colors focus:border-accent";

// Length × width in feet -> area in sq ft, marla, kanal and sq yards.
export default function PlotCalculator({ children }) {
  const [length, setLength] = useState("25");
  const [width, setWidth] = useState("50");
  const [marlaSize, setMarlaSize] = useState(MARLA_STANDARDS.revenue);
  const id = useId();

  const area = plotArea(length, width, { marlaSize });
  const isEmpty = length.trim() === "" || width.trim() === "";
  const showMessage = !isEmpty && area === null;
  const marlaText = area ? formatResult(area.marla) : "";

  return (
    <>
      <section className="rounded-card border border-line bg-surface p-5 shadow-card sm:p-8">
        <div className="flex items-end gap-3">
          <div className="min-w-0 flex-1">
            <label htmlFor={`${id}-length`} className="block text-sm font-medium text-muted">
              Length (ft)
            </label>
            <input
              id={`${id}-length`}
              type="text"
              inputMode="decimal"
              autoComplete="off"
              value={length}
              onChange={(e) => setLength(e.target.value)}
              className={inputClass}
            />
          </div>
          <span className="pb-4 text-2xl text-muted" aria-hidden="true">
            ×
          </span>
          <div className="min-w-0 flex-1">
            <label htmlFor={`${id}-width`} className="block text-sm font-medium text-muted">
              Width (ft)
            </label>
            <input
              id={`${id}-width`}
              type="text"
              inputMode="decimal"
              autoComplete="off"
              value={width}
              onChange={(e) => setWidth(e.target.value)}
              className={inputClass}
            />
          </div>
        </div>

        <MarlaSizePicker value={marlaSize} onChange={setMarlaSize} />

        <ResultBox
          label="Plot size"
          value={marlaText}
          unit="marla"
          copyText={marlaText}
          message={showMessage ? "Please enter length and width as numbers, like 25 and 50." : ""}
          extra={
            // Always shown (with dashes when empty) so the box keeps its height.
            <dl className="mt-4 grid grid-cols-3 gap-3 border-t border-line pt-4">
              {[
                ["Square feet", area?.sqFt],
                ["Kanal", area?.kanal],
                ["Square yards", area?.sqYd],
              ].map(([label, v]) => (
                <div key={label}>
                  <dt className="text-sm text-muted">{label}</dt>
                  <dd className="mt-1 text-lg font-semibold">{area ? formatResult(v) : "–"}</dd>
                </div>
              ))}
            </dl>
          }
        />
      </section>
      {children}
    </>
  );
}
