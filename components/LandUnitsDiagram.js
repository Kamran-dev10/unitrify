// Inline SVG: 1 acre = 8 kanal = 160 marla (revenue standard, 1 marla = 272.25 sq ft).
// The acre is drawn as 8 kanal strips (2 rows of 4); one kanal is split into its 20 marla.
// Colours come from the theme tokens through currentColor and CSS variables.
const KANAL_W = 120;
const KANAL_H = 80;
const X0 = 20;
const Y0 = 20;

export default function LandUnitsDiagram() {
  const kanals = [];
  for (let row = 0; row < 2; row++) {
    for (let col = 0; col < 4; col++) kanals.push({ x: X0 + col * KANAL_W, y: Y0 + row * KANAL_H, first: row === 0 && col === 0 });
  }
  // 20 marla inside the first kanal: 5 columns × 4 rows.
  const marlas = [];
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 5; c++) marlas.push({ x: X0 + c * (KANAL_W / 5), y: Y0 + r * (KANAL_H / 4) });
  }

  return (
    <figure className="mt-4 rounded-card border border-line bg-surface p-4 shadow-card">
      <svg
        viewBox="0 0 520 230"
        role="img"
        aria-labelledby="land-diagram-title land-diagram-desc"
        className="h-auto w-full text-accent"
      >
        <title id="land-diagram-title">1 acre = 8 kanal = 160 marla</title>
        <desc id="land-diagram-desc">
          A square acre divided into 8 equal kanal plots, two rows of four. The first kanal is divided again into 20
          equal marla plots. This uses the revenue standard, where 1 marla is 272.25 square feet, 1 kanal is 20 marla
          (5,445 square feet) and 1 acre is 8 kanal (43,560 square feet).
        </desc>
        {marlas.map((m, i) => (
          <rect
            key={`m${i}`}
            x={m.x}
            y={m.y}
            width={KANAL_W / 5}
            height={KANAL_H / 4}
            fill="var(--color-accent-tint)"
            stroke="currentColor"
            strokeOpacity="0.35"
            strokeWidth="0.75"
          />
        ))}
        {kanals.map((k, i) => (
          <rect key={`k${i}`} x={k.x} y={k.y} width={KANAL_W} height={KANAL_H} fill="none" stroke="currentColor" strokeWidth="1.5" />
        ))}
        <rect x={X0} y={Y0} width={KANAL_W * 4} height={KANAL_H * 2} fill="none" stroke="currentColor" strokeWidth="3" />
        {kanals.map((k, i) =>
          k.first ? null : (
            <text key={`t${i}`} x={k.x + KANAL_W / 2} y={k.y + KANAL_H / 2 + 5} textAnchor="middle" fontSize="15" fill="var(--color-ink)">
              1 kanal
            </text>
          ),
        )}
        <text x={X0} y={Y0 + KANAL_H * 2 + 28} fontSize="15" fontWeight="600" fill="var(--color-ink)">
          1 acre = 8 kanal = 160 marla
        </text>
        <text x={X0} y={Y0 + KANAL_H * 2 + 48} fontSize="13" fill="var(--color-muted)">
          Shaded kanal = 20 marla · revenue marla = 272.25 sq ft
        </text>
      </svg>
      <figcaption className="mt-3 text-sm leading-relaxed text-muted">
        Each of the 8 kanal is 20 marla, so one acre holds 160 marla. With a 250 or 225 sq ft marla, an acre
        holds 174.24 or 193.6 marla instead, so check which marla your documents use.
      </figcaption>
    </figure>
  );
}
