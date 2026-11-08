import { formatRatesDate } from "@/lib/currency";

// Shown on every page that shows exchange rates.
export default function RatesAttribution({ updatedUtc }) {
  return (
    <div className="mt-4 space-y-1 text-sm text-muted">
      {updatedUtc && <p>Rates updated: {formatRatesDate(updatedUtc)}</p>}
      {/* Attribution link required by ExchangeRate-API, kept exactly as given. */}
      <p className="underline">
        <a href="https://www.exchangerate-api.com">Rates By Exchange Rate API</a>
      </p>
      <p>
        These are mid-market reference rates, for information only. Banks and money changers use different rates.
      </p>
    </div>
  );
}

export function NoRatesMessage() {
  return (
    <div className="rounded-card border border-line bg-surface p-5 shadow-card sm:p-8">
      <p className="text-lg font-semibold">Exchange rates are not available right now.</p>
      <p className="mt-2 text-muted">We could not load today&apos;s rates. Please check again a little later.</p>
    </div>
  );
}
