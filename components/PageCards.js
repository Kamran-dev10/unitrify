import Link from "next/link";
import { pageUrl } from "@/lib/pages";

// The short answer shown under a card title, e.g. "1 kg = 2.2046 lb":
// the page's quick answer, else the "a = b" part of its title.
function pageAnswer(p) {
  if (p.quickAnswer) return p.quickAnswer;
  const inBrackets = p.title?.match(/\(([^()]*=[^()]*)\)/)?.[1];
  if (inBrackets) return inBrackets;
  const afterDash = p.title?.split(" – ")[1];
  return afterDash && afterDash.includes("=") ? afterDash : null;
}

// Grid of links to converter pages. size "lg" also shows the quick answer.
export default function PageCards({ pages, size = "sm", columns = 2 }) {
  const grid = columns === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2";
  return (
    <ul className={`mt-4 grid gap-3 ${grid}`}>
      {pages.map((p) => {
        const answer = size === "lg" ? pageAnswer(p) : null;
        return (
          <li key={p.slug}>
            <Link
              href={p.href ?? pageUrl(p)}
              className={`flex h-full min-h-14 flex-col ${size === "lg" ? "justify-start" : "justify-center"} rounded-card border border-line bg-surface px-5 py-4 shadow-card transition-colors hover:border-accent`}
            >
              <span className="font-medium text-ink">{p.h1}</span>
              {answer && <span className="mt-1 text-sm text-muted">{answer}</span>}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
