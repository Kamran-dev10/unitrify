import Link from "next/link";
import { SITE_NAME } from "@/lib/config";
import { PAGES, getPageBySlug } from "@/lib/pages";
import { CATEGORIES } from "@/lib/categories";
import { buildMetadata } from "@/lib/seo";
import SearchBox from "@/components/SearchBox";
import PageCards from "@/components/PageCards";

export const metadata = buildMetadata({
  title: "Marla, Kanal & Unit Converter for Pakistan",
  description:
    "Convert marla, kanal, acre and murabba to square feet and more, with all three marla standards. Plus kg to lbs, cm to inches, °C to °F and other everyday units.",
  path: "/",
});

// The 6 most useful land pages, shown first.
const TOP_LAND = [
  "marla-to-sq-ft",
  "plot-size-calculator",
  "kanal-to-marla",
  "sq-ft-to-marla",
  "kanal-to-sq-ft",
  "acre-to-kanal",
];

export default function Home() {
  const topLand = TOP_LAND.map(getPageBySlug).filter(Boolean);
  const others = CATEGORIES.filter((c) => c.id !== "zameen");

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-12 sm:py-20">
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

      {others.map((c) => (
        <section key={c.id} className="mt-12">
          <h2 className="text-xl font-semibold tracking-tight">
            <Link href={`/${c.id}`} className="transition-colors hover:text-accent">
              {c.name}
            </Link>
          </h2>
          <PageCards pages={PAGES.filter((p) => p.category === c.id)} />
        </section>
      ))}
    </main>
  );
}
