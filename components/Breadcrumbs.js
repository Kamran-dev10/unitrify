import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";

// items: [{ name, path }]. The last item is the current page.
export default function Breadcrumbs({ items }) {
  return (
    <>
      <JsonLd data={breadcrumbSchema(items)} />
      <nav aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted">
          {items.map((item, i) => {
            const last = i === items.length - 1;
            return (
              <li key={item.path} className="flex items-center gap-2">
                {last ? (
                  <span aria-current="page" className="text-ink">
                    {item.name}
                  </span>
                ) : (
                  <>
                    <Link href={item.path} className="transition-colors hover:text-ink">
                      {item.name}
                    </Link>
                    <span aria-hidden="true">›</span>
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
