import { notFound } from "next/navigation";
import { CATEGORIES, getCategory } from "@/lib/categories";
import { PAGES, POPULAR_SIZE_PAGES } from "@/lib/pages";
import { buildMetadata } from "@/lib/seo";
import Breadcrumbs from "@/components/Breadcrumbs";
import PageCards from "@/components/PageCards";

// Whole page must be static; unknown categories return a real 404.
export const ensureStatic = "navigation";

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

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-10 sm:py-16">
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: c.name, path: `/${c.id}` },
        ]}
      />
      <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">{c.h1}</h1>
      <p className="mt-4 text-lg leading-relaxed text-muted">{c.intro}</p>
      <div className="mt-6">
        <PageCards pages={PAGES.filter((p) => p.category === c.id && p.tool !== "plot-size")} size="lg" />
      </div>
      {c.id === "zameen" && (
        <section className="mt-12">
          <h2 className="text-xl font-semibold tracking-tight">Popular plot sizes</h2>
          <PageCards pages={POPULAR_SIZE_PAGES} columns={3} />
        </section>
      )}
    </main>
  );
}
