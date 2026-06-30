export default function Header() {
  return (
    <>
      <div className="absolute inset-x-0 top-0 z-0 h-[260px] overflow-hidden bg-teal-900 print:hidden">
        <div
          className="absolute inset-0 opacity-[0.09]"
          style={{
            background:
              "radial-gradient(circle at 15% 10%, white 0, transparent 22%), radial-gradient(circle at 80% 30%, white 0, transparent 24%), linear-gradient(135deg, rgba(255,255,255,0.3), transparent 45%)"
          }}
        />
      </div>
      <header className="relative z-10 bg-white shadow-[0_8px_22px_rgba(15,23,42,0.08)] print:hidden">
        <div className="mx-auto flex w-[min(1180px,calc(100%-32px))] items-center justify-between gap-6 py-4">
          <div className="flex items-center gap-4">
            <div className="grid h-[56px] w-[56px] flex-none place-items-center">
              <img
                src="/logos_4e.png"
                alt="4 Elements Wellness Medical Center"
                className="h-full w-full object-contain"
              />
            </div>
            <div>
              <h1 className="m-0 text-[clamp(18px,2.2vw,26px)] font-black uppercase leading-none tracking-wide text-gray-900">
                Centro Médico <span className="text-teal-600">4 Elements</span>
              </h1>
              <p className="m-0 mt-1.5 text-xs font-bold uppercase tracking-wide text-slate-500">
                Unidad de Nutrición y Composición Corporal | Dra. Macías
              </p>
            </div>
          </div>
          <div className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-teal-100 bg-teal-50 px-3 py-2 text-xs font-extrabold uppercase tracking-wide text-teal-800 max-[620px]:hidden">
            ⚕ Panel Médico
          </div>
        </div>
      </header>
    </>
  );
}
