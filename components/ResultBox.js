import CopyButton from "@/components/CopyButton";

// The green result area used by every converter tool.
// Its height is reserved up front, so the page does not jump when the
// result appears, changes length or turns into a message.
//
// Props:
//   label       small heading, e.g. "Result"
//   value       the big result text ("" shows a dash)
//   unit        unit shown after the value, e.g. "sq ft"
//   copyText    text the Copy button copies ("" disables it)
//   message     if set, shown instead of the value (e.g. invalid input)
//   messageId   id for aria-describedby on the input
//   extra       optional node under the value (e.g. UK gallons, plot details)
export default function ResultBox({ label = "Result", value, unit, copyText, message, messageId, extra }) {
  return (
    <div className="mt-6 rounded-control bg-accent-tint p-5">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm text-muted">{label}</p>
        <CopyButton text={message ? "" : copyText} />
      </div>
      {/* Room for two lines on phones, one on larger screens. */}
      <div className="mt-2 min-h-20 sm:min-h-12" aria-live="polite">
        {message ? (
          <p id={messageId} className="text-base text-ink">
            {message}
          </p>
        ) : (
          <p className="break-words text-4xl font-bold tracking-tight text-accent sm:text-5xl sm:leading-none">
            <span className="select-all">{value || "–"}</span>{" "}
            <span className="text-2xl font-semibold text-muted">{unit}</span>
          </p>
        )}
      </div>
      {extra}
    </div>
  );
}
