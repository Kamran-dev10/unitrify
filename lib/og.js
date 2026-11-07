// Shared drawing for generated images (favicon, apple icon, Open Graph).
// next/og cannot read CSS variables, so the theme colours are repeated here.
// Keep them in sync with the tokens in app/globals.css.
import { SITE_NAME } from "./config.js";

export const THEME = {
  page: "#FAFAF7",
  surface: "#FFFFFF",
  line: "#E7E5E0",
  ink: "#1F2937",
  muted: "#676D7B",
  accent: "#0F766E",
  tint: "#E6F2EF",
};

export const OG_SIZE = { width: 1200, height: 630 };

// Square icon: first letter of SITE_NAME, white on the accent green.
// rounded: false for the Apple icon (iOS rounds the corners itself).
export function iconElement(px, { rounded = true } = {}) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: THEME.accent,
        color: THEME.surface,
        fontSize: Math.round(px * 0.68),
        fontWeight: 700,
        borderRadius: rounded ? Math.round(px * 0.22) : 0,
      }}
    >
      {SITE_NAME.charAt(0).toUpperCase()}
    </div>
  );
}

// 1200x630 social card. `title` is the big line, `subtitle` the smaller one.
export function ogElement({ title, subtitle }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: THEME.page,
        padding: 72,
        color: THEME.ink,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <div
          style={{
            width: 64,
            height: 64,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: THEME.accent,
            color: THEME.surface,
            borderRadius: 16,
            fontSize: 44,
            fontWeight: 700,
          }}
        >
          {SITE_NAME.charAt(0).toUpperCase()}
        </div>
        <div style={{ fontSize: 40, fontWeight: 700 }}>{SITE_NAME}</div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          background: THEME.surface,
          border: `2px solid ${THEME.line}`,
          borderRadius: 32,
          padding: "48px 56px",
        }}
      >
        <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.1, letterSpacing: -1 }}>{title}</div>
        {subtitle && <div style={{ marginTop: 20, fontSize: 36, color: THEME.muted }}>{subtitle}</div>}
      </div>

      <div style={{ display: "flex", height: 12, borderRadius: 6, background: THEME.accent }} />
    </div>
  );
}
