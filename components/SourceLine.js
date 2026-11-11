import Link from "next/link";

// "November 11, 2026" from "2026-11-11", in UTC so the build machine's time zone never shifts it.
export function formatPageDate(iso) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

// Small trust line at the end of every converter and category page:
// where the factors come from, when the page last changed, and how we check them.
export default function SourceLine({ date }) {
  return (
    <p data-source-line className="mt-12 border-t border-line pt-6 text-sm leading-relaxed text-muted">
      Factors from NIST SP 811 and SI definitions · Last updated <time dateTime={date}>{formatPageDate(date)}</time>
      {" · "}
      <Link href="/how-we-verify" className="text-accent underline-offset-2 hover:underline">
        How we verify these conversions
      </Link>
    </p>
  );
}
