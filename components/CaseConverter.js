"use client";

import { useId, useState } from "react";
import { CASES, convertCase, textStats } from "@/lib/text-case";
import CopyButton from "@/components/CopyButton";

const SAMPLE = "Every measurement, one place.";

// Text box + case buttons + live counts. Runs fully in the browser.
export default function CaseConverter() {
  const [text, setText] = useState(SAMPLE);
  const [active, setActive] = useState("");
  const id = useId();
  const stats = textStats(text);

  function apply(caseId) {
    setText((t) => convertCase(t, caseId));
    setActive(caseId);
  }

  return (
    <section className="rounded-card border border-line bg-surface p-5 shadow-card sm:p-8">
      <label htmlFor={`${id}-text`} className="block text-sm font-medium text-muted">
        Your text
      </label>
      <textarea
        id={`${id}-text`}
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          setActive("");
        }}
        rows={8}
        spellCheck={false}
        className="mt-2 w-full resize-y rounded-control border border-line bg-surface px-4 py-3 text-base leading-relaxed outline-none transition-colors focus:border-accent"
      />

      <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Change case">
        {CASES.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => apply(c.id)}
            aria-pressed={active === c.id}
            className={`h-11 rounded-control border px-4 text-sm transition-colors ${
              active === c.id
                ? "border-accent bg-accent-tint font-medium text-accent"
                : "border-line bg-surface text-ink hover:border-ink"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-4">
        <dl className="grid grid-cols-2 gap-x-6 gap-y-1 text-sm sm:grid-cols-4" aria-live="polite">
          <div>
            <dt className="text-muted">Characters</dt>
            <dd className="font-semibold tabular-nums">{stats.characters.toLocaleString("en-US")}</dd>
          </div>
          <div>
            <dt className="text-muted">Without spaces</dt>
            <dd className="font-semibold tabular-nums">{stats.charactersNoSpaces.toLocaleString("en-US")}</dd>
          </div>
          <div>
            <dt className="text-muted">Words</dt>
            <dd className="font-semibold tabular-nums">{stats.words.toLocaleString("en-US")}</dd>
          </div>
          <div>
            <dt className="text-muted">Lines</dt>
            <dd className="font-semibold tabular-nums">{stats.lines.toLocaleString("en-US")}</dd>
          </div>
        </dl>
        <div className="flex gap-2">
          <CopyButton text={text} label="text" />
          <button
            type="button"
            onClick={() => {
              setText("");
              setActive("");
            }}
            disabled={!text}
            className="h-11 w-24 rounded-control border border-line bg-surface text-sm font-medium text-ink transition-colors hover:border-ink disabled:opacity-50"
          >
            Clear
          </button>
        </div>
      </div>
      <p className="mt-4 text-sm text-muted">Your text stays in your browser. It is never sent anywhere.</p>
    </section>
  );
}
