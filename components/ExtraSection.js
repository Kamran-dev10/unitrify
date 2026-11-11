// One short, practical section from the page data: a real-world example or a
// common mistake. extra: { heading, text }
export default function ExtraSection({ extra }) {
  return (
    <section className="mt-12">
      <h2 className="text-xl font-semibold tracking-tight">{extra.heading}</h2>
      <p className="mt-3 text-lg leading-relaxed">{extra.text}</p>
    </section>
  );
}
