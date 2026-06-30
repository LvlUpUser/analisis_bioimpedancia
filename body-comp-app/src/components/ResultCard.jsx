import Badge from "./Badge";
import RangeBar from "./RangeBar";
import { formatMetricValue } from "../lib/calculations";

const ICON_BG = {
  default: "bg-sky-100 text-sky-600",
  fat: "bg-amber-100 text-amber-600",
  visceral: "bg-violet-100 text-violet-600",
  muscle: "bg-rose-100 text-rose-600",
  longevity: "bg-teal-100 text-teal-700"
};

export default function ResultCard({
  title,
  numericValue,
  displayValue,
  unit,
  result,
  explanation,
  type,
  icon,
  iconClass,
  objectiveUnit
}) {
  const shownValue =
    displayValue ?? (numericValue !== null && numericValue !== undefined ? String(numericValue) : "--");
  const range =
    result && result.normalRange
      ? `${formatMetricValue(result.normalRange[0], 2)} - ${formatMetricValue(result.normalRange[1], 2)} ${
          objectiveUnit || unit
        }`
      : "";

  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white [break-inside:avoid] print:break-inside-avoid">
      <div className="flex items-center justify-between gap-2.5 border-b border-slate-200 bg-slate-50 px-4 py-3.5">
        <div className="flex items-center gap-2.5 text-[13px] font-extrabold uppercase tracking-wide text-slate-700">
          <span
            className={`grid h-[34px] w-[34px] place-items-center rounded-lg text-[17px] ${
              ICON_BG[iconClass] || ICON_BG.default
            }`}
          >
            {icon}
          </span>
          <span>{title}</span>
        </div>
        <Badge result={result} />
      </div>
      <div className="p-4.5 px-[18px] py-[18px]">
        <div className="mb-1.5 flex items-baseline gap-1.5">
          <span className="text-[40px] font-black leading-none tracking-tight text-slate-800">{shownValue}</span>
          <span className="text-sm font-bold text-slate-500">{unit}</span>
        </div>
        <RangeBar numericValue={numericValue} result={result} type={type} />
        {result && result.normalRange && (
          <div className="flex gap-2.5 rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs leading-snug text-slate-600">
            <span>ℹ</span>
            <div className="w-full">
              <div className="mb-1 flex justify-between gap-2 text-[10px] font-extrabold uppercase tracking-wide text-slate-600">
                <span>Rango objetivo</span>
                <span className="whitespace-nowrap font-mono text-slate-700">{range}</span>
              </div>
              <div>{explanation}</div>
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
