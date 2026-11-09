import Link from "next/link";
import { CONVERTER_GROUPS, ALL_CONVERTERS_PAGE } from "@/lib/groups";
import { buildMetadata } from "@/lib/seo";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { itemListSchema } from "@/lib/schema";

export const metadata = buildMetadata(ALL_CONVERTERS_PAGE);

const linkClass = "transition-colors hover:text-accent";

// /converters: every group, category and pair page in one list (an HTML sitemap for people).
export default function AllConvertersPage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-10 sm:py-16">
      <JsonLd
        data={itemListSchema({
          name: ALL_CONVERTERS_PAGE.h1,
          path: ALL_CONVERTERS_PAGE.path,
          items: CONVERTER_GROUPS.flatMap((g) => g.items.map((i) => ({ name: i.h1, path: i.href }))),
        })}
      />
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "All converters", path: ALL_CONVERTERS_PAGE.path },
        ]}
      />
      <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">{ALL_CONVERTERS_PAGE.h1}</h1>
      <p className="mt-4 text-lg leading-relaxed text-muted">{ALL_CONVERTERS_PAGE.intro}</p>

      {CONVERTER_GROUPS.map((g) => (
        <section key={g.id} className="mt-12">
          <h2 className="text-xl font-semibold tracking-tight">
            <Link href={g.path} className={linkClass}>
              {g.name}
            </Link>
          </h2>
          <div className="mt-4 divide-y divide-line rounded-card border border-line bg-surface shadow-card">
            {g.items.map((item) => (
              <div key={item.id} className="px-5 py-4">
                <h3 className="font-medium">
                  <Link href={item.href} className={`${linkClass} text-ink`}>
                    {item.h1}
                  </Link>
                </h3>
                {item.pages.length > 0 && (
                  <ul className="mt-2 flex flex-wrap gap-x-4 text-sm text-muted">
                    {item.pages.map((p) => (
                      <li key={p.slug}>
                        <Link href={p.href} className={`${linkClass} inline-flex min-h-11 items-center`}>
                          {p.h1}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      ))}
    </main>
  );
}
