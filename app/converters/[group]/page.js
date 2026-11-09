import Link from "next/link";
import { notFound } from "next/navigation";
import { CONVERTER_GROUPS, getGroup, ALL_CONVERTERS_PAGE } from "@/lib/groups";
import { buildMetadata } from "@/lib/seo";
import Breadcrumbs from "@/components/Breadcrumbs";
import ConverterIcon from "@/components/ConverterIcon";
import { ArrowRight } from "lucide-react";
import JsonLd from "@/components/JsonLd";
import { itemListSchema } from "@/lib/schema";

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
      <JsonLd data={itemListSchema({ name: g.h1, path: g.path, items: g.items.map((i) => ({ name: i.h1, path: i.href })) })} />
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "All converters", path: ALL_CONVERTERS_PAGE.path },
          { name: g.name, path: g.path },
        ]}
      />
      <h1 className="mt-4 flex items-center gap-3 text-3xl font-bold tracking-tight sm:text-4xl">
        <ConverterIcon id={`group:${g.id}`} className="h-7 w-7 sm:h-8 sm:w-8" />
        {g.h1}
      </h1>
      <p className="mt-4 text-lg leading-relaxed text-muted">{g.intro}</p>

      <ul className="mt-10 grid gap-4 sm:grid-cols-2">
        {g.items.map((item) => (
          <li key={item.id} className="rounded-card border border-line bg-surface p-5 shadow-card">
            <h2 className="font-semibold">
              <Link href={item.href} className="flex min-h-11 items-center gap-2 text-ink transition-colors hover:text-accent">
                <ConverterIcon id={item.id} />
                {item.h1}
              </Link>
            </h2>
            {item.popular.length > 0 && (
              <ul className="mt-1 text-sm">
                {item.popular.map((p) => (
                  <li key={p.slug}>
                    <Link href={p.href} className="group/link inline-flex min-h-8 items-center gap-1 py-1 text-ink transition-colors hover:text-accent">
                      {p.h1}
                      <ArrowRight aria-hidden="true" className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover/link:opacity-100" />
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>

      {g.about && (
        <section className="mt-12 space-y-5 text-lg leading-relaxed">
          <h2 className="text-xl font-semibold tracking-tight">About {g.name.toLowerCase()} units</h2>
          {g.about.map((para, i) => (
            <p key={i}>
              {para.map((part, j) =>
                typeof part === "string" ? (
                  part
                ) : (
                  <Link key={j} href={part.href} className="text-accent underline transition-colors hover:text-accent-hover">
                    {part.text}
                  </Link>
                ),
              )}
            </p>
          ))}
        </section>
      )}
    </main>
  );
}
