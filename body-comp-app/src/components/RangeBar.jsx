import { toNumber } from "../lib/calculations";

const COLOR_SETS = {
  default: ["#7dd3fc", "#34d399", "#fbbf24", "#ef4444"],
  muscle: ["#fb7185", "#34d399", "#38bdf8", "#2563eb"],
  ffmi: ["#fb7185", "#34d399", "#38bdf8", "#2563eb"],
  visceral: ["#34d399", "#fbbf24", "#f43f5e", "#581c87"],
  metAge: ["#38bdf8", "#34d399", "#fbbf24", "#ef4444"],
  tmr: ["#ef4444", "#fbbf24", "#34d399", "#38bdf8"]
};

export default function RangeBar({ numericValue, result, type }) {
  const currentVal = toNumber(numericValue);
  if (
    currentVal === null ||
    !result ||
    !result.boundaries ||
    (result.boundaries[0] === 0 && result.boundaries[2] === 0)
  ) {
    return null;
  }

  const boundaries = result.boundaries;
  const minVal = type === "visceral" ? 0 : boundaries[0] * 0.5;
  const maxVal = boundaries[2] * 1.2;
  const totalSpan = maxVal - minVal;
  if (totalSpan <= 0) return null;

  const percentage = Math.max(0, Math.min(100, ((currentVal - minVal) / totalSpan) * 100));
  const width = (start, end) => Math.max(0, ((end - start) / totalSpan) * 100);
  const colors = COLOR_SETS[type] || COLOR_SETS.default;

  const w1 = type === "visceral" ? 0 : width(minVal, boundaries[0]);
  const w2 = type === "visceral" ? width(0, boundaries[1]) : width(boundaries[0], boundaries[1]);
  const w3 = width(boundaries[1], boundaries[2]);
  const w4 = width(boundaries[2], maxVal);

  return (
    <div className="my-4">
      <div className="relative h-8">
        <div className="absolute inset-x-0 top-3 flex h-2 overflow-hidden rounded-full bg-slate-100">
          {w1 > 0 && <div style={{ width: `${w1}%`, background: colors[0] }} />}
          <div style={{ width: `${w2}%`, background: colors[1] }} />
          <div style={{ width: `${w3}%`, background: colors[2] }} />
          <div style={{ width: `${w4}%`, background: colors[3] }} />
        </div>
        <div
          className="absolute top-0 h-8 w-0.5 -translate-x-px bg-slate-900 after:absolute after:left-1/2 after:top-[10px] after:h-[11px] after:w-[11px] after:-translate-x-1/2 after:rounded-full after:border-2 after:border-white after:bg-slate-900 after:shadow-md"
          style={{ left: `${percentage}%` }}
        />
      </div>
      <div className="flex justify-between text-[9px] font-extrabold uppercase tracking-widest text-slate-400">
        <span>Bajo</span>
        <span>Normal</span>
        <span>Alto</span>
      </div>
    </div>
  );
}
