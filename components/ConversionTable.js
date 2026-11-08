import { convert, formatResult, getUnits, hasMarlaStandard } from "@/lib/convert";
import { MARLA_STANDARDS } from "@/lib/units";

const ROWS = [
  ...Array.from({ length: 20 }, (_, i) => i + 1),
  25, 30, 40, 50, 75, 100,
];

// Plain HTML table of common values. No hooks, so it works both on the
// server and inside the Converter (where it follows the marla standard).
export default function ConversionTable({
  category,
  fromId,
  toId,
  marlaSize = MARLA_STANDARDS.revenue,
}) {
  const units = getUnits(category, { marlaSize });
  const from = units.find((u) => u.id === fromId);
  const to = units.find((u) => u.id === toId);
  if (!from || !to) return null;

  const usesMarla =
    hasMarlaStandard(category) && ["marla", "kanal"].some((id) => id === fromId || id === toId);

  return (
    <section className="mt-12">
      <h2 className="text-xl font-semibold tracking-tight">
        {from.name} to {to.name} table
      </h2>
      {usesMarla && (
        <p className="mt-1 text-sm text-muted">
          Using 1 marla = {formatResult(marlaSize)} sq ft
        </p>
      )}

      <div className="mt-4 overflow-x-auto rounded-card border border-line bg-surface shadow-card">
        <table className="w-full min-w-[18rem] border-collapse text-left">
          <thead>
            <tr className="border-b border-line">
              <th scope="col" className="px-5 py-3 text-sm font-medium text-muted">
                {from.name} ({from.symbol})
              </th>
              <th scope="col" className="px-5 py-3 text-sm font-medium text-muted">
                {to.name} ({to.symbol})
              </th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map((n) => (
              <tr key={n} className="border-b border-line last:border-b-0">
                <td className="whitespace-nowrap px-5 py-3">
                  {n} {from.symbol}
                </td>
                <td className="whitespace-nowrap px-5 py-3 font-medium">
                  {formatResult(convert(n, fromId, toId, category, { marlaSize }))} {to.symbol}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
