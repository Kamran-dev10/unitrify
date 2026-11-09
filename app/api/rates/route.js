import { getRates } from "@/lib/currency-rates";

// Exchange rates for the search box, served from our own server: the same
// 24-hour cached rates as the currency pages (lib/currency-rates.js). The
// visitor's browser never calls the external rates API.
export async function GET() {
  const data = await getRates();
  if (!data) return Response.json({ error: "Rates are not available yet." }, { status: 503 });
  return Response.json({ rates: data.rates, updatedUtc: data.updatedUtc });
}
