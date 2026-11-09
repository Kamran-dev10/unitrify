"use client";

import { useEffect, useId, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { searchPages } from "@/lib/search-match";
import { parseQuery } from "@/lib/search/parseQuery";
import { buildAnswers } from "@/lib/search/answers";
import CopyButton from "@/components/CopyButton";

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
// Keyboard: ↓ / ↑ to move through pages, Enter opens the selected page or
// the answer, Esc closes.
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
  const main = answers?.lines?.[0] ?? null;
  const results = data ? searchPages(data.pages, query) : [];
  const showList = open && query.trim() !== "";

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

  function onKeyDown(e) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setOpen(true);
      setActive((i) => (results.length ? (i + 1) % results.length : -1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => (results.length ? (i <= 0 ? results.length - 1 : i - 1) : -1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      // A selected page wins; otherwise the answer; otherwise the first page.
      if (active >= 0 && results[active]) go(results[active].url);
      else if (main) goAnswer(main.href);
      else if (results[0]) go(results[0].url);
    } else if (e.key === "Escape") {
      setOpen(false);
      setActive(-1);
    }
  }

  const inputSize = size === "lg" ? "h-14 text-lg px-5" : "h-11 text-base px-4";
  const linkClass = "text-accent underline-offset-2 hover:underline";

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
        aria-activedescendant={showList && active >= 0 ? `${id}-opt-${active}` : undefined}
        className={`w-full rounded-control border border-field bg-surface outline-none transition-colors placeholder:text-muted focus:border-accent ${inputSize}`}
      />

      {showList && (
        <div
          onMouseDown={keepFocus}
          className="absolute left-0 right-0 top-full z-20 mt-2 max-h-[70vh] overflow-y-auto rounded-card border border-line bg-surface shadow-card"
        >
          {!data ? (
            <p className="px-4 py-3 text-sm text-muted">{loadError ? "Search could not load. Please try again." : "Loading…"}</p>
          ) : null}

          {/* Instant answer: read out when it changes. */}
          <div aria-live="polite">
            {answers?.needsRates && (
              <p className="px-4 py-3 text-sm text-muted">
                {ratesError ? "Exchange rates are not available right now." : "Loading exchange rates…"}
              </p>
            )}
            {main && (
              <section aria-label="Answer" className="border-b border-line bg-accent-tint/50 px-4 py-3">
                <div className="flex items-start justify-between gap-2">
                  <Link
                    href={main.href}
                    onClick={(e) => {
                      e.preventDefault();
                      goAnswer(main.href);
                    }}
                    className="min-w-0 break-words text-xl font-bold text-accent hover:underline sm:text-2xl"
                  >
                    {main.text}
                  </Link>
                  <CopyButton text={main.copy} label="answer" variant="icon" />
                </div>
                {answers.lines.length > 1 && (
                  <ul className="mt-1 text-sm">
                    {answers.lines.slice(1).map((line) => (
                      <li key={line.text}>
                        <Link
                          href={line.href}
                          onClick={(e) => {
                            e.preventDefault();
                            goAnswer(line.href);
                          }}
                          className="inline-flex min-h-8 items-center text-ink hover:text-accent"
                        >
                          {line.text}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
                {answers.didYouMean?.length > 0 && (
                  <p className="mt-2 text-sm text-muted">
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
                          className={`${linkClass} inline-flex min-h-8 items-center`}
                        >
                          {d.label}
                        </button>
                      </span>
                    ))}
                    ?
                  </p>
                )}
                {answers.links?.length > 0 && (
                  <p className="mt-1 flex flex-wrap gap-x-4 text-sm">
                    {answers.links.map((l) => (
                      <Link
                        key={l.href}
                        href={l.href}
                        onClick={(e) => {
                          e.preventDefault();
                          go(l.href);
                        }}
                        className={`${linkClass} inline-flex min-h-8 items-center`}
                      >
                        {l.label} →
                      </Link>
                    ))}
                  </p>
                )}
                {answers.rates && (
                  <p className="mt-1 text-xs text-muted">
                    {answers.rates.updated && <>Rates updated: {answers.rates.updated}. </>}
                    <a href="https://www.exchangerate-api.com" className="underline">
                      Rates By Exchange Rate API
                    </a>
                  </p>
                )}
              </section>
            )}
          </div>

          {data && (
            <ul id={listId} role="listbox" aria-label="Pages" className="py-1">
              {results.map((item, i) => (
                <li key={item.url} id={`${id}-opt-${i}`} role="option" aria-selected={i === active}>
                  <Link
                    href={item.url}
                    onClick={(e) => {
                      e.preventDefault();
                      go(item.url);
                    }}
                    className={`flex min-h-11 items-center justify-between gap-3 px-4 py-2 transition-colors ${
                      i === active ? "bg-accent-tint" : "hover:bg-page"
                    }`}
                  >
                    <span className="font-medium text-ink">{item.label}</span>
                    <span className="shrink-0 text-sm text-muted">{item.section}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}

          {data && results.length === 0 && !main && !answers?.needsRates && (
            <div className="px-4 pb-3 pt-1 text-sm">
              <p className="text-ink">We couldn’t read that. Try ‘100 cm to m’ or ‘5 marla in sq ft’.</p>
              <p className="mt-1 flex flex-wrap gap-x-4">
                {POPULAR_LINKS.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    onClick={(e) => {
                      e.preventDefault();
                      go(l.href);
                    }}
                    className={`${linkClass} inline-flex min-h-8 items-center`}
                  >
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
