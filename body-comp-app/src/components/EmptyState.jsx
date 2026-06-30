export default function EmptyState() {
  return (
    <div className="grid min-h-[500px] place-items-center rounded-[18px] border border-dashed border-slate-200 bg-white/95 p-10 text-center text-slate-500 shadow-panel">
      <div>
        <div className="mx-auto mb-5 grid h-[76px] w-[76px] place-items-center rounded-full bg-white text-[34px] text-slate-300 shadow-[0_5px_20px_rgba(15,23,42,0.08)]">
          ⚖
        </div>
        <h3 className="mb-2 text-[22px] text-slate-600">Esperando datos clínicos</h3>
        <p className="mx-auto max-w-[360px] leading-snug">
          Introduce los parámetros en el panel lateral para generar el informe.
        </p>
      </div>
    </div>
  );
}
