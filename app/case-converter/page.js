import { groupCrumbFor } from "@/lib/groups";
import { getTool } from "@/lib/tools";
import { buildMetadata } from "@/lib/seo";
import ToolShell from "@/components/ToolShell";
import CaseConverter from "@/components/CaseConverter";
import FaqSection from "@/components/FaqSection";

const tool = getTool("case-converter");

export const metadata = buildMetadata({ title: tool.title, description: tool.metaDescription, path: "/case-converter" });

const WHEN = [
  ["UPPERCASE", "Short labels, warnings and acronyms"],
  ["lowercase", "Email addresses, tags and URLs"],
  ["Title Case", "Headings, book and article titles"],
  ["Sentence case", "Normal sentences, buttons and captions"],
  ["camelCase", "Variables and functions in JavaScript and Java"],
  ["PascalCase", "Class and component names"],
  ["snake_case", "Python variables, database columns and file names"],
  ["kebab-case", "URLs, CSS classes and file names"],
  ["CONSTANT_CASE", "Constants and environment variables"],
  ["aLtErNaTiNg cAsE", "Jokes and memes"],
  ["iNVERSE cASE", "Fixing text typed with Caps Lock on"],
];

export default function CaseConverterPage() {
  return (
    <ToolShell
      crumbs={[
        { name: "Home", path: "/" },
        groupCrumbFor("case-converter"),
        { name: tool.name, path: "/case-converter" },
      ].filter(Boolean)}
      h1={tool.h1}
      appName={tool.title}
      tool={<CaseConverter />}
    >
      <p className="mt-10 text-lg leading-relaxed">{tool.intro}</p>

      <section className="mt-12">
        <h2 className="text-xl font-semibold tracking-tight">When to use each case</h2>
        <div className="mt-4 overflow-x-auto rounded-card border border-line bg-surface shadow-card">
          <table className="w-full min-w-[20rem] border-collapse text-left">
            <thead>
              <tr className="border-b border-line">
                <th scope="col" className="px-5 py-3 text-sm font-medium text-muted">Case</th>
                <th scope="col" className="px-5 py-3 text-sm font-medium text-muted">Use it for</th>
              </tr>
            </thead>
            <tbody>
              {WHEN.map(([c, use]) => (
                <tr key={c} className="border-b border-line last:border-b-0">
                  <th scope="row" className="whitespace-nowrap px-5 py-3 font-medium">{c}</th>
                  <td className="px-5 py-3">{use}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <FaqSection faqs={tool.faqs} />
    </ToolShell>
  );
}
