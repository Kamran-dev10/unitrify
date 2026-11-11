import Link from "next/link";
import { cacheLife } from "next/cache";
import { CONTACT_EMAIL, SITE_NAME } from "@/lib/config";
import { CONVERTER_GROUPS, ALL_CONVERTERS_PAGE } from "@/lib/groups";
import { getPage, pageUrl } from "@/lib/pages";
import { TOOL_PAGES, toolPageUrl } from "@/lib/tools";

// The year is read once at build time and cached, so the footer stays static.
async function getYear() {
  "use cache";
  cacheLife("max");
  return new Date().getFullYear();
}

// The six most useful pair pages. URLs come from the page data, so a link can never point to a missing page.
function popularLinks() {
  const pair = (category, slug, label) => {
    const p = getPage(category, slug);
    return p && { href: pageUrl(p), label };
  };
  const usdPkr = TOOL_PAGES.find((p) => p.slug === "usd-to-pkr");
  return [
    pair("weight", "kg-to-lbs", "kg to lbs"),
    pair("length", "cm-to-inch", "cm to inches"),
    pair("zameen", "marla-to-sq-ft", "marla to sq ft"),
    usdPkr && { href: toolPageUrl(usdPkr), label: "USD to PKR" },
    pair("temperature", "celsius-to-fahrenheit", "Celsius to Fahrenheit"),
    pair("speed", "mph-to-kph", "mph to km/h"),
  ].filter(Boolean);
}

const COMPANY_LINKS = [
  { href: "/about", label: "About" },
  { href: "/how-we-verify", label: "How we verify" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy-policy", label: "Privacy Policy" },
];

const linkClass = "inline-flex min-h-7 items-center py-0.5 text-sm text-muted transition-colors hover:text-accent";

function Column({ title, links }) {
  return (
    <div>
      <h2 className="text-sm font-semibold text-ink">{title}</h2>
      <ul className="mt-3 space-y-1.5">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className={`${linkClass} ${l.strong ? "font-medium text-ink" : ""}`}>
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default async function Footer() {
  const year = await getYear();
  const converters = [
    ...CONVERTER_GROUPS.map((g) => ({ href: g.path, label: g.name })),
    { href: ALL_CONVERTERS_PAGE.path, label: "All converters", strong: true },
  ];

  return (
    <footer className="mt-20 border-t border-line bg-subtle">
      <div className="mx-auto w-full max-w-3xl px-4 pb-8 pt-12">
        <div className="grid gap-10 md:grid-cols-[1fr_2.3fr]">
          <div className="max-w-xs">
            <p className="flex items-baseline gap-2">
              <Link href="/" className="text-lg font-bold tracking-tight text-ink transition-colors hover:text-accent">
                {SITE_NAME}
              </Link>
              <span className="text-xs text-muted">Unit Converter</span>
            </p>
            <p className="mt-2 text-sm font-medium text-ink">Every measurement, one place.</p>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Free converters for 76 kinds of units, from everyday length and weight to Pakistani land, with
              exact factors and a clear source.
            </p>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="mt-3 inline-flex min-h-7 items-center text-sm font-medium text-accent underline-offset-2 hover:underline"
            >
              {CONTACT_EMAIL}
            </a>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3">
            <Column title="Converters" links={converters} />
            <Column title="Popular" links={popularLinks()} />
            <Column title="Company" links={COMPANY_LINKS} />
          </nav>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-line pt-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {SITE_NAME}
          </p>
          <p>Factors verified against NIST SP 811</p>
        </div>
      </div>
    </footer>
  );
}
