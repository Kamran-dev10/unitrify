import { notFound } from "next/navigation";
import { NUMBER_PAGES, getTool } from "@/lib/tools";
import { buildMetadata } from "@/lib/seo";
import { baseName } from "@/lib/number-base";
import ToolShell from "@/components/ToolShell";
import NumberBaseConverter from "@/components/NumberBaseConverter";
import RomanConverter from "@/components/RomanConverter";
import FaqSection from "@/components/FaqSection";

// Same setup as the unit pair pages: fully static, real 404 for unknown slugs.
export const ensureStatic = "navigation";
export const instant = false;

const tool = getTool("number-converter");
const getPage = (slug) => NUMBER_PAGES.find((p) => p.slug === slug) ?? null;
const url = (p) => `/number-converter/${p.slug}`;

export function generateStaticParams() {
  return NUMBER_PAGES.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const p = getPage(slug);
  if (!p) return {};
  return buildMetadata({ title: p.title, description: p.metaDescription, path: url(p) });
}

export default async function NumberPairPage({ params }) {
  const { slug } = await params;
  const p = getPage(slug);
  if (!p) notFound();

  const toolEl =
    p.kind === "roman" ? (
      <RomanConverter defaultMode={p.mode} defaultValue={p.defaultValue} />
    ) : (
      <NumberBaseConverter defaultValue={p.defaultValue} defaultFrom={p.fromBase} defaultTo={p.toBase} />
    );
  const [colA, colB] =
    p.kind === "roman"
      ? p.mode === "toRoman"
        ? ["Number", "Roman numeral"]
        : ["Roman numeral", "Number"]
      : [baseName(p.fromBase), baseName(p.toBase)].map((s) => s.replace(/^./, (c) => c.toUpperCase()));
  const related = p.related.map(getPage).filter(Boolean).map((r) => ({ ...r, href: url(r) }));

  return (
    <ToolShell
      crumbs={[
        { name: "Home", path: "/" },
        { name: tool.name, path: "/number-converter" },
        { name: p.h1, path: url(p) },
      ]}
      h1={p.h1}
      appName={p.title}
      quickAnswer={p.quickAnswer}
      tool={toolEl}
      related={related}
    >
      <section className="mt-10">
        <p className="text-lg leading-relaxed">{p.intro}</p>
        <h2 className="mt-6 text-xl font-semibold tracking-tight">How it works</h2>
        <p className="mt-3 rounded-control border border-line bg-surface px-5 py-4 font-medium">{p.formula}</p>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-semibold tracking-tight">
          {colA} to {colB.toLowerCase()} table
        </h2>
        <div className="mt-4 overflow-x-auto rounded-card border border-line bg-surface shadow-card">
          <table className="w-full min-w-[18rem] border-collapse text-left">
            <thead>
              <tr className="border-b border-line">
                <th scope="col" className="px-5 py-3 text-sm font-medium text-muted">{colA}</th>
                <th scope="col" className="px-5 py-3 text-sm font-medium text-muted">{colB}</th>
              </tr>
            </thead>
            <tbody>
              {p.examples.map(([a, b]) => (
                <tr key={a} className="border-b border-line last:border-b-0">
                  <td className="px-5 py-3 font-mono">{a}</td>
                  <td className="px-5 py-3 font-mono font-medium">{b}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <FaqSection faqs={p.faqs} />
    </ToolShell>
  );
}
