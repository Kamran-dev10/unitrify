import { ImageResponse } from "next/og";
import { SITE_NAME } from "@/lib/config";

// Favicon: first letter of SITE_NAME on the accent green. Built at build time.
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0F766E", // accent (same as --color-accent in globals.css)
          color: "#FFFFFF",
          fontSize: 22,
          fontWeight: 700,
          borderRadius: 7,
        }}
      >
        {SITE_NAME.charAt(0).toUpperCase()}
      </div>
    ),
    size
  );
}
