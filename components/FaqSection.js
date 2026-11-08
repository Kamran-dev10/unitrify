import JsonLd from "@/components/JsonLd";
import { faqSchema } from "@/lib/schema";

// "Frequently asked questions" with FAQPage structured data.
export default function FaqSection({ faqs }) {
  if (!faqs?.length) return null;
  return (
    <section className="mt-12">
      <JsonLd data={faqSchema(faqs)} />
      <h2 className="text-xl font-semibold tracking-tight">Frequently asked questions</h2>
      <div className="mt-4 space-y-6">
        {faqs.map((f) => (
          <div key={f.question}>
            <h3 className="font-semibold">{f.question}</h3>
            <p className="mt-1 leading-relaxed text-muted">{f.answer}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
