"use client";

import { useId, useState } from "react";
import { formatResult, plotArea } from "@/lib/convert";
import { MARLA_STANDARDS } from "@/lib/units";
import MarlaSizePicker from "@/components/MarlaSizePicker";
import CopyButton from "@/components/CopyButton";

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

        <div className="mt-6 rounded-control bg-accent-tint p-5" aria-live="polite">
          <p className="text-sm text-muted">Plot size</p>
          {showMessage ? (
            <p className="mt-2 text-base text-ink">Please enter length and width as numbers, like 25 and 50.</p>
          ) : (
            <>
              <div className="mt-1 flex flex-wrap items-end justify-between gap-3">
                <p className="min-w-0 break-words text-4xl font-bold tracking-tight text-accent sm:text-5xl">
                  <span className="select-all">{area ? marlaText : "–"}</span>{" "}
                  <span className="text-2xl font-semibold text-muted">marla</span>
                </p>
                <CopyButton text={marlaText} />
              </div>
              {area && (
                <dl className="mt-4 grid grid-cols-3 gap-3 border-t border-line pt-4">
                  <div>
                    <dt className="text-sm text-muted">Square feet</dt>
                    <dd className="mt-1 text-lg font-semibold">{formatResult(area.sqFt)}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-muted">Kanal</dt>
                    <dd className="mt-1 text-lg font-semibold">{formatResult(area.kanal)}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-muted">Square yards</dt>
                    <dd className="mt-1 text-lg font-semibold">{formatResult(area.sqYd)}</dd>
                  </div>
                </dl>
              )}
            </>
          )}
        </div>
      </section>
      {children}
    </>
  );
}
