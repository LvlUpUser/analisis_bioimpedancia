export default function PatientPanel({ form, onChange, gender, onGenderChange }) {
  return (
    <div className="overflow-hidden rounded-[18px] border border-slate-200/90 bg-white shadow-panel">
      <div className="flex items-center gap-2.5 border-b border-slate-200 bg-slate-50 px-[18px] py-3 text-xs font-black uppercase tracking-widest text-slate-500">
        👤 Filiación paciente
      </div>
      <div className="grid gap-4 p-[18px]">
        <div className="grid grid-cols-2 gap-3.5">
          <div>
            <label className="mb-1.5 block text-xs font-bold text-slate-600">Nombre opcional</label>
            <input
              type="text"
              maxLength={60}
              placeholder="Nombre y apellidos"
              value={form.patientName}
              onChange={(e) => onChange("patientName", e.target.value)}
              className="w-full rounded-[10px] border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-800 outline-none transition focus:border-teal-600 focus:bg-white focus:shadow-[0_0_0_3px_rgba(13,148,136,0.14)]"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-bold text-slate-600">ID opcional</label>
            <input
              type="text"
              maxLength={30}
              placeholder="Historia / Código"
              value={form.patientId}
              onChange={(e) => onChange("patientId", e.target.value)}
              className="w-full rounded-[10px] border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-800 outline-none transition focus:border-teal-600 focus:bg-white focus:shadow-[0_0_0_3px_rgba(13,148,136,0.14)]"
            />
          </div>
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-bold text-slate-600">Sexo biológico</label>
          <div className="grid grid-cols-2 gap-1 rounded-xl bg-slate-100 p-1">
            <button
              type="button"
              onClick={() => onGenderChange("female")}
              className={`rounded-[9px] border-0 py-2.5 text-xs font-black ${
                gender === "female"
                  ? "bg-white text-teal-700 shadow-[0_1px_4px_rgba(15,23,42,0.09)]"
                  : "bg-transparent text-slate-400"
              }`}
            >
              MUJER
            </button>
            <button
              type="button"
              onClick={() => onGenderChange("male")}
              className={`rounded-[9px] border-0 py-2.5 text-xs font-black ${
                gender === "male"
                  ? "bg-white text-teal-700 shadow-[0_1px_4px_rgba(15,23,42,0.09)]"
                  : "bg-transparent text-slate-400"
              }`}
            >
              HOMBRE
            </button>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3.5">
          <div>
            <label className="mb-1.5 block text-xs font-bold text-slate-600">Edad</label>
            <div className="relative">
              <input
                type="number"
                min={18}
                max={110}
                step={1}
                placeholder="0"
                value={form.age}
                onChange={(e) => onChange("age", e.target.value)}
                className="w-full rounded-[10px] border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-800 outline-none transition focus:border-teal-600 focus:bg-white focus:shadow-[0_0_0_3px_rgba(13,148,136,0.14)]"
              />
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400">
                años
              </span>
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-bold text-slate-600">Altura</label>
            <div className="relative">
              <input
                type="text"
                inputMode="decimal"
                placeholder="0"
                value={form.height}
                onChange={(e) => onChange("height", e.target.value)}
                className="w-full rounded-[10px] border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-800 outline-none transition focus:border-teal-600 focus:bg-white focus:shadow-[0_0_0_3px_rgba(13,148,136,0.14)]"
              />
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400">
                cm
              </span>
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-bold text-slate-600">Cintura</label>
            <div className="relative">
              <input
                type="text"
                inputMode="decimal"
                placeholder="0"
                value={form.waist}
                onChange={(e) => onChange("waist", e.target.value)}
                className="w-full rounded-[10px] border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-800 outline-none transition focus:border-teal-600 focus:bg-white focus:shadow-[0_0_0_3px_rgba(13,148,136,0.14)]"
              />
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400">
                cm
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
