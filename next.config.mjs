/** @type {import('next').NextConfig} */
const nextConfig = {
  // Build date, used for lastModified in app/sitemap.js.
  env: {
    BUILD_DATE: new Date().toISOString(),
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
