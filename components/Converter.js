"use client";

import { useId, useState } from "react";
import { convert, formatResult, getUnits } from "@/lib/convert";
import { MARLA_STANDARDS } from "@/lib/units";
import ConversionTable from "@/components/ConversionTable";
import MarlaSizePicker from "@/components/MarlaSizePicker";
import CopyButton from "@/components/CopyButton";

const selectClass =
  "select-chevron h-12 w-full appearance-none rounded-control border border-line bg-surface px-4 text-base outline-none transition-colors focus:border-accent";

// Props:
//   category     "area" | "length" | "weight" | "volume" | "temperature"
//   defaultFrom  unit id, e.g. "marla"
//   defaultTo    unit id, e.g. "sq-ft"
//   alsoShow     optional: extra unit ids shown in small text under the result
//   tableFrom / tableTo  optional: show a ConversionTable for this pair.
//                It follows the marla size picked here.
//   children     optional: content shown between the converter and the
//                table (e.g. intro and formula from the page).
export default function Converter({
  category,
  defaultFrom,
  defaultTo,
  alsoShow = [],
  tableFrom,
  tableTo,
  children,
}) {
  const [value, setValue] = useState("1");
  const [fromId, setFromId] = useState(defaultFrom);
  const [toId, setToId] = useState(defaultTo);
  const [marlaSize, setMarlaSize] = useState(MARLA_STANDARDS.revenue);
  const id = useId();

  const options = { marlaSize };
  const units = getUnits(category, options);
  const toUnit = units.find((u) => u.id === toId);
  const result = convert(value, fromId, toId, category, options);
  const resultText = formatResult(result);
  const extras = alsoShow
    .filter((extraId) => extraId !== toId)
    .map((extraId) => ({
      unit: units.find((u) => u.id === extraId),
      text: formatResult(convert(value, fromId, extraId, category, options)),
    }))
    .filter((e) => e.unit && e.text);

  const isEmpty = value.trim() === "";
  let message = "";
  if (!isEmpty && result === null) {
    message =
      category !== "temperature" && Number(value) < 0
        ? "Please enter a number that is 0 or more."
        : "Please enter a number, like 5 or 2.5.";
  }

  function swap() {
    setFromId(toId);
    setToId(fromId);
  }

  return (
    <>
      <section className="rounded-card border border-line bg-surface p-5 shadow-card sm:p-8">
        <label htmlFor={`${id}-value`} className="block text-sm font-medium text-muted">
          Enter value
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
          className="mt-2 h-16 w-full rounded-control border border-line bg-surface px-4 text-3xl font-semibold outline-none transition-colors focus:border-accent"
        />

        <div className="mt-5 flex items-end gap-3">
          <div className="min-w-0 flex-1">
            <label htmlFor={`${id}-from`} className="block text-sm font-medium text-muted">
              From
            </label>
            <select
              id={`${id}-from`}
              value={fromId}
              onChange={(e) => setFromId(e.target.value)}
              className={`mt-2 ${selectClass}`}
            >
              {units.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.name} ({u.symbol})
                </option>
              ))}
            </select>
          </div>

          <button
            type="button"
            onClick={swap}
            aria-label="Swap units"
            title="Swap units"
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-control border border-line bg-surface text-xl text-muted transition-colors hover:border-ink hover:text-ink"
          >
            ⇄
          </button>

          <div className="min-w-0 flex-1">
            <label htmlFor={`${id}-to`} className="block text-sm font-medium text-muted">
              To
            </label>
            <select
              id={`${id}-to`}
              value={toId}
              onChange={(e) => setToId(e.target.value)}
              className={`mt-2 ${selectClass}`}
            >
              {units.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.name} ({u.symbol})
                </option>
              ))}
            </select>
          </div>
        </div>

        {category === "area" && <MarlaSizePicker value={marlaSize} onChange={setMarlaSize} />}

        <div className="mt-6 rounded-control bg-accent-tint p-5" aria-live="polite">
          <p className="text-sm text-muted">Result</p>
          {message ? (
            <p id={`${id}-message`} className="mt-2 text-base text-ink">
              {message}
            </p>
          ) : (
            <>
              <div className="mt-1 flex flex-wrap items-end justify-between gap-3">
                <p className="min-w-0 break-words text-4xl font-bold tracking-tight text-accent sm:text-5xl">
                  <span className="select-all">{isEmpty ? "–" : resultText}</span>{" "}
                  <span className="text-2xl font-semibold text-muted">{toUnit?.symbol}</span>
                </p>
                <CopyButton text={isEmpty ? "" : resultText} />
              </div>
              {!isEmpty &&
                extras.map((e) => (
                  <p key={e.unit.id} className="mt-2 text-base text-muted">
                    = {e.text} {e.unit.name}
                  </p>
                ))}
            </>
          )}
        </div>
      </section>

      {children}

      {tableFrom && tableTo && (
        <ConversionTable category={category} fromId={tableFrom} toId={tableTo} marlaSize={marlaSize} />
      )}
    </>
  );
}
