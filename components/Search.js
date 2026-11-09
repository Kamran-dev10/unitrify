"use client";

import { useEffect, useId, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { searchPages } from "@/lib/search-match";
import { parseQuery } from "@/lib/search/parseQuery";
import { buildAnswers } from "@/lib/search/answers";
import CopyButton from "@/components/CopyButton";
import { ArrowRight } from "lucide-react";

// Two static files, fetched once per visit when a search box is first
// focused (or typed in), and shared by every search box on the page:
// /search-index.json (pages) and /search-units.json (units for answers).
let dataPromise = null;
function loadData() {
  const get = (url) => fetch(url).then((res) => (res.ok ? res.json() : Promise.reject(new Error(String(res.status)))));
  dataPromise ??= Promise.all([get("/search-index.json"), get("/search-units.json")])
    .then(([pages, units]) => ({ pages, units }))
    .catch((err) => {
      dataPromise = null; // try again on the next focus
      throw err;
    });
  return dataPromise;
}

// Exchange rates come from our own server (/api/rates, cached for 24 hours),
// fetched only when someone types a currency query.
let ratesPromise = null;
function loadRates() {
  ratesPromise ??= fetch("/api/rates")
    .then((res) => (res.ok ? res.json() : Promise.reject(new Error(String(res.status)))))
    .catch((err) => {
      ratesPromise = null;
      throw err;
    });
  return ratesPromise;
}

// Currency codes understood before the rates have loaded.
const KNOWN_CURRENCIES = ["USD", "PKR", "INR", "GBP", "EUR", "AED", "SAR", "CAD", "AUD", "CNY", "JPY", "QAR", "KWD", "OMR", "BHD", "MYR", "TRY", "CHF", "BDT", "AFN"];

const POPULAR_LINKS = [
  { label: "kg to lbs", href: "/weight/kg-to-lbs" },
  { label: "cm to inches", href: "/length/cm-to-inch" },
  { label: "marla to sq ft", href: "/zameen/marla-to-sq-ft" },
  { label: "USD to PKR", href: "/currency-converter/usd-to-pkr" },
];

// Keep focus in the input so the dropdown does not close before a click lands.
const keepFocus = (e) => e.preventDefault();

// Search box with instant answers ("100 cm to m") and a live list of pages.
// Keyboard: ↓ / ↑ move through the answer, its rows and the pages; Enter
// opens the highlighted one (or the answer); Esc closes.
export default function Search({ size = "md", placeholder = "Search converters" }) {
  const [data, setData] = useState(null);
  const [loadError, setLoadError] = useState(false);
  const [rates, setRates] = useState(null);
  const [ratesError, setRatesError] = useState(false);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const router = useRouter();
  const id = useId();
  const listId = `${id}-list`;

  function ensureData() {
    if (data) return;
    loadData()
      .then((d) => {
        setData(d);
        setLoadError(false);
      })
      .catch(() => setLoadError(true));
  }

  // Text typed before the data arrived (or restored by the browser) still searches.
  useEffect(() => {
    if (query.trim() !== "" && !data) ensureData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  const parsed = useMemo(() => {
    if (!data || query.trim() === "") return null;
    const currencies = rates ? Object.keys(rates.rates) : KNOWN_CURRENCIES;
    return parseQuery(query, data.units, { currencies });
  }, [data, query, rates]);

  // Load rates the first time a currency query appears.
  useEffect(() => {
    if (parsed?.type !== "currency" || rates || ratesError) return;
    loadRates()
      .then(setRates)
      .catch(() => setRatesError(true));
  }, [parsed, rates, ratesError]);

  const answers = data ? buildAnswers(parsed, data.units, rates) : null;
  const main = answers?.main ?? null;
  const rows = answers?.rows ?? [];
  const results = data ? searchPages(data.pages, query) : [];
  const showList = open && query.trim() !== "";

  // Everything the arrow keys move through: the main answer, its rows, then pages.
  const options = [
    ...(main ? [{ key: "main", href: main.href, answer: true }] : []),
    ...rows.map((r) => ({ key: `row-${r.href}-${r.label}`, href: r.href, answer: true })),
    ...results.map((p) => ({ key: `page-${p.url}`, href: p.url, answer: false })),
  ];
  const optionId = (i) => `${id}-opt-${i}`;
  const rowStart = main ? 1 : 0;
  const pageStart = rowStart + rows.length;

  function close() {
    setOpen(false);
    setQuery("");
    setActive(-1);
  }

  function go(href) {
    close();
    router.push(href);
  }

  // Answer links carry ?v=…&from=…&to=…, which the converter reads when the
  // page loads. A full page load makes sure it does, even on the same page.
  function goAnswer(href) {
    close();
    window.location.assign(href);
  }

  const openOption = (o) => (o.answer ? goAnswer(o.href) : go(o.href));

  function onKeyDown(e) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setOpen(true);
      setActive((i) => (options.length ? (i + 1) % options.length : -1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => (options.length ? (i <= 0 ? options.length - 1 : i - 1) : -1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      // The highlighted option, else the main answer, else the first page.
      const o = options[active] ?? options[0];
      if (o) openOption(o);
    } else if (e.key === "Escape") {
      setOpen(false);
      setActive(-1);
    }
  }

  const inputSize = size === "lg" ? "h-14 text-lg px-5" : "h-11 text-base px-4";
  const footLink = "inline-flex min-h-8 items-center text-sm text-accent underline-offset-2 hover:underline";
  const click = (o) => (e) => {
    e.preventDefault();
    openOption(o);
  };

  return (
    <form role="search" className="relative w-full" onSubmit={(e) => e.preventDefault()}>
      <label htmlFor={`${id}-input`} className="sr-only">
        Search converters
      </label>
      <input
        id={`${id}-input`}
        type="search"
        autoComplete="off"
        placeholder={placeholder}
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
          setActive(-1);
        }}
        onFocus={() => {
          setOpen(true);
          ensureData();
        }}
        onBlur={() => setOpen(false)}
        onKeyDown={onKeyDown}
        role="combobox"
        aria-expanded={showList}
        aria-controls={listId}
        aria-autocomplete="list"
        aria-activedescendant={showList && active >= 0 && options[active] ? optionId(active) : undefined}
        className={`w-full rounded-control border border-field bg-surface outline-none transition-colors placeholder:text-muted focus:border-accent ${inputSize}`}
      />

      {showList && (
        <div
          onMouseDown={keepFocus}
          // Phone: almost the full screen width (the header box is narrow). Larger
          // screens: at least 24rem, and never narrower than the search box.
          className="absolute right-0 top-full z-50 mt-2 max-h-[60vh] w-[calc(100vw-2rem)] overflow-y-auto overscroll-contain rounded-card border border-line bg-surface shadow-dropdown sm:max-h-[70vh] sm:w-96 sm:min-w-full"
        >
          {!data && (
            <p className="px-4 py-3 text-sm text-muted">{loadError ? "Search could not load. Please try again." : "Loading…"}</p>
          )}
          {answers?.needsRates && (
            <p className="px-4 py-3 text-sm text-muted" aria-live="polite">
              {ratesError ? "Exchange rates are not available right now." : "Loading exchange rates…"}
            </p>
          )}

          {data && (
            <ul id={listId} role="listbox" aria-label="Answers and pages">
              {main && (
                <li
                  id={optionId(0)}
                  role="option"
                  aria-selected={active === 0}
                  className={`relative m-2 rounded-control bg-accent-tint transition-shadow ${active === 0 ? "ring-2 ring-accent" : ""}`}
                >
                  <Link
                    href={main.href}
                    onClick={click(options[0])}
                    className="block px-4 py-3 pr-12 text-xl font-bold leading-snug text-accent break-words sm:text-2xl"
                  >
                    <span aria-live="polite">{main.text}</span>
                  </Link>
                  <span className="absolute right-2 top-2">
                    <CopyButton text={main.copy} label="answer" variant="icon" />
                  </span>
                </li>
              )}

              {rows.map((r, i) => {
                const index = rowStart + i;
                return (
                  <li key={options[index].key} id={optionId(index)} role="option" aria-selected={active === index}>
                    <Link
                      href={r.href}
                      onClick={click(options[index])}
                      className={`group/row flex min-h-10 items-center gap-3 border-t border-line px-4 py-2 text-sm transition-colors first:border-t-0 ${
                        active === index ? "bg-accent-tint" : "hover:bg-accent-tint"
                      }`}
                    >
                      <span className="min-w-0 flex-1 truncate text-ink">{r.label}</span>
                      <span className="shrink-0 font-semibold tabular-nums text-ink">{r.valueText}</span>
                      <ArrowRight aria-hidden="true" className="h-3.5 w-3.5 shrink-0 text-muted group-hover/row:text-accent" />
                    </Link>
                  </li>
                );
              })}

              {main && (
                <li role="none" className="border-t border-line px-4 py-2">
                  {answers.didYouMean?.length > 0 && (
                    <p className="text-sm text-muted">
                      Did you mean{" "}
                      {answers.didYouMean.map((d, i) => (
                        <span key={d.query}>
                          {i > 0 && " or "}
                          <button
                            type="button"
                            onClick={() => {
                              setQuery(d.query);
                              setActive(-1);
                            }}
                            className={footLink}
                          >
                            {d.label}
                          </button>
                        </span>
                      ))}
                      ?
                    </p>
                  )}
                  <p className="flex flex-wrap gap-x-4">
                    {answers.links.map((l) => (
                      <Link key={l.href} href={l.href} onClick={click({ href: l.href, answer: false })} className={footLink}>
                        {l.label} →
                      </Link>
                    ))}
                  </p>
                  {answers.rates && (
                    <p className="text-xs text-muted">
                      {answers.rates.updated && <>Rates updated: {answers.rates.updated}. </>}
                      <a href="https://www.exchangerate-api.com" className="underline">
                        Rates By Exchange Rate API
                      </a>
                    </p>
                  )}
                </li>
              )}

              {results.length > 0 && main && (
                <li role="none" className="border-t border-line px-4 pb-1 pt-2 text-xs font-medium uppercase tracking-wide text-muted">
                  Pages
                </li>
              )}
              {results.map((item, i) => {
                const index = pageStart + i;
                return (
                  <li key={item.url} id={optionId(index)} role="option" aria-selected={active === index}>
                    <Link
                      href={item.url}
                      onClick={click(options[index])}
                      className={`flex min-h-11 items-center justify-between gap-3 px-4 py-2 transition-colors ${
                        active === index ? "bg-accent-tint" : "hover:bg-page"
                      }`}
                    >
                      <span className="font-medium text-ink">{item.label}</span>
                      <span className="shrink-0 text-sm text-muted">{item.section}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}

          {data && results.length === 0 && !main && !answers?.needsRates && (
            <div className="px-4 py-3 text-sm">
              <p className="text-ink">We couldn’t read that. Try ‘100 cm to m’ or ‘5 marla in sq ft’.</p>
              <p className="mt-1 flex flex-wrap gap-x-4">
                {POPULAR_LINKS.map((l) => (
                  <Link key={l.href} href={l.href} onClick={click({ href: l.href, answer: false })} className={footLink}>
                    {l.label}
                  </Link>
                ))}
              </p>
            </div>
          )}
        </div>
      )}
    </form>
  );
}
