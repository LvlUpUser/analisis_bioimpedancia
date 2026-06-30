const COLOR_CLASSES = {
  green: "bg-emerald-100 text-emerald-800 border-emerald-200",
  blue: "bg-blue-100 text-blue-800 border-blue-200",
  sky: "bg-sky-100 text-sky-800 border-sky-200",
  orange: "bg-amber-100 text-amber-800 border-amber-200",
  red: "bg-red-100 text-red-800 border-red-200",
  gray: "bg-slate-100 text-slate-600 border-slate-200"
};

export default function Badge({ result }) {
  if (!result) return <span className="text-slate-300">-</span>;
  const classes = COLOR_CLASSES[result.color] || COLOR_CLASSES.gray;
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md border px-2 py-1 text-[10px] font-extrabold uppercase tracking-wide whitespace-nowrap ${classes}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {result.status}
    </span>
  );
}
