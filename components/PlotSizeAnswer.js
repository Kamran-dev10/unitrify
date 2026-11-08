import { formatResult, plotSizeSummary } from "@/lib/convert";
import Converter from "@/components/Converter";
import { categoryData } from "@/lib/category-data";

const STANDARDS = [
  { key: "revenue", label: "272.25 sq ft marla" },
  { key: "scheme", label: "250 sq ft marla" },
  { key: "urban", label: "225 sq ft marla" },
];

// Answer box for a fixed plot size (e.g. 5 marla), rendered on the server
// so the numbers are in the page HTML. Then the normal Converter, preset.
// Props: size (number), unitId ("marla" or "kanal"), name (e.g. "5 marla").
export default function PlotSizeAnswer({ size, unitId, name }) {
  const s = plotSizeSummary(size, unitId);
  const others = [
    { label: "Square yards", value: s.sqYd, symbol: "sq yd" },
    { label: "Square meters", value: s.sqM, symbol: "m²" },
    unitId === "kanal"
      ? { label: "Marla", value: s.marla, symbol: "marla" }
      : { label: "Kanal", value: s.kanal, symbol: "kanal" },
    { label: "Acres", value: s.acre, symbol: "acre" },
  ];

  return (
    <>
      <section className="rounded-card border border-line bg-surface p-5 shadow-card sm:p-8">
        <h2 className="text-sm font-medium text-muted">{name} in square feet</h2>
        <div className="mt-4 grid grid-cols-3 gap-2 sm:gap-3">
          {STANDARDS.map((st, i) => (
            <div
              key={st.key}
              className={`rounded-control p-3 sm:p-4 ${i === 0 ? "bg-accent-tint" : "border border-line"}`}
            >
              <p
                className={`break-words text-xl font-bold tracking-tight sm:text-3xl ${
                  i === 0 ? "text-accent" : "text-ink"
                }`}
              >
                {formatResult(s.sqFt[st.key])}
              </p>
              <p className="mt-1 text-xs text-muted sm:text-sm">sq ft · {st.label}</p>
            </div>
          ))}
        </div>

        <h2 className="mt-6 text-sm font-medium text-muted">Same size in other units (272.25 sq ft marla)</h2>
        <dl className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {others.map((o) => (
            <div key={o.label} className="rounded-control border border-line px-4 py-3">
              <dt className="text-sm text-muted">{o.label}</dt>
              <dd className="mt-1 text-lg font-semibold">
                {formatResult(o.value)} <span className="text-sm font-normal text-muted">{o.symbol}</span>
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <div className="mt-8">
        <h2 className="mb-4 text-xl font-semibold tracking-tight">Convert another size</h2>
        <Converter data={categoryData("zameen")} defaultFrom={unitId} defaultTo="sq-ft" defaultValue={size} />
      </div>
    </>
  );
}
