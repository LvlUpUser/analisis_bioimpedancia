import ResultCard from "./ResultCard";
import {
  toNumber,
  getAge,
  getReportBmi,
  calculateFFM,
  calculateFFMI,
  calculateWaistToHeightRatio,
  calculateTMR,
  estimateMetabolicAge,
  interpretBMI,
  interpretBodyFat,
  interpretVisceralFat,
  interpretMuscle,
  interpretICE,
  interpretFFMI,
  interpretMetAge,
  interpretTMR,
  formatMetricValue,
  formatDateES
} from "../lib/calculations";

export default function Report({ form, gender, observations, onObservationsChange }) {
  const age = getAge(form.age);
  const weight = toNumber(form.weight);
  const height = toNumber(form.height);
  const waist = toNumber(form.waist);
  const fat = toNumber(form.fat);
  const rm = toNumber(form.rm);
  const muscle = toNumber(form.muscle);
  const visceral = toNumber(form.visceral);
  const reportBmi = getReportBmi(form);
  const ice = calculateWaistToHeightRatio(waist, height);
  const ffm = calculateFFM(weight, fat);
  const ffmi = calculateFFMI(weight, fat, height);
  const metAge =
    weight !== null && height !== null && rm !== null
      ? estimateMetabolicAge(gender, weight, height, rm)
      : null;
  const tmr = calculateTMR(rm, ffm);

  const bmiResult = interpretBMI(reportBmi);
  const fatResult = interpretBodyFat(gender, age, fat);
  const visceralResult = interpretVisceralFat(visceral);
  const muscleResult = interpretMuscle(gender, age, muscle);
  const iceResult = interpretICE(ice);
  const ffmiResult = interpretFFMI(gender, ffmi);
  const metAgeResult = interpretMetAge(age, metAge);
  const tmrResult = interpretTMR(tmr);

  const patient = form.patientName || (gender === "male" ? "Hombre" : "Mujer");
  const anthropometry = [
    weight !== null ? `${formatMetricValue(weight, 1)} kg` : "",
    height !== null ? `${formatMetricValue(height, 0)} cm` : "",
    waist !== null ? `Cintura: ${formatMetricValue(waist, 1)} cm` : ""
  ]
    .filter(Boolean)
    .join(" / ");

  return (
    <div className="animate-fadeIn">
      <div className="rounded-[18px] border border-slate-200/90 bg-white p-8 shadow-panel print:rounded-none print:border-0 print:p-0 print:shadow-none">
        {/* Print-only header */}
        <div className="mb-5 hidden items-center justify-between gap-5 border-b-2 border-teal-700 pb-3.5 print:flex">
          <div className="flex items-center gap-3.5">
            <img src="/logos_4e.png" alt="4 Elements" className="h-[52px] w-[52px] object-contain" />
            <div>
              <h1 className="m-0 text-[22px] font-black uppercase text-gray-900">Centro Médico 4 Elements</h1>
              <p className="m-0 mt-1 text-xs text-slate-600">
                Unidad de Nutrición y Composición Corporal | Dra. Macías
              </p>
            </div>
          </div>
          <div className="text-right">
            <h1 className="m-0 text-lg text-teal-800">Informe de Composición Corporal</h1>
            <p className="m-0 mt-1 text-xs text-slate-600">{formatDateES()}</p>
          </div>
        </div>

        {/* Screen header */}
        <div className="mb-6 flex items-end justify-between gap-5 border-b border-slate-200 pb-6 max-[980px]:flex-col max-[980px]:items-start max-[980px]:text-left print:hidden">
          <div>
            <h2 className="m-0 font-serif text-[28px] tracking-tight text-gray-900">
              Informe de Composición Corporal
            </h2>
            <div className="mt-2 flex items-center gap-2.5 text-sm text-slate-500">
              <span className="inline-block rounded-md bg-teal-100 px-2 py-1 text-[10px] font-black uppercase tracking-wide text-teal-800">
                Análisis Clínico
              </span>
              <span>|</span>
              <span>{formatDateES(new Date(), true)}</span>
            </div>
          </div>
          <div className="flex gap-4.5 gap-x-[18px] text-right text-sm max-[980px]:text-left">
            <div>
              <p className="m-0 mb-1 text-[10px] font-black uppercase tracking-wide text-slate-400">Paciente</p>
              <p className="m-0 font-bold text-slate-700">
                {patient}
                {Number.isFinite(age) ? `, ${age} años` : ""}
              </p>
              {form.patientId && (
                <p className="m-0 mt-1 text-xs text-slate-500">ID: {form.patientId}</p>
              )}
            </div>
            {anthropometry && (
              <div className="border-l border-slate-200 pl-4.5 pl-[18px]">
                <p className="m-0 mb-1 text-[10px] font-black uppercase tracking-wide text-slate-400">
                  Antropometría
                </p>
                <p className="m-0 font-bold text-slate-700">{anthropometry}</p>
              </div>
            )}
          </div>
        </div>

        <h3 className="m-0 mb-4 border-b-2 border-teal-100 pb-1.5 text-base uppercase tracking-wide text-teal-900">
          Parámetros Estándar de Bioimpedancia
        </h3>
        <div className="mb-8 grid grid-cols-2 gap-5 max-[980px]:grid-cols-1 print:grid-cols-2">
          <ResultCard
            title="Índice de Masa Corporal"
            numericValue={reportBmi}
            displayValue={reportBmi !== null ? formatMetricValue(reportBmi, 1) : null}
            unit="kg/m²"
            objectiveUnit="kg/m²"
            result={bmiResult}
            type="standard"
            icon="⚖"
            explanation="Relación estándar entre peso y altura. Debe contrastarse con el porcentaje real de grasa."
          />
          <ResultCard
            title="Porcentaje de Grasa"
            numericValue={fat}
            displayValue={fat !== null ? formatMetricValue(fat, 1) : null}
            unit="%"
            objectiveUnit="%"
            result={fatResult}
            type="fat"
            icon="💧"
            iconClass="fat"
            explanation="Proporción de tejido adiposo estimada por bioimpedancia. Debe interpretarse junto al contexto clínico."
          />
          <ResultCard
            title="Grasa Visceral"
            numericValue={visceral}
            displayValue={visceral !== null ? formatMetricValue(visceral, 0) : null}
            unit="Nivel"
            objectiveUnit="nivel"
            result={visceralResult}
            type="visceral"
            icon="◈"
            iconClass="visceral"
            explanation="Grasa profunda que rodea los órganos. Niveles superiores a 9 sugieren mayor riesgo cardiometabólico según la escala de bioimpedancia."
          />
          <ResultCard
            title="Músculo Esquelético"
            numericValue={muscle}
            displayValue={muscle !== null ? formatMetricValue(muscle, 1) : null}
            unit="%"
            objectiveUnit="%"
            result={muscleResult}
            type="muscle"
            icon="↯"
            iconClass="muscle"
            explanation="Tejido activo responsable del movimiento. Mantener una buena masa muscular ayuda a preservar funcionalidad, fuerza y salud metabólica."
          />
        </div>

        <h3 className="m-0 mb-4 border-b-2 border-teal-100 pb-1.5 text-base uppercase tracking-wide text-teal-900">
          Indicadores Derivados de Composición Corporal
        </h3>
        <div className="mb-8 grid grid-cols-2 gap-5 max-[980px]:grid-cols-1 print:grid-cols-2">
          <ResultCard
            title="Edad Metabólica Estimada"
            numericValue={metAge}
            displayValue={metAge !== null ? formatMetricValue(metAge, 0) : null}
            unit="años"
            objectiveUnit="años"
            result={metAgeResult}
            type="metAge"
            icon="⏳"
            iconClass="longevity"
            explanation="Compara el metabolismo basal registrado con una estimación teórica por edad, peso, altura y sexo. No equivale a edad biológica real."
          />
          <ResultCard
            title="Índice de Masa Libre de Grasa (FFMI)"
            numericValue={ffmi}
            displayValue={ffmi !== null ? formatMetricValue(ffmi, 1) : null}
            unit="kg/m²"
            objectiveUnit="kg/m²"
            result={ffmiResult}
            type="ffmi"
            icon="💪"
            iconClass="longevity"
            explanation="Estima la masa libre de grasa normalizada por la altura. Incluye músculo, hueso, agua y órganos, por lo que no equivale solo a músculo."
          />
          <ResultCard
            title="Índice Cintura-Estatura"
            numericValue={ice}
            displayValue={ice !== null ? formatMetricValue(ice, 2) : null}
            unit="ratio"
            objectiveUnit="ratio"
            result={iceResult}
            type="standard"
            icon="🛡️"
            iconClass="longevity"
            explanation="Métrica clave de riesgo cardiometabólico. Mantenerlo por debajo de 0,5 se asocia a menor riesgo cardiometabólico."
          />
          <ResultCard
            title="Eficiencia Metabólica Estimada (TMR)"
            numericValue={tmr}
            displayValue={tmr !== null ? formatMetricValue(tmr, 1) : null}
            unit="kcal/kg FFM"
            objectiveUnit="kcal/kg FFM"
            result={tmrResult}
            type="tmr"
            icon="⚡"
            iconClass="longevity"
            explanation="Relaciona el metabolismo basal con la masa libre de grasa estimada. Es útil para seguimiento interno, pero no mide directamente la calidad muscular ni sustituye una valoración clínica."
          />
        </div>

        <div className="-mt-2 mb-6 rounded-2xl border border-teal-100 bg-teal-50 p-4 px-4 py-3.5 text-xs leading-relaxed text-teal-900">
          <strong className="mb-1 block text-[11px] uppercase tracking-wide">Nota metodológica</strong>
          Los indicadores derivados se calculan a partir de peso, altura, cintura, grasa corporal y metabolismo
          basal. El porcentaje de grasa, músculo esquelético y grasa visceral proceden del equipo de
          bioimpedancia. Son útiles para seguimiento evolutivo, pero no deben presentarse como diagnóstico ni
          como sustitutos de analítica, pruebas funcionales o valoración médica.
        </div>

        <div className="mt-6 flex items-center justify-between gap-6 rounded-2xl border border-slate-200 bg-slate-50 p-5.5 p-[22px] [break-inside:avoid] max-[620px]:flex-col max-[620px]:items-stretch">
          <div>
            <h3 className="m-0 mb-2 text-sm uppercase tracking-wide text-slate-800">Metabolismo Basal BMR</h3>
            <p className="m-0 max-w-[560px] text-xs leading-relaxed text-slate-600">
              Es la energía mínima que el organismo consume diariamente en reposo para mantener funciones
              vitales. Es un dato útil para estructurar el plan nutricional sin favorecer una pérdida
              innecesaria de masa libre de grasa.
            </p>
          </div>
          <div className="min-w-[160px] rounded-2xl border border-slate-200 bg-white px-5.5 px-[22px] py-4 text-center">
            <strong className="block text-[34px] leading-none">
              {rm !== null ? formatMetricValue(rm, 0) : "--"}
            </strong>
            <span className="mt-1.5 block text-[10px] font-black uppercase tracking-widest text-slate-400">
              Kcal / día
            </span>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5.5 p-[22px] [break-inside:avoid]">
          <h3 className="m-0 mb-2 text-sm uppercase tracking-wide text-slate-800">Observaciones clínicas</h3>
          <textarea
            maxLength={1200}
            placeholder="Escribe aquí antes de exportar a PDF…"
            value={observations}
            onChange={(e) => onObservationsChange(e.target.value)}
            className="min-h-[86px] w-full resize-y rounded-[10px] border border-slate-200 bg-white px-3 py-2.5 text-sm leading-relaxed text-slate-800 outline-none transition focus:border-teal-600 focus:shadow-[0_0_0_3px_rgba(13,148,136,0.14)] print:hidden"
          />
          <div className="hidden whitespace-pre-wrap text-sm leading-relaxed text-slate-700 print:block">
            {observations || "Sin observaciones registradas."}
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between gap-5 border-t border-slate-200 pt-5 text-[10px] text-slate-500 print:items-end">
          <div>
            <strong className="mb-1 block text-xs uppercase text-slate-800">Centro Médico 4 Elements</strong>
            Informe de Composición Corporal. Resultados orientativos y sujetos a interpretación clínica por la
            Dra. Macías.
          </div>
          <div className="hidden text-center text-slate-400 print:block">
            <div className="h-14 w-[170px] border-b border-slate-300" />
            <div className="mt-1">Firma / Sello Dra. Macías</div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-end print:hidden">
        <button
          type="button"
          onClick={() => window.print()}
          className="rounded-full bg-teal-700 px-5.5 px-[22px] py-3.5 py-[13px] text-sm font-bold text-white shadow-[0_14px_26px_rgba(15,118,110,0.24)]"
        >
          ⬇ Exportar a PDF
        </button>
      </div>
    </div>
  );
}
