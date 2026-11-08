"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";

const FOCUSABLE = 'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';

// "All converters" button in the header.
// Desktop: a panel under the header with every group and its categories in columns.
// Phone: a full-screen list where each group expands and collapses.
// Esc closes, Tab stays inside the open menu, and focus returns to the button.
// Props: groups from lib/groups.js menuGroups() ([{ id, name, href, items: [{ id, name, href }] }]).
export default function AllConvertersMenu({ groups }) {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(null);
  const buttonRef = useRef(null);
  const panelRef = useRef(null);
  const id = useId();
  const panelId = `${id}-panel`;

  function close({ focusButton = true } = {}) {
    setOpen(false);
    if (focusButton) buttonRef.current?.focus();
  }

  // Visible focusable elements in the panel (the phone and desktop lists are both in the DOM).
  function focusables() {
    const panel = panelRef.current;
    if (!panel) return [];
    return [...panel.querySelectorAll(FOCUSABLE)].filter((el) => el.offsetParent !== null);
  }

  useEffect(() => {
    if (!open) return;
    focusables()[0]?.focus();

    // Phone: the menu covers the screen, so the page behind should not scroll.
    const phone = window.matchMedia("(max-width: 639px)").matches;
    const before = document.body.style.overflow;
    if (phone) document.body.style.overflow = "hidden";

    // Desktop: a click outside the menu closes it.
    function onPointerDown(e) {
      if (!panelRef.current?.contains(e.target) && !buttonRef.current?.contains(e.target)) close({ focusButton: false });
    }
    document.addEventListener("mousedown", onPointerDown);
    return () => {
      document.body.style.overflow = before;
      document.removeEventListener("mousedown", onPointerDown);
    };
  }, [open]);

  function onKeyDown(e) {
    if (e.key === "Escape") {
      e.preventDefault();
      close();
      return;
    }
    if (e.key !== "Tab") return;
    const items = focusables();
    if (items.length === 0) return;
    const first = items[0];
    const last = items[items.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }

  // Following a link closes the menu (the page changes behind it).
  const onNavigate = () => close({ focusButton: false });

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        onClick={() => (open ? close() : setOpen(true))}
        aria-expanded={open}
        aria-controls={panelId}
        aria-haspopup="dialog"
        className="flex h-11 shrink-0 items-center gap-2 rounded-control border border-field bg-surface px-3 text-sm font-medium text-ink transition-colors hover:border-ink"
      >
        <svg aria-hidden="true" viewBox="0 0 20 20" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round">
          <path d="M3 5h14M3 10h14M3 15h14" />
        </svg>
        <span className="sr-only sm:not-sr-only">All converters</span>
      </button>

      {open && (
        <div
          ref={panelRef}
          id={panelId}
          role="dialog"
          aria-modal="true"
          aria-label="All converters"
          onKeyDown={onKeyDown}
          className="fixed inset-0 z-40 overflow-y-auto bg-surface sm:absolute sm:inset-x-0 sm:top-full sm:bottom-auto sm:max-h-[75vh] sm:border-b sm:border-line sm:shadow-card"
        >
          <div className="mx-auto w-full max-w-3xl px-4 py-4 sm:py-6">
            <div className="flex items-center justify-between gap-4">
              <Link
                href="/converters"
                onClick={onNavigate}
                className="flex min-h-11 items-center text-lg font-semibold text-ink transition-colors hover:text-accent"
              >
                All converters
              </Link>
              <button
                type="button"
                onClick={() => close()}
                aria-label="Close menu"
                className="flex h-11 w-11 items-center justify-center rounded-control border border-field text-xl text-muted transition-colors hover:border-ink hover:text-ink"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>

            {/* Phone: groups that expand and collapse. */}
            <ul className="mt-2 divide-y divide-line border-t border-line sm:hidden">
              {groups.map((g) => {
                const isOpen = expanded === g.id;
                const listId = `${id}-${g.id}`;
                return (
                  <li key={g.id}>
                    <button
                      type="button"
                      onClick={() => setExpanded(isOpen ? null : g.id)}
                      aria-expanded={isOpen}
                      aria-controls={listId}
                      className="flex min-h-12 w-full items-center justify-between text-left font-medium text-ink"
                    >
                      {g.name}
                      <span aria-hidden="true" className={`text-muted transition-transform ${isOpen ? "rotate-180" : ""}`}>
                        ▾
                      </span>
                    </button>
                    <ul id={listId} hidden={!isOpen} className="pb-3 pl-3">
                      {g.items.map((item) => (
                        <li key={item.id}>
                          <Link href={item.href} onClick={onNavigate} className="flex min-h-11 items-center text-muted transition-colors hover:text-accent">
                            {item.name}
                          </Link>
                        </li>
                      ))}
                      <li>
                        <Link href={g.href} onClick={onNavigate} className="flex min-h-11 items-center font-medium text-accent">
                          See all {g.name.toLowerCase()} →
                        </Link>
                      </li>
                    </ul>
                  </li>
                );
              })}
            </ul>

            {/* Desktop: every group in columns. */}
            <div className="mt-4 hidden gap-8 sm:block sm:columns-3">
              {groups.map((g) => (
                <section key={g.id} aria-labelledby={`${id}-h-${g.id}`} className="mb-6 break-inside-avoid">
                  <h2 id={`${id}-h-${g.id}`} className="text-sm font-semibold">
                    <Link href={g.href} onClick={onNavigate} className="flex min-h-8 items-center text-ink transition-colors hover:text-accent">
                      {g.name}
                    </Link>
                  </h2>
                  <ul className="text-sm">
                    {g.items.map((item) => (
                      <li key={item.id}>
                        <Link href={item.href} onClick={onNavigate} className="flex min-h-8 items-center text-muted transition-colors hover:text-accent">
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
