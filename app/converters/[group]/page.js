import Link from "next/link";
import { notFound } from "next/navigation";
import { CONVERTER_GROUPS, getGroup, ALL_CONVERTERS_PAGE } from "@/lib/groups";
import { buildMetadata } from "@/lib/seo";
import Breadcrumbs from "@/components/Breadcrumbs";

// Same setup as app/[category]/page.js: fully prerendered, real 404s.
export const ensureStatic = "navigation";
export const instant = false;

export function generateStaticParams() {
  return CONVERTER_GROUPS.map((g) => ({ group: g.id }));
}

export async function generateMetadata({ params }) {
  const { group } = await params;
  const g = getGroup(group);
  if (!g) return {};
  return buildMetadata({ title: g.title, description: g.description, path: g.path });
}

// /converters/<group>: every category of the group as a card, with its most popular pages.
export default async function GroupPage({ params }) {
  const { group } = await params;
  const g = getGroup(group);
  if (!g) notFound();

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-10 sm:py-16">
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "All converters", path: ALL_CONVERTERS_PAGE.path },
          { name: g.name, path: g.path },
        ]}
      />
      <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">{g.h1}</h1>
      <p className="mt-4 text-lg leading-relaxed text-muted">{g.intro}</p>

      <ul className="mt-10 grid gap-4 sm:grid-cols-2">
        {g.items.map((item) => (
          <li key={item.id} className="rounded-card border border-line bg-surface p-5 shadow-card">
            <h2 className="font-semibold">
              <Link href={item.href} className="flex min-h-11 items-center text-ink transition-colors hover:text-accent">
                {item.h1}
              </Link>
            </h2>
            {item.popular.length > 0 && (
              <ul className="mt-1 text-sm">
                {item.popular.map((p) => (
                  <li key={p.slug}>
                    <Link href={p.href} className="flex min-h-11 items-center text-muted transition-colors hover:text-accent">
                      {p.h1}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </main>
  );
}
