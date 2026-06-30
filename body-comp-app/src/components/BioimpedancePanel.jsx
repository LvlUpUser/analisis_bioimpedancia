const fieldBase =
  "w-full rounded-[10px] border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-800 outline-none transition focus:border-teal-600 focus:bg-white focus:shadow-[0_0_0_3px_rgba(13,148,136,0.14)]";
const smallLabel = "block text-[10px] font-black uppercase tracking-wide";

export default function BioimpedancePanel({ form, onChange, canGenerate, onClear, onProcess }) {
  return (
    <div className="overflow-hidden rounded-[18px] border border-slate-200/90 bg-white shadow-panel">
      <div className="flex items-center gap-2.5 border-b border-teal-100 bg-teal-50 px-[18px] py-3 text-xs font-black uppercase tracking-widest text-teal-800">
        📈 Análisis de bioimpedancia
      </div>
      <div className="grid gap-4 p-[18px]">
        <div className="grid grid-cols-2 gap-3.5">
          <div>
            <label className={`${smallLabel} text-slate-400`}>Peso</label>
            <input
              type="text"
              inputMode="decimal"
              placeholder="kg"
              value={form.weight}
              onChange={(e) => onChange("weight", e.target.value)}
              className={fieldBase}
            />
          </div>
          <div>
            <label className={`${smallLabel} text-slate-400`}>IMC</label>
            <input
              type="text"
              inputMode="decimal"
              placeholder="Auto si hay peso/altura"
              value={form.bmi}
              onChange={(e) => onChange("bmi", e.target.value)}
              className={fieldBase}
            />
          </div>
          <div>
            <label className={`${smallLabel} text-amber-600`}>% grasa</label>
            <input
              type="text"
              inputMode="decimal"
              value={form.fat}
              onChange={(e) => onChange("fat", e.target.value)}
              className={fieldBase}
            />
          </div>
          <div>
            <label className={`${smallLabel} text-violet-600`}>Visceral</label>
            <input
              type="number"
              min={1}
              max={30}
              step={1}
              inputMode="numeric"
              value={form.visceral}
              onChange={(e) => onChange("visceral", e.target.value)}
              className={fieldBase}
            />
          </div>
          <div>
            <label className={`${smallLabel} text-rose-600`}>% músculo</label>
            <input
              type="text"
              inputMode="decimal"
              value={form.muscle}
              onChange={(e) => onChange("muscle", e.target.value)}
              className={fieldBase}
            />
          </div>
          <div>
            <label className={`${smallLabel} text-slate-400`}>Metabolismo</label>
            <input
              type="number"
              min={500}
              max={4000}
              step={1}
              placeholder="kcal"
              value={form.rm}
              onChange={(e) => onChange("rm", e.target.value)}
              className={fieldBase}
            />
          </div>
        </div>
        <div className="flex gap-3 pt-1">
          <button
            type="button"
            onClick={onClear}
            className="rounded-[11px] border border-slate-200 bg-white px-3.5 py-2.5 text-xs font-black uppercase tracking-wide text-slate-500 transition hover:-translate-y-px"
          >
            Borrar
          </button>
          <button
            type="button"
            onClick={onProcess}
            disabled={!canGenerate}
            className="flex-1 rounded-[11px] border-0 bg-gray-900 px-3.5 py-2.5 text-xs font-black uppercase tracking-wide text-white transition hover:-translate-y-px disabled:cursor-not-allowed disabled:opacity-45 disabled:hover:translate-y-0"
          >
            Procesar datos →
          </button>
        </div>
        {!canGenerate && (
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs leading-snug text-slate-500">
            Para generar el informe: introduce <strong>edad adulta 18+</strong> y al menos{" "}
            <strong>un parámetro válido</strong>.
          </div>
        )}
      </div>
    </div>
  );
}
