import { SITE_NAME } from "@/lib/config";

export default function manifest() {
  return {
    name: `${SITE_NAME} – Every measurement, one place.`,
    short_name: SITE_NAME,
    description: "Pakistani land unit converters (marla, kanal, acre) and everyday unit converters.",
    start_url: "/",
    display: "standalone",
    theme_color: "#0F766E",
    background_color: "#FAFAF7",
    icons: [
      { src: "/icon/192", sizes: "192x192", type: "image/png" },
      { src: "/icon/512", sizes: "512x512", type: "image/png" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}
