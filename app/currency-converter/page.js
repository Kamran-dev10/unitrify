import { getTool, CURRENCY_PAGES } from "@/lib/tools";
import { buildMetadata } from "@/lib/seo";
import { getRates } from "@/lib/currency-rates";
import { currencyList } from "@/lib/currency";
import ToolShell from "@/components/ToolShell";
import CurrencyConverter from "@/components/CurrencyConverter";
import RatesAttribution, { NoRatesMessage } from "@/components/RatesAttribution";
import FaqSection from "@/components/FaqSection";
import PageCards from "@/components/PageCards";

const tool = getTool("currency-converter");

export const metadata = buildMetadata({ title: tool.title, description: tool.metaDescription, path: "/currency-converter" });

export default async function CurrencyConverterPage() {
  const data = await getRates();
  const pairs = CURRENCY_PAGES.map((p) => ({ ...p, href: `/currency-converter/${p.slug}` }));

  return (
    <ToolShell
      crumbs={[
        { name: "Home", path: "/" },
        { name: tool.name, path: "/currency-converter" },
      ]}
      h1={tool.h1}
      appName={tool.title}
      tool={
        data ? (
          <>
            <CurrencyConverter rates={data.rates} currencies={currencyList(data.rates)} defaultFrom="USD" defaultTo="PKR" />
            <RatesAttribution updatedUtc={data.updatedUtc} />
          </>
        ) : (
          <NoRatesMessage />
        )
      }
    >
      <p className="mt-10 text-lg leading-relaxed">{tool.intro}</p>

      <section className="mt-12">
        <h2 className="text-xl font-semibold tracking-tight">Popular currency pairs</h2>
        <PageCards pages={pairs} />
      </section>

      <FaqSection faqs={tool.faqs} />
    </ToolShell>
  );
}
