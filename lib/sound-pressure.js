// Sound pressure (Pa) <-> sound pressure level (dB SPL).
// Reference pressure 20 µPa: L = 20 × log10(p / 20e-6).
export const REFERENCE_PA = 20e-6;

// paToDbSpl(1) -> 93.979...; null for empty, zero or negative pressure.
export function paToDbSpl(pa) {
  const p = Number(pa);
  if (String(pa).trim() === "" || !Number.isFinite(p) || p <= 0) return null;
  return 20 * Math.log10(p / REFERENCE_PA);
}

// dbSplToPa(94) -> 1.0023...; null for empty input. Negative dB is allowed.
export function dbSplToPa(db) {
  const l = Number(db);
  if (String(db).trim() === "" || !Number.isFinite(l)) return null;
  return REFERENCE_PA * 10 ** (l / 20);
}
