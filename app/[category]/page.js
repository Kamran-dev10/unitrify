import { notFound } from "next/navigation";
import { CATEGORIES, getCategory } from "@/lib/categories";
import { PAGES, POPULAR_SIZE_PAGES } from "@/lib/pages";
import { buildMetadata } from "@/lib/seo";
import { faqSchema } from "@/lib/schema";
import Breadcrumbs from "@/components/Breadcrumbs";
import PageCards from "@/components/PageCards";
import Converter from "@/components/Converter";
import AllUnitsConverter from "@/components/AllUnitsConverter";
import UnitsTable from "@/components/UnitsTable";
import JsonLd from "@/components/JsonLd";

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

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-10 sm:py-16">
      {faqs.length > 0 && <JsonLd data={faqSchema(faqs)} />}
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: c.name, path: `/${c.id}` },
        ]}
      />
      <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">{c.h1}</h1>

      <div className="mt-8">
        <Converter category={c.id} defaultFrom={c.defaultFrom} defaultTo={c.defaultTo} />
      </div>

      <section className="mt-12">
        <h2 className="text-xl font-semibold tracking-tight">Convert to all units</h2>
        <div className="mt-4">
          <AllUnitsConverter category={c.id} />
        </div>
      </section>

      <p className="mt-12 text-lg leading-relaxed">{c.intro}</p>

      <section className="mt-12">
        <h2 className="text-xl font-semibold tracking-tight">Units in this category</h2>
        <UnitsTable category={c} />
      </section>

      {pairPages.length > 0 && (
        <section className="mt-12">
          <h2 className="text-xl font-semibold tracking-tight">{c.name} converters</h2>
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
