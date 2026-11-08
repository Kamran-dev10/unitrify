"use client";

import { useId, useState } from "react";
import { convertCurrency, formatMoney } from "@/lib/currency";
import ResultBox from "@/components/ResultBox";

const fieldClass =
  "select-chevron mt-2 h-12 w-full appearance-none rounded-control border border-field bg-surface px-4 text-base outline-none transition-colors focus:border-accent";

// Converts with rates passed in from the server (cached once a day).
// Nothing is fetched from the browser.
// Props: rates { CODE: per USD }, currencies [{ code, name }], defaultFrom, defaultTo, defaultAmount
export default function CurrencyConverter({ rates, currencies, defaultFrom = "USD", defaultTo = "PKR", defaultAmount = "1" }) {
  const [amount, setAmount] = useState(String(defaultAmount));
  const [from, setFrom] = useState(defaultFrom);
  const [to, setTo] = useState(defaultTo);
  const id = useId();

  const result = convertCurrency(amount, from, to, rates);
  const isEmpty = amount.trim() === "";
  const message = !isEmpty && result === null ? "Please enter an amount, like 100 or 2500.50." : "";
  const text = isEmpty ? "" : formatMoney(result);

  const select = (sid, label, value, onChange) => (
    <div className="min-w-0 flex-1">
      <label htmlFor={sid} className="block text-sm font-medium text-muted">
        {label}
      </label>
      <select id={sid} value={value} onChange={(e) => onChange(e.target.value)} className={fieldClass}>
        {currencies.map((c) => (
          <option key={c.code} value={c.code}>
            {c.code} – {c.name}
          </option>
        ))}
      </select>
    </div>
  );

  return (
    <section className="rounded-card border border-line bg-surface p-5 shadow-card sm:p-8">
      <label htmlFor={`${id}-amount`} className="block text-sm font-medium text-muted">
        Amount
      </label>
      <input
        id={`${id}-amount`}
        type="text"
        inputMode="decimal"
        autoComplete="off"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        aria-invalid={message ? true : undefined}
        aria-describedby={message ? `${id}-message` : undefined}
        className="mt-2 h-16 w-full rounded-control border border-field bg-surface px-4 text-3xl font-semibold outline-none transition-colors focus:border-accent"
      />
      <div className="mt-5 flex items-end gap-3">
        {select(`${id}-from`, "From", from, setFrom)}
        <button
          type="button"
          onClick={() => {
            setFrom(to);
            setTo(from);
          }}
          aria-label="Swap currencies"
          title="Swap currencies"
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-control border border-field bg-surface text-xl text-muted transition-colors hover:border-ink hover:text-ink"
        >
          ⇄
        </button>
        {select(`${id}-to`, "To", to, setTo)}
      </div>
      <ResultBox value={text} unit={to} copyText={text} message={message} messageId={`${id}-message`} />
    </section>
  );
}
