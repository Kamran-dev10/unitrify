/** @type {import('next').NextConfig} */
const nextConfig = {
  // Build date, used for lastModified in app/sitemap.js.
  env: {
    BUILD_DATE: new Date().toISOString(),
  },
  // "Moment of force" uses the same units as torque: one page, one URL.
  async redirects() {
    return [{ source: "/moment-of-force", destination: "/torque", permanent: true }];
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
