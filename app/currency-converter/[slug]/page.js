import { notFound } from "next/navigation";
import { CURRENCY_PAGES, getTool } from "@/lib/tools";
import { buildMetadata } from "@/lib/seo";
import { getRates } from "@/lib/currency-rates";
import { convertCurrency, currencyList, formatMoney, TABLE_AMOUNTS } from "@/lib/currency";
import ToolShell from "@/components/ToolShell";
import CurrencyConverter from "@/components/CurrencyConverter";
import RatesAttribution, { NoRatesMessage } from "@/components/RatesAttribution";
import FaqSection from "@/components/FaqSection";

// Same setup as the unit pair pages: fully static, real 404 for unknown slugs.
export const ensureStatic = "navigation";
export const instant = false;

const tool = getTool("currency-converter");
const getPage = (slug) => CURRENCY_PAGES.find((p) => p.slug === slug) ?? null;
const url = (p) => `/currency-converter/${p.slug}`;
const fmtAmount = (n) => n.toLocaleString("en-US");

export function generateStaticParams() {
  return CURRENCY_PAGES.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const p = getPage(slug);
  if (!p) return {};
  return buildMetadata({ title: p.title, description: p.metaDescription, path: url(p) });
}

// FAQs: two with numbers from the cached rates, one fixed per pair.
function buildFaqs(p, rates) {
  const [a, b] = p.amounts;
  const faqs = [];
  if (rates) {
    const ab = formatMoney(convertCurrency(a, p.from, p.to, rates));
    const ba = formatMoney(convertCurrency(b, p.to, p.from, rates));
    faqs.push(
      { question: `How much is ${fmtAmount(a)} ${p.from} in ${p.to}?`, answer: `${fmtAmount(a)} ${p.from} is about ${ab} ${p.to} at the latest mid-market rate.` },
      { question: `How many ${p.from} is ${fmtAmount(b)} ${p.to}?`, answer: `${fmtAmount(b)} ${p.to} is about ${ba} ${p.from} at the latest mid-market rate.` }
    );
  }
  faqs.push(p.extraFaq);
  return faqs;
}

export default async function CurrencyPairPage({ params }) {
  const { slug } = await params;
  const p = getPage(slug);
  if (!p) notFound();

  const data = await getRates();
  const rates = data?.rates ?? null;
  const one = rates ? formatMoney(convertCurrency(1, p.from, p.to, rates)) : null;
  const related = p.related.map(getPage).filter(Boolean).map((r) => ({ ...r, href: url(r) }));

  return (
    <ToolShell
      crumbs={[
        { name: "Home", path: "/" },
        { name: tool.name, path: "/currency-converter" },
        { name: p.h1, path: url(p) },
      ]}
      h1={p.h1}
      appName={p.title}
      quickAnswer={one ? `1 ${p.from} = ${one} ${p.to}` : null}
      tool={
        data ? (
          <>
            <CurrencyConverter rates={rates} currencies={currencyList(rates)} defaultFrom={p.from} defaultTo={p.to} />
            <RatesAttribution updatedUtc={data.updatedUtc} />
          </>
        ) : (
          <NoRatesMessage />
        )
      }
      related={related}
    >
      <p className="mt-10 text-lg leading-relaxed">{p.intro}</p>

      {rates && (
        <section className="mt-12">
          <h2 className="text-xl font-semibold tracking-tight">
            {p.from} to {p.to} table
          </h2>
          <div className="mt-4 overflow-x-auto rounded-card border border-line bg-surface shadow-card">
            <table className="w-full min-w-[18rem] border-collapse text-left">
              <thead>
                <tr className="border-b border-line">
                  <th scope="col" className="px-5 py-3 text-sm font-medium text-muted">{p.from}</th>
                  <th scope="col" className="px-5 py-3 text-sm font-medium text-muted">{p.to}</th>
                </tr>
              </thead>
              <tbody>
                {TABLE_AMOUNTS.map((n) => (
                  <tr key={n} className="border-b border-line last:border-b-0">
                    <td className="whitespace-nowrap px-5 py-3">
                      {fmtAmount(n)} {p.from}
                    </td>
                    <td className="whitespace-nowrap px-5 py-3 font-medium">
                      {formatMoney(convertCurrency(n, p.from, p.to, rates))} {p.to}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <RatesAttribution updatedUtc={data.updatedUtc} />
        </section>
      )}

      <FaqSection faqs={buildFaqs(p, rates)} />
    </ToolShell>
  );
}
