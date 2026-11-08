import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import PageCards from "@/components/PageCards";
import { webApplicationSchema } from "@/lib/schema";

// Common layout for tool pages: breadcrumbs, h1, quick answer, the tool,
// then children (content), then related links.
// crumbs: [{ name, path }] (last one is this page); related: [{ slug, h1, href }]
export default function ToolShell({ crumbs, h1, appName, quickAnswer, tool, related = [], children }) {
  const path = crumbs[crumbs.length - 1].path;
  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-10 sm:py-16">
      <JsonLd data={webApplicationSchema({ name: appName, path })} />
      <Breadcrumbs items={crumbs} />
      <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">{h1}</h1>
      {quickAnswer && <p className="mt-3 text-xl font-semibold text-accent">{quickAnswer}</p>}
      <div className="mt-8">{tool}</div>
      {children}
      {related.length > 0 && (
        <section className="mt-12">
          <h2 className="text-xl font-semibold tracking-tight">Related converters</h2>
          <PageCards pages={related} columns={3} />
        </section>
      )}
    </main>
  );
}
