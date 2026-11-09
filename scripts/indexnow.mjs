// npm run indexnow: tells IndexNow (Bing, Yandex, ...) about every URL in
// the live sitemap. Run it after a deploy. Does nothing when INDEXNOW_KEY
// or NEXT_PUBLIC_SITE_URL is missing, or when the site URL is localhost.
const key = (process.env.INDEXNOW_KEY || "").trim();
const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "").trim().replace(/\/+$/, "");

function skip(reason) {
  console.log(`IndexNow: skipped (${reason}).`);
  process.exit(0);
}

if (!key) skip("INDEXNOW_KEY is not set");
if (!siteUrl) skip("NEXT_PUBLIC_SITE_URL is not set");
let host;
try {
  host = new URL(siteUrl).hostname;
} catch {
  skip("NEXT_PUBLIC_SITE_URL is not a valid URL");
}
if (host === "localhost" || host === "127.0.0.1" || host.endsWith(".local")) skip("the site URL is localhost");

const sitemap = await fetch(`${siteUrl}/sitemap.xml`);
if (!sitemap.ok) {
  console.error(`IndexNow: could not read ${siteUrl}/sitemap.xml (${sitemap.status}).`);
  process.exit(1);
}
const urlList = [...(await sitemap.text()).matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

// IndexNow accepts up to 10,000 URLs per request.
const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host, key, keyLocation: `${siteUrl}/${key}.txt`, urlList: urlList.slice(0, 10000) }),
});
console.log(`IndexNow: submitted ${urlList.length} URLs, response ${res.status} ${res.statusText}`);
process.exit(res.ok ? 0 : 1);
