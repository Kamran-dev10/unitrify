"use client";

import { useId, useState } from "react";
import { getUnits } from "@/lib/convert";
import { downloadSeconds, formatDuration } from "@/lib/download-time";
import ResultBox from "@/components/ResultBox";

const inputClass =
  "mt-2 h-12 w-full rounded-control border border-line bg-surface px-4 text-xl font-semibold outline-none transition-colors focus:border-accent";
const selectClass =
  "select-chevron mt-2 h-12 w-full appearance-none rounded-control border border-line bg-surface px-4 text-base outline-none transition-colors focus:border-accent";

// File size (any data-storage unit) + speed (any data-transfer unit) -> time.
export default function DownloadTimeCalculator() {
  const [size, setSize] = useState("1");
  const [sizeUnit, setSizeUnit] = useState("gb");
  const [speed, setSpeed] = useState("100");
  const [speedUnit, setSpeedUnit] = useState("mbps");
  const id = useId();

  const seconds = downloadSeconds(size, sizeUnit, speed, speedUnit);
  const text = formatDuration(seconds);
  const isEmpty = size.trim() === "" || speed.trim() === "";
  const message = !isEmpty && seconds === null ? "Please enter a size and a speed above 0." : "";

  const row = (label, value, setValue, unit, setUnit, units) => (
    <div className="flex gap-3">
      <div className="min-w-0 flex-1">
        <label htmlFor={`${id}-${label}`} className="block text-sm font-medium text-muted">
          {label}
        </label>
        <input
          id={`${id}-${label}`}
          type="text"
          inputMode="decimal"
          autoComplete="off"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className={inputClass}
        />
      </div>
      <div className="min-w-0 flex-1">
        <label htmlFor={`${id}-${label}-unit`} className="block text-sm font-medium text-muted">
          Unit
        </label>
        <select
          id={`${id}-${label}-unit`}
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
          className={selectClass}
        >
          {units.map((u) => (
            <option key={u.id} value={u.id}>
              {u.name} ({u.symbol})
            </option>
          ))}
        </select>
      </div>
    </div>
  );

  return (
    <section className="rounded-card border border-line bg-surface p-5 shadow-card sm:p-8">
      <div className="space-y-5">
        {row("File size", size, setSize, sizeUnit, setSizeUnit, getUnits("data-storage"))}
        {row("Speed", speed, setSpeed, speedUnit, setSpeedUnit, getUnits("data-transfer"))}
      </div>
      <ResultBox label="Download time" value={isEmpty ? "" : text} copyText={isEmpty ? "" : text} message={message} />
      <p className="mt-3 text-sm text-muted">
        Ideal time at a steady full speed. Real downloads are often a little slower.
      </p>
    </section>
  );
}
