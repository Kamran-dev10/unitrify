import Link from "next/link";
import { SITE_NAME } from "@/lib/config";
import { PAGES, getPageBySlug, pageUrl } from "@/lib/pages";
import { CATEGORIES } from "@/lib/categories";
import { buildMetadata } from "@/lib/seo";
import { SITE_PAGES } from "@/lib/site-pages";
import SearchBox from "@/components/SearchBox";
import PageCards from "@/components/PageCards";
import JsonLd from "@/components/JsonLd";
import { organizationSchema, websiteSchema } from "@/lib/schema";
import { TOOLS } from "@/lib/tools";

export const metadata = buildMetadata(SITE_PAGES.home);

// The 6 most useful land pages, shown first.
const TOP_LAND = [
  "marla-to-sq-ft",
  "plot-size-calculator",
  "kanal-to-marla",
  "sq-ft-to-marla",
  "kanal-to-sq-ft",
  "acre-to-kanal",
];

// "Common Conversions": each pair next to its reverse.
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

const GROUP_LABELS = {
  land: "Land (Pakistan)",
  common: "Everyday units",
  engineering: "Engineering",
  heat: "Heat and temperature",
};

const linkClass = "text-ink transition-colors hover:text-accent";

export default function Home() {
  const topLand = TOP_LAND.map(getPageBySlug).filter(Boolean);
  const pairs = COMMON_PAIRS.map((row) => row.map(getPageBySlug)).filter((row) => row.every(Boolean));
  const groups = Object.keys(GROUP_LABELS)
    .map((g) => ({ id: g, label: GROUP_LABELS[g], categories: CATEGORIES.filter((c) => c.group === g) }))
    .filter((g) => g.categories.length > 0);

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-12 sm:py-20">
      <JsonLd data={organizationSchema()} />
      <JsonLd data={websiteSchema()} />
      <section>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Every measurement, one place.</h1>
        <p className="mt-4 text-lg text-muted">
          {SITE_NAME} converts Pakistani land units like marla, kanal and acre, plus everyday units for
          length, weight, temperature and volume.
        </p>
        <div className="mt-8">
          <SearchBox size="lg" placeholder="Try “marla”, “kg to lbs” or “cm”" />
        </div>
      </section>

      <section className="mt-16">
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="text-xl font-semibold tracking-tight">Land units (Pakistan)</h2>
          <Link href="/zameen" className="text-sm font-medium text-accent transition-colors hover:text-accent-hover">
            All land units →
          </Link>
        </div>
        <PageCards pages={topLand} size="lg" />
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
        <h2 className="text-xl font-semibold tracking-tight">Tools</h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-3">
          {TOOLS.map((t) => (
            <li key={t.id}>
              <Link
                href={`/${t.id}`}
                className="flex h-full min-h-14 flex-col justify-center rounded-card border border-line bg-surface px-5 py-4 shadow-card transition-colors hover:border-accent"
              >
                <span className="font-medium text-ink">{t.h1}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {groups.map((g) => (
        <section key={g.id} className="mt-16">
          <h2 className="text-xl font-semibold tracking-tight">{g.label}</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {g.categories.map((c) => {
              const pages = PAGES.filter((p) => p.category === c.id && p.tool !== "plot-size");
              return (
                <div key={c.id} className="rounded-card border border-line bg-surface p-5 shadow-card">
                  <h3 className="font-semibold">
                    <Link href={`/${c.id}`} className="transition-colors hover:text-accent">
                      {c.h1}
                    </Link>
                  </h3>
                  {pages.length > 0 && (
                    <ul className="mt-2 text-sm">
                      {pages.map((p) => (
                        <li key={p.slug}>
                          <Link href={pageUrl(p)} className="flex min-h-11 items-center text-muted transition-colors hover:text-accent">
                            {p.h1}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      ))}
    </main>
  );
}
