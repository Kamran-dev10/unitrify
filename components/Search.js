"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { searchPages } from "@/lib/search";

// Search box with a live list of matching pages.
// Keyboard: ↓ / ↑ to move, Enter to open, Esc to close.
// Use components/SearchBox.js (it passes in the index) instead of this directly.
export default function Search({ index, size = "md", placeholder = "Search converters" }) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const router = useRouter();
  const id = useId();
  const listId = `${id}-list`;

  const results = searchPages(index, query);
  const showList = open && query.trim() !== "";

  function go(item) {
    setOpen(false);
    setQuery("");
    setActive(-1);
    router.push(item.url);
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
      const item = results[active] ?? results[0];
      if (item) go(item);
    } else if (e.key === "Escape") {
      setOpen(false);
      setActive(-1);
    }
  }

  const inputSize = size === "lg" ? "h-14 text-lg px-5" : "h-11 text-base px-4";

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
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        onKeyDown={onKeyDown}
        role="combobox"
        aria-expanded={showList}
        aria-controls={listId}
        aria-autocomplete="list"
        aria-activedescendant={showList && active >= 0 ? `${id}-opt-${active}` : undefined}
        className={`w-full rounded-control border border-line bg-surface outline-none transition-colors placeholder:text-muted focus:border-accent ${inputSize}`}
      />

      {showList && (
        <ul
          id={listId}
          role="listbox"
          className="absolute left-0 right-0 top-full z-20 mt-2 overflow-hidden rounded-card border border-line bg-surface py-1 shadow-card"
        >
          {results.length === 0 ? (
            <li className="px-4 py-3 text-sm text-muted">No converters found. Try &quot;marla&quot; or &quot;kg&quot;.</li>
          ) : (
            results.map((item, i) => (
              <li key={item.url} id={`${id}-opt-${i}`} role="option" aria-selected={i === active}>
                <Link
                  href={item.url}
                  // Keep focus in the input so the list does not close before the click.
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={(e) => {
                    e.preventDefault();
                    go(item);
                  }}
                  className={`flex min-h-11 items-center justify-between gap-3 px-4 py-2 transition-colors ${
                    i === active ? "bg-accent-tint" : "hover:bg-page"
                  }`}
                >
                  <span className="font-medium text-ink">{item.label}</span>
                  <span className="shrink-0 text-sm text-muted">{item.section}</span>
                </Link>
              </li>
            ))
          )}
        </ul>
      )}
    </form>
  );
}
