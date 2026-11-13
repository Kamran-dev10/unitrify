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

// Security headers for every page. No nonces, so every page stays static.
// Vercel Analytics loads from our own domain (/_vercel/insights/...) on Vercel;
// va.vercel-scripts.com is its script host outside Vercel (debug mode).
// Strict-Transport-Security is sent by Vercel, so it is not set here.
const CSP = [
  "default-src 'self'",
  // 'unsafe-eval' only for `next dev` (React's dev tools use eval); never in production.
  `script-src 'self' 'unsafe-inline'${process.env.NODE_ENV === "development" ? " 'unsafe-eval'" : ""} https://va.vercel-scripts.com`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  "connect-src 'self' https://va.vercel-scripts.com",
  "frame-ancestors 'self'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join("; ");

export const SECURITY_HEADERS = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "Content-Security-Policy", value: CSP },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  // "Moment of force" uses the same units as torque: one page, one URL.
  async redirects() {
    return [{ source: "/moment-of-force", destination: "/torque", permanent: true }];
  },
  async headers() {
    const host = siteHost();
    const security = { source: "/:path*", headers: SECURITY_HEADERS };
    const noindex = [{ key: "X-Robots-Tag", value: "noindex, nofollow" }];
    // No real domain configured: nothing is the real site, so noindex everything.
    if (!host) return [security, { source: "/:path*", headers: noindex }];
    // Real domain configured: noindex only when the request host is something else.
    // The host value is a pattern, so dots are escaped to match only real dots.
    const pattern = host.replace(/\./g, "\\.");
    return [security, { source: "/:path*", missing: [{ type: "host", value: pattern }], headers: noindex }];
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
