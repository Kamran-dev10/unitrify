import { COMPOUNDS, compoundText, convertWith, formatResult, unitsFor } from "@/lib/engine";

export const TABLE_ROWS = [
  ...Array.from({ length: 20 }, (_, i) => i + 1),
  25, 30, 40, 50, 75, 100,
];

// The table's values: a page's own full list (rowSet), or the usual rows plus
// a page's common values (e.g. 59, 66, 70 inches). Sorted, no repeats.
export const tableRowsFor = (extraRows = [], rowSet) =>
  [...new Set([...(rowSet ?? TABLE_ROWS), ...extraRows])].sort((a, b) => a - b);

const th = "px-4 py-3 text-sm font-medium text-muted sm:px-5";
const td = "whitespace-nowrap px-4 py-3 sm:px-5";

// Plain HTML table of common values. No hooks, so it works both on the
// server and inside the Converter (where it follows the marla standard).
export default function ConversionTable({
  data, // unit data of ONE category, from categoryData() in lib/category-data.js
  fromId,
  toId,
  options = {}, // the category setting, e.g. { marlaSize: 250 } or { baseFontPx: 16 }
  extraRows = [], // common values to add to the usual rows
  rowSet, // optional: the full list of values (replaces the usual rows)
  allChoices = false, // one result column per category setting (every marla size)
  compound, // optional: "feet-inches" or "pounds-ounces" column
  title, // optional heading (default "<from> to <to> table")
}) {
  const units = unitsFor(data, options);
  const marlaSize = options.marlaSize ?? data?.option?.defaultValue;
  const from = units.find((u) => u.id === fromId);
  const to = units.find((u) => u.id === toId);
  if (!from || !to) return null;

  const usesMarla =
    data.option?.key === "marlaSize" && ["marla", "kanal"].some((id) => id === fromId || id === toId);
  // Every standard side by side, so no number is shown without its marla size.
  const columns =
    allChoices && data.option
      ? data.option.choices.map((choice) => ({
          key: String(choice),
          // "sq ft (272.25 sq ft marla)": short enough for three columns on a phone.
          label: `${to.symbol} (${formatResult(choice)} ${data.option.suffix} marla)`,
          opts: { ...options, [data.option.key]: choice },
        }))
      : [{ key: "one", label: `${to.name} (${to.symbol})`, opts: options }];
  const compoundInfo = compound ? COMPOUNDS[compound] : null;

  return (
    <section className="mt-12">
      <h2 className="text-xl font-semibold tracking-tight">{title ?? `${from.name} to ${to.name} table`}</h2>
      {usesMarla && !allChoices && (
        <p className="mt-1 text-sm text-muted">Using 1 marla = {formatResult(marlaSize)} sq ft</p>
      )}
      {allChoices && data.option && (
        <p className="mt-1 text-sm text-muted">
          One column for each marla size: {data.option.choices.map((c) => `${formatResult(c)} sq ft`).join(", ")}.
        </p>
      )}

      <div className="mt-4 overflow-x-auto rounded-card border border-line bg-surface shadow-card">
        <table className="w-full min-w-[18rem] border-collapse text-left">
          <thead>
            <tr className="border-b border-line">
              <th scope="col" className={th}>
                {from.name} ({from.symbol})
              </th>
              {columns.map((c) => (
                <th key={c.key} scope="col" className={th}>
                  {c.label}
                </th>
              ))}
              {compoundInfo && (
                <th scope="col" className={th}>
                  {compoundInfo.label}
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {tableRowsFor(extraRows, rowSet).map((n) => (
              <tr key={n} className="border-b border-line last:border-b-0">
                <td className={td}>
                  {formatResult(n)} {from.symbol}
                </td>
                {columns.map((c) => (
                  <td key={c.key} className={`${td} font-medium`}>
                    {formatResult(convertWith(data, n, fromId, toId, c.opts))} {to.symbol}
                  </td>
                ))}
                {compoundInfo && <td className={td}>{compoundText(data, n, fromId, compound, options)}</td>}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
