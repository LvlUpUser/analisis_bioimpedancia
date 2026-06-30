export default function ObservationsPanel({ value, onChange }) {
  return (
    <div className="overflow-hidden rounded-[18px] border border-slate-200/90 bg-white shadow-panel">
      <div className="flex items-center gap-2.5 border-b border-slate-200 bg-slate-50 px-[18px] py-3 text-xs font-black uppercase tracking-widest text-slate-500">
        ℹ Observaciones clínicas
      </div>
      <div className="grid gap-4 p-[18px]">
        <textarea
          maxLength={1200}
          placeholder="Notas clínicas, recomendaciones, plan de seguimiento, etc."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="min-h-[132px] w-full resize-y rounded-[10px] border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-800 outline-none transition focus:border-teal-600 focus:bg-white focus:shadow-[0_0_0_3px_rgba(13,148,136,0.14)]"
        />
        <div className="flex justify-between text-[11px] text-slate-400">
          <span>Se imprimirá en el informe.</span>
          <span>{value.length}/1200</span>
        </div>
      </div>
    </div>
  );
}
