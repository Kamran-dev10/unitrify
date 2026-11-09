import { notFound } from "next/navigation";
import Link from "next/link";
import { CATEGORIES, getCategory, categoryHeadings } from "@/lib/categories";
import { PAGES, POPULAR_SIZE_PAGES } from "@/lib/pages";
import { buildMetadata } from "@/lib/seo";
import { groupCrumbFor, getGroup } from "@/lib/groups";
import { categoryData } from "@/lib/category-data";
import { faqSchema, webApplicationSchema } from "@/lib/schema";
import Breadcrumbs from "@/components/Breadcrumbs";
import PageCards from "@/components/PageCards";
import Converter from "@/components/Converter";
import AllUnitsConverter from "@/components/AllUnitsConverter";
import UnitsTable from "@/components/UnitsTable";
import JsonLd from "@/components/JsonLd";
import DownloadTimeCalculator from "@/components/DownloadTimeCalculator";
import SoundPressureConverter from "@/components/SoundPressureConverter";

// Extra tools shown on some category pages, under "Convert to all units".
const EXTRA_TOOLS = {
  "data-transfer": {
    title: "Download Time Calculator",
    Tool: DownloadTimeCalculator,
    props: () => ({ storage: categoryData("data-storage"), transfer: categoryData("data-transfer") }),
  },
  "sound-level": { title: "Sound pressure (Pa) to dB SPL", Tool: SoundPressureConverter, props: () => ({}) },
};

// Whole page must be static; unknown categories return a real 404.
export const ensureStatic = "navigation";

// Same reason as app/[category]/[slug]/page.js: the whole page depends on
// the category, so it waits for params instead of showing a fallback.
// Category pages are still fully prerendered.
export const instant = false;

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ category: c.id }));
}

export async function generateMetadata({ params }) {
  const { category } = await params;
  const c = getCategory(category);
  if (!c) return {};
  return buildMetadata({ title: c.title, description: c.metaDescription, path: `/${c.id}` });
}

export default async function CategoryPage({ params }) {
  const { category } = await params;
  const c = getCategory(category);
  if (!c) notFound();

  const pairPages = PAGES.filter((p) => p.category === c.id && p.tool !== "plot-size");
  const faqs = c.faqs ?? [];
  const extra = EXTRA_TOOLS[c.id];
  // Only this category's units go to the browser.
  const data = categoryData(c.id);
  const h = categoryHeadings(c);
  // Two links in the intro: the most popular pair pages, topped up with
  // other categories of the same group when there are fewer than two.
  const group = getGroup(c.group);
  const popular = (group?.items.find((i) => i.id === c.id)?.popular ?? []).map((p) => ({ href: p.href, text: p.h1 }));
  const siblings = (group?.items ?? []).filter((i) => i.id !== c.id).map((i) => ({ href: i.href, text: i.h1 }));
  const introLinks = [...popular, ...siblings].slice(0, 2);
  const introLabel = introLinks.length === 2 && popular.length >= 2 ? "Popular conversions:" : "See also:";

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-10 sm:py-16">
      <JsonLd data={webApplicationSchema({ name: c.title, path: `/${c.id}` })} />
      {faqs.length > 0 && <JsonLd data={faqSchema(faqs)} />}
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          groupCrumbFor(c.id),
          { name: c.name, path: `/${c.id}` },
        ].filter(Boolean)}
      />
      <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">{c.h1}</h1>
      {c.note && <p className="mt-3 text-sm leading-relaxed text-muted">{c.note}</p>}

      <div className="mt-8">
        <Converter data={data} defaultFrom={c.defaultFrom} defaultTo={c.defaultTo} />
      </div>

      <section className="mt-12">
        <h2 className="text-xl font-semibold tracking-tight">{h.allUnits}</h2>
        <div className="mt-4">
          <AllUnitsConverter data={data} />
        </div>
      </section>

      {extra && (
        <section className="mt-12">
          <h2 className="text-xl font-semibold tracking-tight">{extra.title}</h2>
          <div className="mt-4">
            <extra.Tool {...extra.props()} />
          </div>
        </section>
      )}

      <p className="mt-12 text-lg leading-relaxed">
        {c.intro}
        {introLinks.length === 2 && (
          <>
            {" "}
            {introLabel}{" "}
            <Link href={introLinks[0].href} className="text-accent underline transition-colors hover:text-accent-hover">
              {introLinks[0].text}
            </Link>{" "}
            and{" "}
            <Link href={introLinks[1].href} className="text-accent underline transition-colors hover:text-accent-hover">
              {introLinks[1].text}
            </Link>
            .
          </>
        )}
      </p>

      <section className="mt-12">
        <h2 className="text-xl font-semibold tracking-tight">{h.units}</h2>
        <UnitsTable category={c} />
      </section>

      {pairPages.length > 0 && (
        <section className="mt-12">
          <h2 className="text-xl font-semibold tracking-tight">{h.pairs}</h2>
          <PageCards pages={pairPages} size="lg" />
        </section>
      )}

      {c.id === "zameen" && (
        <section className="mt-12">
          <h2 className="text-xl font-semibold tracking-tight">Popular plot sizes</h2>
          <PageCards pages={POPULAR_SIZE_PAGES} columns={3} />
        </section>
      )}

      {faqs.length > 0 && (
        <section className="mt-12">
          <h2 className="text-xl font-semibold tracking-tight">Frequently asked questions</h2>
          <div className="mt-4 space-y-6">
            {faqs.map((f) => (
              <div key={f.question}>
                <h3 className="font-semibold">{f.question}</h3>
                <p className="mt-1 leading-relaxed text-muted">{f.answer}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
