// The real domain, from NEXT_PUBLIC_SITE_URL (e.g. https://www.example.com).
// Any other host (vercel.app, preview URLs, localhost) gets a noindex
// header, so only the real domain can show up in search results.
function siteHost() {
  try {
    return new URL(process.env.NEXT_PUBLIC_SITE_URL || "").host;
  } catch {
    return "";
  }
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  // "Moment of force" uses the same units as torque: one page, one URL.
  async redirects() {
    return [{ source: "/moment-of-force", destination: "/torque", permanent: true }];
  },
  async headers() {
    const host = siteHost();
    const noindex = [{ key: "X-Robots-Tag", value: "noindex, nofollow" }];
    // No real domain configured: nothing is the real site, so noindex everything.
    if (!host) return [{ source: "/:path*", headers: noindex }];
    // Real domain configured: noindex only when the request host is something else.
    // The host value is a pattern, so dots are escaped to match only real dots.
    const pattern = host.replace(/\./g, "\\.");
    return [{ source: "/:path*", missing: [{ type: "host", value: pattern }], headers: noindex }];
  },
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
