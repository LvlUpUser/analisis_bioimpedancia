import { useState } from "react";
import Header from "./components/Header";
import PatientPanel from "./components/PatientPanel";
import BioimpedancePanel from "./components/BioimpedancePanel";
import ObservationsPanel from "./components/ObservationsPanel";
import EmptyState from "./components/EmptyState";
import Report from "./components/Report";
import { canGenerateReport } from "./lib/calculations";

const INITIAL_FORM = {
  patientName: "",
  patientId: "",
  age: "",
  height: "",
  waist: "",
  weight: "",
  bmi: "",
  fat: "",
  visceral: "",
  muscle: "",
  rm: ""
};

export default function App() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [gender, setGender] = useState("female");
  const [observations, setObservations] = useState("");
  const [showReport, setShowReport] = useState(false);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleClear = () => {
    setForm(INITIAL_FORM);
    setObservations("");
    setGender("female");
    setShowReport(false);
  };

  const canGenerate = canGenerateReport({ ...form, observations });
  const shouldRenderReport = showReport && canGenerate;

  return (
    <div className="relative min-h-screen bg-slate-100 font-sans text-slate-800">
      <Header />
      <main className="relative z-10 mx-auto grid w-[min(1180px,calc(100%-32px))] grid-cols-[390px_1fr] gap-7 py-8 pb-13 max-[980px]:grid-cols-1">
        <section className="grid gap-4.5 gap-y-[18px] print:hidden">
          <PatientPanel form={form} onChange={handleChange} gender={gender} onGenderChange={setGender} />
          <BioimpedancePanel
            form={form}
            onChange={handleChange}
            canGenerate={canGenerate}
            onClear={handleClear}
            onProcess={() => setShowReport(true)}
          />
          <ObservationsPanel value={observations} onChange={setObservations} />
        </section>
        <section>
          {shouldRenderReport ? (
            <Report
              form={form}
              gender={gender}
              observations={observations}
              onObservationsChange={setObservations}
            />
          ) : (
            <EmptyState />
          )}
        </section>
      </main>
    </div>
  );
}
