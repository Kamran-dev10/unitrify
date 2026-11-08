// Download Time Calculator: file size (any data-storage unit) at a speed
// (any data-transfer unit) -> time. Server and tests use this file; the
// browser uses lib/download-time-core.js with unit data passed in.
import { getUnitCategory } from "./categories/index.js";
import { downloadSecondsWith } from "./download-time-core.js";

export { downloadSecondsWith, splitDuration, formatDuration } from "./download-time-core.js";

// downloadSeconds(1, "gb", 100, "mbps") -> 80
export function downloadSeconds(size, sizeUnit, speed, speedUnit) {
  return downloadSecondsWith(getUnitCategory("data-storage"), getUnitCategory("data-transfer"), size, sizeUnit, speed, speedUnit);
}
