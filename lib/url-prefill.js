// Reads ?v=100&from=cm&to=m from the address bar, for links from the search
// box. Runs in the browser after the page has loaded, so pages stay static
// and their canonical links stay clean.
//
// readPrefill(isValidUnit) -> { value, from, to } (each null when missing or invalid)
export function readPrefill(isValidUnit = () => true) {
  if (typeof window === "undefined") return { value: null, from: null, to: null };
  const params = new URLSearchParams(window.location.search);
  const v = params.get("v");
  const value = v !== null && v.trim() !== "" && Number.isFinite(Number(v.replace(/,/g, ""))) ? v : null;
  const from = params.get("from");
  const to = params.get("to");
  return { value, from: from && isValidUnit(from) ? from : null, to: to && isValidUnit(to) ? to : null };
}
