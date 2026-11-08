"use client";

import { useId, useState } from "react";
import { convertWith, formatSmart, inputMessageFor, unitsFor } from "@/lib/engine";
import ConversionTable from "@/components/ConversionTable";
import UnitOptionPicker from "@/components/UnitOptionPicker";
import ResultBox from "@/components/ResultBox";

const selectClass =
  "select-chevron h-12 w-full appearance-none rounded-control border border-field bg-surface px-4 text-base outline-none transition-colors focus:border-accent";

// Props:
//   data         unit data of ONE category, from categoryData() in lib/category-data.js
//   defaultFrom  unit id, e.g. "marla"
//   defaultTo    unit id, e.g. "sq-ft"
//   defaultValue optional: starting value in the input (default "1")
//   alsoShow     optional: extra unit ids shown in small text under the result
//   tableFrom / tableTo  optional: show a ConversionTable for this pair.
//                It follows the marla size (or other category setting) picked here.
//   children     optional: content shown between the converter and the
//                table (e.g. intro and formula from the page).
export default function Converter({
  data,
  defaultFrom,
  defaultTo,
  defaultValue = "1",
  alsoShow = [],
  tableFrom,
  tableTo,
  children,
}) {
  const [value, setValue] = useState(String(defaultValue));
  const [fromId, setFromId] = useState(defaultFrom);
  const [toId, setToId] = useState(defaultTo);
  // The category setting, if any: marla size (land) or base font size (typography).
  const option = data.option;
  const [optionValue, setOptionValue] = useState(option?.defaultValue);
  const id = useId();

  const options = option ? { [option.key]: optionValue } : {};
  const units = unitsFor(data, options);
  const toUnit = units.find((u) => u.id === toId);
  const result = convertWith(data, value, fromId, toId, options);
  const resultText = formatSmart(result);
  const extras = alsoShow
    .filter((extraId) => extraId !== toId)
    .map((extraId) => ({
      unit: units.find((u) => u.id === extraId),
      text: formatSmart(convertWith(data, value, fromId, extraId, options)),
    }))
    .filter((e) => e.unit && e.text);

  const isEmpty = value.trim() === "";
  const message =
    !isEmpty && result === null ? inputMessageFor(value, data.allowNegative) || "This value cannot be converted." : "";

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
          className="mt-2 h-16 w-full rounded-control border border-field bg-surface px-4 text-3xl font-semibold outline-none transition-colors focus:border-accent"
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
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-control border border-field bg-surface text-xl text-muted transition-colors hover:border-ink hover:text-ink"
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

        {option && <UnitOptionPicker option={option} value={optionValue} onChange={setOptionValue} />}

        <ResultBox
          value={isEmpty ? "" : resultText}
          unit={toUnit?.symbol}
          copyText={isEmpty ? "" : resultText}
          message={message}
          messageId={`${id}-message`}
          extra={
            alsoShow.length > 0 && (
              // Always rendered (even when empty) so the box keeps its height.
              <div className="mt-2 min-h-6 text-base text-muted" aria-live="polite">
                {!message &&
                  !isEmpty &&
                  extras.map((e) => (
                    <p key={e.unit.id}>
                      = {e.text} {e.unit.name}
                    </p>
                  ))}
              </div>
            )
          }
        />
      </section>

      {children}

      {tableFrom && tableTo && (
        <ConversionTable data={data} fromId={tableFrom} toId={tableTo} options={options} />
      )}
    </>
  );
}
