import { ImageResponse } from "next/og";
import { SITE_NAME } from "@/lib/config";
import { OG_SIZE, ogElement } from "@/lib/og";

// Default social image for every page that has no image of its own.
export const alt = `${SITE_NAME}: Every measurement, one place.`;
export const size = OG_SIZE;
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    ogElement({
      title: "Every measurement, one place.",
      subtitle: "Marla, kanal, acre and everyday unit converters",
    }),
    size
  );
}
