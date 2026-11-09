"use client";

import { useId, useState } from "react";
import { formatSmart, prettyNumber } from "@/lib/engine";
import { dbSplToPa, paToDbSpl } from "@/lib/sound-pressure";
import ResultBox from "@/components/ResultBox";

const inputClass =
  "mt-2 h-12 w-full rounded-control border border-field bg-surface px-4 text-xl font-semibold outline-none transition-colors focus:border-accent";

const MODES = [
  { id: "pa", label: "Pa to dB SPL", input: "Sound pressure (Pa)", unit: "dB SPL", run: paToDbSpl, start: "1" },
  { id: "db", label: "dB SPL to Pa", input: "Sound level (dB SPL)", unit: "Pa", run: dbSplToPa, start: "94" },
];

// Sound pressure in pascals <-> dB SPL (reference 20 µPa).
export default function SoundPressureConverter() {
  const [modeId, setModeId] = useState("pa");
  const [value, setValue] = useState("1");
  const id = useId();
  const mode = MODES.find((m) => m.id === modeId);

  const result = mode.run(value);
  const isEmpty = value.trim() === "";
  const text = formatSmart(result);
  const message =
    !isEmpty && result === null ? (modeId === "pa" ? "Please enter a pressure above 0." : "Please enter a number.") : "";

  return (
    <section className="rounded-card border border-line bg-surface p-5 shadow-card sm:p-8">
      <fieldset>
        <legend className="text-sm font-medium text-muted">Direction</legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {MODES.map((m) => (
            <button
              key={m.id}
              type="button"
              aria-pressed={m.id === modeId}
              onClick={() => {
                setModeId(m.id);
                setValue(m.start);
              }}
              className={`h-11 rounded-control border px-4 text-sm transition-colors ${
                m.id === modeId
                  ? "border-accent bg-accent-tint font-medium text-accent"
                  : "border-field bg-surface text-ink hover:border-ink"
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>
      </fieldset>
      <label htmlFor={`${id}-value`} className="mt-5 block text-sm font-medium text-muted">
        {mode.input}
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
        className={inputClass}
      />
      <ResultBox
        value={isEmpty ? "" : prettyNumber(text)}
        unit={mode.unit}
        copyText={isEmpty ? "" : text}
        message={message}
        messageId={`${id}-message`}
      />
      <p className="mt-3 text-sm text-muted">L = 20 × log10(p ÷ 20 µPa). 20 µPa is the quietest sound most people can hear.</p>
    </section>
  );
}
