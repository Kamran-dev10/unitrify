import { groupCrumbFor } from "@/lib/groups";
import { getTool, NUMBER_PAGES } from "@/lib/tools";
import { buildMetadata } from "@/lib/seo";
import ToolShell from "@/components/ToolShell";
import NumberBaseConverter from "@/components/NumberBaseConverter";
import RomanConverter from "@/components/RomanConverter";
import FaqSection from "@/components/FaqSection";
import PageCards from "@/components/PageCards";

const tool = getTool("number-converter");

export const metadata = buildMetadata({ title: tool.title, description: tool.metaDescription, path: "/number-converter" });

export default function NumberConverterPage() {
  const pairs = NUMBER_PAGES.map((p) => ({ ...p, href: `/number-converter/${p.slug}` }));
  return (
    <ToolShell
      crumbs={[
        { name: "Home", path: "/" },
        groupCrumbFor("number-converter"),
        { name: tool.name, path: "/number-converter" },
      ].filter(Boolean)}
      h1={tool.h1}
      appName={tool.title}
      tool={<NumberBaseConverter defaultValue="255" defaultFrom={10} defaultTo={2} />}
    >
      <section className="mt-12">
        <h2 className="text-xl font-semibold tracking-tight">Roman numerals</h2>
        <div className="mt-4">
          <RomanConverter />
        </div>
      </section>

      <p className="mt-12 text-lg leading-relaxed">{tool.intro}</p>

      <section className="mt-12">
        <h2 className="text-xl font-semibold tracking-tight">Number converters</h2>
        <PageCards pages={pairs} size="lg" />
      </section>

      <FaqSection faqs={tool.faqs} />
    </ToolShell>
  );
}
