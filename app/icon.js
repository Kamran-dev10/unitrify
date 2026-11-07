import { ImageResponse } from "next/og";
import { iconElement } from "@/lib/og";

// Favicon in three sizes, built at build time:
// /icon/32 (browser tab), /icon/192 and /icon/512 (manifest, logo).
export const ICON_SIZES = [32, 192, 512];

export function generateImageMetadata() {
  return ICON_SIZES.map((px) => ({
    id: String(px),
    contentType: "image/png",
    size: { width: px, height: px },
  }));
}

export default async function Icon({ id }) {
  const px = Number(await id);
  return new ImageResponse(iconElement(px), { width: px, height: px });
}
