import Link from "next/link";
import { SITE_NAME } from "@/lib/config";
import { getPageBySlug, pageUrl } from "@/lib/pages";
import { buildMetadata } from "@/lib/seo";
import { SITE_PAGES } from "@/lib/site-pages";
import { CONVERTER_GROUPS, ALL_CONVERTERS_PAGE } from "@/lib/groups";
import SearchBox from "@/components/SearchBox";
import JsonLd from "@/components/JsonLd";
import { organizationSchema, websiteSchema } from "@/lib/schema";

export const metadata = buildMetadata(SITE_PAGES.home);

// "Popular": 12 cards, each with a short hint of what it converts.
const POPULAR = [
  { href: "/length", name: "Length", hint: "cm, inches, feet, meters, miles" },
  { href: "/weight", name: "Weight", hint: "kg, lbs, grams, ounces, tola" },
  { href: "/temperature", name: "Temperature", hint: "°C, °F and kelvin" },
  { href: "/currency-converter", name: "Currency", hint: "Daily exchange rates" },
  { href: "/area", name: "Area", hint: "sq ft, sq m, acres, hectares" },
  { href: "/volume", name: "Volume", hint: "liters, gallons, cups, ml" },
  { href: "/speed", name: "Speed", hint: "km/h, mph, m/s, knots" },
  { href: "/data-storage", name: "Data storage", hint: "MB, GB, TB, GiB" },
  { href: "/case-converter", name: "Case converter", hint: "UPPER, lower, Title Case" },
  { href: "/number-converter", name: "Number converter", hint: "Binary, hex, Roman numerals" },
  { href: "/zameen", name: "Pakistani land", hint: "Marla, kanal, acre, murabba" },
  { slug: "plot-size-calculator", name: "Plot size calculator", hint: "Length × width in marla" },
];

// "Common conversions": each pair next to its reverse.
const COMMON_PAIRS = [
  ["cm-to-inch", "inch-to-cm"],
  ["mm-to-inches", "inches-to-mm"],
  ["mm-to-cm", "cm-to-mm"],
  ["meter-to-feet", "feet-to-meters"],
  ["feet-to-cm", "cm-to-feet"],
  ["inches-to-feet", "feet-to-inches"],
  ["meters-to-yards", "yards-to-meters"],
  ["km-to-miles", "miles-to-km"],
  ["kg-to-lbs", "lbs-to-kg"],
  ["grams-to-ounces", "ounces-to-grams"],
  ["pounds-to-ounces", "ounces-to-pounds"],
  ["celsius-to-fahrenheit", "fahrenheit-to-celsius"],
  ["litre-to-gallon", "gallons-to-liters"],
  ["ml-to-cup", "cups-to-ml"],
  ["mph-to-kph", "kph-to-mph"],
  ["acres-to-square-feet", "square-feet-to-acres"],
  ["radians-to-degrees", "degrees-to-radians"],
  ["hp-to-kw", "kw-to-hp"],
];

const cardClass =
  "flex h-full min-h-14 flex-col justify-center rounded-card border border-line bg-surface px-5 py-4 shadow-card transition-colors hover:border-accent";
const linkClass = "text-ink transition-colors hover:text-accent";

export default function Home() {
  const popular = POPULAR.map((p) => ({ ...p, href: p.href ?? pageUrl(getPageBySlug(p.slug)) }));
  const pairs = COMMON_PAIRS.map((row) => row.map(getPageBySlug)).filter((row) => row.every(Boolean));

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-12 sm:py-20">
      <JsonLd data={organizationSchema()} />
      <JsonLd data={websiteSchema()} />

      <section>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Every measurement, one place.</h1>
        <p className="mt-4 text-lg text-muted">
          {SITE_NAME} is a free converter for units from around the world: length, weight, temperature,
          currency, engineering, science and more, with Pakistani land units built in.
        </p>
        <div className="mt-8">
          <SearchBox size="lg" placeholder="Try “kg to lbs”, “marla” or “Nm”" />
        </div>
      </section>

      <section className="mt-16">
        <h2 className="text-xl font-semibold tracking-tight">Popular</h2>
        <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {popular.map((p) => (
            <li key={p.href}>
              <Link href={p.href} className={cardClass}>
                <span className="font-medium text-ink">{p.name}</span>
                <span className="mt-1 text-sm text-muted">{p.hint}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-16">
        <h2 className="text-xl font-semibold tracking-tight">Common conversions</h2>
        <ul className="mt-4 divide-y divide-line rounded-card border border-line bg-surface shadow-card">
          {pairs.map(([a, b]) => (
            <li key={a.slug} className="grid grid-cols-2 gap-4 px-5 py-1">
              <Link href={pageUrl(a)} className={`${linkClass} flex min-h-11 items-center`}>
                {a.h1}
              </Link>
              <Link href={pageUrl(b)} className={`${linkClass} flex min-h-11 items-center`}>
                {b.h1}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-16">
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="text-xl font-semibold tracking-tight">All converters</h2>
          <Link
            href={ALL_CONVERTERS_PAGE.path}
            className="inline-flex min-h-11 items-center text-sm font-medium text-accent transition-colors hover:text-accent-hover"
          >
            Full list →
          </Link>
        </div>
        <ul className="mt-4 grid gap-4 sm:grid-cols-2">
          {CONVERTER_GROUPS.map((g) => (
            <li key={g.id} className="rounded-card border border-line bg-surface p-5 shadow-card">
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="font-semibold">{g.name}</h3>
                <span className="shrink-0 text-sm text-muted">
                  {g.items.length} {g.items.length === 1 ? "converter" : "converters"}
                </span>
              </div>
              <ul className="mt-1 text-sm">
                {g.items.slice(0, 5).map((item) => (
                  <li key={item.id}>
                    <Link href={item.href} className="flex min-h-11 items-center text-muted transition-colors hover:text-accent">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                href={g.path}
                className="mt-1 inline-flex min-h-11 items-center text-sm font-medium text-accent transition-colors hover:text-accent-hover"
                aria-label={`See all ${g.name.toLowerCase()} converters`}
              >
                See all →
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
