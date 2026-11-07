import { notFound } from "next/navigation";
import Converter from "@/components/Converter";
import ConversionTable from "@/components/ConversionTable";
import PlotCalculator from "@/components/PlotCalculator";
import FeetInchesConverter from "@/components/FeetInchesConverter";
import PlotSizeAnswer from "@/components/PlotSizeAnswer";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import PageCards from "@/components/PageCards";
import { PAGES, POPULAR_SIZE_PAGES, getPage, getPageBySlug, pageUrl } from "@/lib/pages";
import { getCategory } from "@/lib/categories";
import { buildMetadata } from "@/lib/seo";
import { faqSchema, webApplicationSchema } from "@/lib/schema";

// The whole page must be static (the build fails if something makes it
// per-request). It also makes unknown URLs return a real 404 status instead
// of streaming a fallback shell with status 200 first.
export const ensureStatic = "navigation";

// Everything on this page (h1, tool, content, JSON-LD) depends on the slug,
// so there is no useful static shell to show behind a <Suspense> fallback,
// and a fallback would also turn unknown URLs into soft 404s (status 200).
// `instant = false` lets the route wait for params. It does not change
// prerendering: every page in lib/pages.js is still fully built as HTML.
export const instant = false;

// Build every page in lib/pages.js at build time.
export function generateStaticParams() {
  return PAGES.map((p) => ({ category: p.category, slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { category, slug } = await params;
  const page = getPage(category, slug);
  if (!page) return {};

  return buildMetadata({
    title: page.title,
    description: page.metaDescription,
    path: pageUrl(page),
    imagePath: pageUrl(page), // this page's own opengraph-image.js
  });
}


function IntroAndFormula({ page }) {
  if (!page.intro && !page.formula) return null;
  return (
    <section className="mt-10">
      {page.intro && <p className="text-lg leading-relaxed">{page.intro}</p>}
      {page.formula && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold tracking-tight">Formula</h2>
          <p className="mt-3 rounded-control border border-line bg-surface px-5 py-4 font-medium">
            {page.formula}
          </p>
        </div>
      )}
    </section>
  );
}

export default async function ConverterPage({ params }) {
  const { category, slug } = await params;
  const page = getPage(category, slug);
  if (!page) notFound();

  const content = <IntroAndFormula page={page} />;
  const examples = page.examples ?? [];
  const faqs = page.faqs ?? [];
  const related = (page.related ?? []).map(getPageBySlug).filter(Boolean);

  let tool;
  if (page.tool === "plot") {
    tool = <PlotCalculator>{content}</PlotCalculator>;
  } else if (page.tool === "plot-size") {
    tool = (
      <>
        <PlotSizeAnswer size={page.size} unitId={page.from} name={`${page.size} ${page.from}`} />
        {content}
      </>
    );
  } else if (page.tool === "feet-inches") {
    tool = (
      <>
        <FeetInchesConverter />
        {content}
        <ConversionTable category={page.unitCategory} fromId={page.from} toId={page.to} />
      </>
    );
  } else {
    // The Converter shows the intro/formula, then the table, so the table
    // can follow the marla size picked in the converter.
    tool = (
      <Converter
        category={page.unitCategory}
        defaultFrom={page.from}
        defaultTo={page.to}
        alsoShow={page.alsoShow}
        tableFrom={page.from}
        tableTo={page.to}
      >
        {content}
      </Converter>
    );
  }

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-10 sm:py-16">
      <JsonLd data={webApplicationSchema({ name: page.title, path: pageUrl(page) })} />
      {faqs.length > 0 && <JsonLd data={faqSchema(faqs)} />}

      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: getCategory(page.category)?.name ?? page.category, path: `/${page.category}` },
          { name: page.h1, path: pageUrl(page) },
        ]}
      />
      <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">{page.h1}</h1>

      <div className="mt-8">{tool}</div>

      {examples.length > 0 && (
        <section className="mt-12">
          <h2 className="text-xl font-semibold tracking-tight">Examples</h2>
          <ul className="mt-4 space-y-3">
            {examples.map((ex) => (
              <li key={ex} className="rounded-control border border-line bg-surface px-5 py-4">
                {ex}
              </li>
            ))}
          </ul>
        </section>
      )}

      {page.showPopularSizes && (
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

      {related.length > 0 && (
        <section className="mt-12">
          <h2 className="text-xl font-semibold tracking-tight">Related converters</h2>
          <PageCards pages={related} columns={3} />
        </section>
      )}
    </main>
  );
}
