import Link from "next/link";
import { pageUrl } from "@/lib/pages";

// Grid of links to converter pages. size "lg" shows the meta description too.
export default function PageCards({ pages, size = "sm", columns = 2 }) {
  const grid = columns === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2";
  return (
    <ul className={`mt-4 grid gap-3 ${grid}`}>
      {pages.map((p) => (
        <li key={p.slug}>
          <Link
            href={pageUrl(p)}
            className="flex h-full min-h-14 flex-col justify-center rounded-card border border-line bg-surface px-5 py-4 shadow-card transition-colors hover:border-accent"
          >
            <span className="font-medium text-ink">{p.h1}</span>
            {size === "lg" && <span className="mt-1 text-sm text-muted">{p.metaDescription}</span>}
          </Link>
        </li>
      ))}
    </ul>
  );
}
