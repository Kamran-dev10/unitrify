import { formatSmart, getUnits } from "@/lib/convert";
import { prettyNumber } from "@/lib/engine";

// How a unit relates to the category's base unit, as text.
function relation(unit, base) {
  const f = formatSmart(unit.factor);
  if (unit.kind === "linear") return `1 ${unit.symbol} = ${f} ${base.symbol}`;
  if (unit.kind === "inverse") return `${base.symbol} = ${f} ÷ ${unit.symbol}`;
  // affine: base = value × factor + offset
  const times = unit.factor === 1 ? unit.symbol : `${unit.symbol} × ${f}`;
  if (unit.offset === 0) return `${base.symbol} = ${times}`;
  const sign = unit.offset < 0 ? "−" : "+";
  return `${base.symbol} = ${times} ${sign} ${formatSmart(Math.abs(unit.offset))}`;
}

// "Units in this category": every unit with its value in the base unit.
// Server component, so the table is in the page HTML.
export default function UnitsTable({ category }) {
  const units = getUnits(category.id);
  const base = units.find((u) => u.id === category.baseUnit);
  if (!base) return null;

  return (
    <div className="mt-4 overflow-x-auto rounded-card border border-line bg-surface shadow-card">
      <table className="w-full min-w-[20rem] border-collapse text-left">
        <thead>
          <tr className="border-b border-line">
            <th scope="col" className="px-5 py-3 text-sm font-medium text-muted">Unit</th>
            <th scope="col" className="px-5 py-3 text-sm font-medium text-muted">Symbol</th>
            <th scope="col" className="px-5 py-3 text-sm font-medium text-muted">In base unit ({base.symbol})</th>
          </tr>
        </thead>
        <tbody>
          {units.map((u) => (
            <tr key={u.id} className="border-b border-line last:border-b-0">
              <th scope="row" className="px-5 py-3 font-medium">
                {u.name}
                {u.country !== "global" && (
                  <span className="ml-2 text-xs font-normal uppercase text-muted">{u.country}</span>
                )}
              </th>
              <td className="whitespace-nowrap px-5 py-3 text-muted">{u.symbol}</td>
              <td className="whitespace-nowrap px-5 py-3">{prettyNumber(relation(u, base))}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
