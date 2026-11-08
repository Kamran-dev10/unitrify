// Download Time Calculator, browser-safe part: no unit registry imports.
// storage / transfer are unit data for data-storage and data-transfer
// (registry categories or categoryData() objects). Both use bits as the base.
import { convertWith } from "./engine.js";

// downloadSecondsWith(storage, transfer, 1, "gb", 100, "mbps") -> 80
// Returns null for empty, negative or zero-speed input.
export function downloadSecondsWith(storage, transfer, size, sizeUnit, speed, speedUnit) {
  const bits = convertWith(storage, size, sizeUnit, "bit");
  const bitsPerSecond = convertWith(transfer, speed, speedUnit, "bps");
  if (bits === null || bitsPerSecond === null || bitsPerSecond === 0) return null;
  return bits / bitsPerSecond;
}

// splitDuration(3725) -> { hours: 1, minutes: 2, seconds: 5 }
// Seconds are rounded to 2 decimals (and up to a whole second above 60 s).
export function splitDuration(totalSeconds) {
  if (totalSeconds === null || !Number.isFinite(totalSeconds) || totalSeconds < 0) return null;
  const rounded = totalSeconds >= 60 ? Math.round(totalSeconds) : Math.round(totalSeconds * 100) / 100;
  const hours = Math.floor(rounded / 3600);
  const minutes = Math.floor((rounded - hours * 3600) / 60);
  const seconds = Math.round((rounded - hours * 3600 - minutes * 60) * 100) / 100;
  return { hours, minutes, seconds };
}

// formatDuration(3725) -> "1 h 2 min 5 s"; formatDuration(0.5) -> "0.5 s"
export function formatDuration(totalSeconds) {
  const d = splitDuration(totalSeconds);
  if (!d) return "";
  const parts = [];
  if (d.hours) parts.push(`${d.hours.toLocaleString("en-US")} h`);
  if (d.minutes) parts.push(`${d.minutes} min`);
  if (d.seconds || parts.length === 0) parts.push(`${d.seconds} s`);
  return parts.join(" ");
}
