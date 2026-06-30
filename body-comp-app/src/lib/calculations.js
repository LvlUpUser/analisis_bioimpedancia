// Funciones puras de cálculo e interpretación clínica.
// Traducidas 1:1 desde la lógica original de la app HTML.

export function toNumber(value) {
  if (value === "" || value === null || value === undefined) return null;
  const normalized = String(value).trim().replace(",", ".");
  const num = Number(normalized);
  return Number.isFinite(num) ? num : null;
}

export function formatMetricValue(value, decimals = 1) {
  const num = toNumber(value);
  if (num === null) return "";
  return Number(num.toFixed(decimals)).toString().replace(".", ",");
}

export function formatDateES(date = new Date(), long = false) {
  const opts = long
    ? { weekday: "long", year: "numeric", month: "long", day: "numeric" }
    : { year: "numeric", month: "long", day: "numeric" };
  return date.toLocaleDateString("es-ES", opts);
}

export function getAge(ageRaw) {
  const age = toNumber(ageRaw);
  return age === null ? NaN : Math.floor(age);
}

export function getReportBmi({ bmi, weight, height }) {
  const manualBmi = toNumber(bmi);
  if (manualBmi !== null) return manualBmi;
  const w = toNumber(weight);
  const h = toNumber(height);
  if (w === null || h === null || h <= 0) return null;
  const heightM = h / 100;
  return w / (heightM * heightM);
}

export function calculateFFM(weight, fatPercent) {
  if (weight === null || fatPercent === null) return null;
  if (weight <= 0 || fatPercent < 0 || fatPercent >= 80) return null;
  return weight * (1 - fatPercent / 100);
}

export function calculateFFMI(weight, fatPercent, heightCm) {
  const ffm = calculateFFM(weight, fatPercent);
  if (ffm === null || heightCm === null || heightCm <= 0) return null;
  const heightM = heightCm / 100;
  return ffm / (heightM * heightM);
}

export function calculateWaistToHeightRatio(waistCm, heightCm) {
  if (waistCm === null || heightCm === null || waistCm <= 0 || heightCm <= 0) return null;
  return waistCm / heightCm;
}

export function calculateTMR(bmr, ffm) {
  if (bmr === null || ffm === null || bmr <= 0 || ffm <= 0) return null;
  return bmr / ffm;
}

export function mifflinBMR(gender, weight, heightCm, age) {
  if (gender === "male") {
    return 10 * weight + 6.25 * heightCm - 5 * age + 5;
  }
  return 10 * weight + 6.25 * heightCm - 5 * age - 161;
}

export function estimateMetabolicAge(gender, weight, heightCm, measuredBMR) {
  if (!gender || weight <= 0 || heightCm <= 0 || measuredBMR <= 0) return null;
  let bestAge = 18;
  let smallestDiff = Infinity;
  for (let testAge = 18; testAge <= 90; testAge++) {
    const expectedBMR = mifflinBMR(gender, weight, heightCm, testAge);
    const diff = Math.abs(expectedBMR - measuredBMR);
    if (diff < smallestDiff) {
      smallestDiff = diff;
      bestAge = testAge;
    }
  }
  return bestAge;
}

export function interpretBodyFat(gender, age, value) {
  const num = toNumber(value);
  if (num === null) return null;
  if (!Number.isFinite(age)) {
    return { status: "N/A", color: "gray", text: "Edad requerida", normalRange: null, boundaries: [0, 0, 0] };
  }
  if (gender === "female") {
    if (age >= 18 && age <= 39) {
      const result = { normalRange: [21.0, 32.9], boundaries: [21.0, 33.0, 39.0] };
      if (num < 21.0) return { ...result, status: "Bajo (-)", color: "sky", text: "Nivel bajo" };
      if (num <= 32.9) return { ...result, status: "Normal (0)", color: "green", text: "Saludable" };
      if (num <= 38.9) return { ...result, status: "Alto (+)", color: "orange", text: "Elevado" };
      return { ...result, status: "Muy alto (++)", color: "red", text: "Muy elevado" };
    }
    if (age >= 40 && age <= 59) {
      const result = { normalRange: [23.0, 33.9], boundaries: [23.0, 34.0, 40.0] };
      if (num < 23.0) return { ...result, status: "Bajo (-)", color: "sky", text: "Nivel bajo" };
      if (num <= 33.9) return { ...result, status: "Normal (0)", color: "green", text: "Saludable" };
      if (num <= 39.9) return { ...result, status: "Alto (+)", color: "orange", text: "Elevado" };
      return { ...result, status: "Muy alto (++)", color: "red", text: "Muy elevado" };
    }
    if (age >= 60) {
      const result = { normalRange: [24.0, 35.9], boundaries: [24.0, 36.0, 42.0] };
      if (num < 24.0) return { ...result, status: "Bajo (-)", color: "sky", text: "Nivel bajo" };
      if (num <= 35.9) return { ...result, status: "Normal (0)", color: "green", text: "Saludable" };
      if (num <= 41.9) return { ...result, status: "Alto (+)", color: "orange", text: "Elevado" };
      return { ...result, status: "Muy alto (++)", color: "red", text: "Muy elevado" };
    }
  }
  if (gender === "male") {
    if (age >= 18 && age <= 39) {
      const result = { normalRange: [8.0, 19.9], boundaries: [8.0, 20.0, 25.0] };
      if (num < 8.0) return { ...result, status: "Bajo (-)", color: "sky", text: "Nivel bajo" };
      if (num <= 19.9) return { ...result, status: "Normal (0)", color: "green", text: "Saludable" };
      if (num <= 24.9) return { ...result, status: "Alto (+)", color: "orange", text: "Elevado" };
      return { ...result, status: "Muy alto (++)", color: "red", text: "Muy elevado" };
    }
    if (age >= 40 && age <= 59) {
      const result = { normalRange: [11.0, 21.9], boundaries: [11.0, 22.0, 28.0] };
      if (num < 11.0) return { ...result, status: "Bajo (-)", color: "sky", text: "Nivel bajo" };
      if (num <= 21.9) return { ...result, status: "Normal (0)", color: "green", text: "Saludable" };
      if (num <= 27.9) return { ...result, status: "Alto (+)", color: "orange", text: "Elevado" };
      return { ...result, status: "Muy alto (++)", color: "red", text: "Muy elevado" };
    }
    if (age >= 60) {
      const result = { normalRange: [13.0, 24.9], boundaries: [13.0, 25.0, 30.0] };
      if (num < 13.0) return { ...result, status: "Bajo (-)", color: "sky", text: "Nivel bajo" };
      if (num <= 24.9) return { ...result, status: "Normal (0)", color: "green", text: "Saludable" };
      if (num <= 29.9) return { ...result, status: "Alto (+)", color: "orange", text: "Elevado" };
      return { ...result, status: "Muy alto (++)", color: "red", text: "Muy elevado" };
    }
  }
  return { status: "Fuera de rango", color: "gray", text: "Consulte manual", normalRange: null, boundaries: [0, 0, 0] };
}

export function interpretVisceralFat(value) {
  const num = toNumber(value);
  if (num === null) return null;
  const result = { normalRange: [1, 9], boundaries: [0, 9.5, 14.5] };
  if (num <= 9) return { ...result, status: "Normal (0)", color: "green", text: "Saludable" };
  if (num <= 14) return { ...result, status: "Alto (+)", color: "orange", text: "Elevado" };
  return { ...result, status: "Muy alto (++)", color: "red", text: "Excesivo" };
}

export function interpretBMI(value) {
  const num = toNumber(value);
  if (num === null) return null;
  const result = { normalRange: [18.5, 24.9], boundaries: [18.5, 25.0, 30.0] };
  if (num < 18.5) return { ...result, status: "Bajo peso (-)", color: "blue", text: "Peso bajo" };
  if (num < 25) return { ...result, status: "Normal (0)", color: "green", text: "Saludable" };
  if (num < 30) return { ...result, status: "Sobrepeso (+)", color: "orange", text: "Sobrepeso" };
  return { ...result, status: "Obesidad (++)", color: "red", text: "Obesidad" };
}

export function interpretMuscle(gender, age, value) {
  const num = toNumber(value);
  if (num === null) return null;
  if (!Number.isFinite(age)) {
    return { status: "N/A", color: "gray", text: "Edad requerida", normalRange: null, boundaries: [0, 0, 0] };
  }
  if (gender === "female") {
    if (age >= 18 && age <= 39) {
      const result = { normalRange: [24.3, 30.3], boundaries: [24.3, 30.4, 35.4] };
      if (num < 24.3) return { ...result, status: "Bajo (-)", color: "red", text: "Bajo" };
      if (num <= 30.3) return { ...result, status: "Normal (0)", color: "green", text: "Adecuado" };
      if (num <= 35.3) return { ...result, status: "Alto (+)", color: "blue", text: "Bueno" };
      return { ...result, status: "Muy alto (++)", color: "blue", text: "Excelente" };
    }
    if (age >= 40 && age <= 59) {
      const result = { normalRange: [24.1, 30.1], boundaries: [24.1, 30.2, 35.2] };
      if (num < 24.1) return { ...result, status: "Bajo (-)", color: "red", text: "Bajo" };
      if (num <= 30.1) return { ...result, status: "Normal (0)", color: "green", text: "Adecuado" };
      if (num <= 35.1) return { ...result, status: "Alto (+)", color: "blue", text: "Bueno" };
      return { ...result, status: "Muy alto (++)", color: "blue", text: "Excelente" };
    }
    if (age >= 60) {
      const result = { normalRange: [23.9, 29.9], boundaries: [23.9, 30.0, 35.0] };
      if (num < 23.9) return { ...result, status: "Bajo (-)", color: "red", text: "Bajo" };
      if (num <= 29.9) return { ...result, status: "Normal (0)", color: "green", text: "Adecuado" };
      if (num <= 34.9) return { ...result, status: "Alto (+)", color: "blue", text: "Bueno" };
      return { ...result, status: "Muy alto (++)", color: "blue", text: "Excelente" };
    }
  }
  if (gender === "male") {
    if (age >= 18 && age <= 39) {
      const result = { normalRange: [33.3, 39.3], boundaries: [33.3, 39.4, 44.1] };
      if (num < 33.3) return { ...result, status: "Bajo (-)", color: "red", text: "Bajo" };
      if (num <= 39.3) return { ...result, status: "Normal (0)", color: "green", text: "Adecuado" };
      if (num <= 44.0) return { ...result, status: "Alto (+)", color: "blue", text: "Bueno" };
      return { ...result, status: "Muy alto (++)", color: "blue", text: "Excelente" };
    }
    if (age >= 40 && age <= 59) {
      const result = { normalRange: [33.1, 39.1], boundaries: [33.1, 39.2, 43.9] };
      if (num < 33.1) return { ...result, status: "Bajo (-)", color: "red", text: "Bajo" };
      if (num <= 39.1) return { ...result, status: "Normal (0)", color: "green", text: "Adecuado" };
      if (num <= 43.8) return { ...result, status: "Alto (+)", color: "blue", text: "Bueno" };
      return { ...result, status: "Muy alto (++)", color: "blue", text: "Excelente" };
    }
    if (age >= 60) {
      const result = { normalRange: [32.9, 38.9], boundaries: [32.9, 39.0, 43.7] };
      if (num < 32.9) return { ...result, status: "Bajo (-)", color: "red", text: "Bajo" };
      if (num <= 38.9) return { ...result, status: "Normal (0)", color: "green", text: "Adecuado" };
      if (num <= 43.6) return { ...result, status: "Alto (+)", color: "blue", text: "Bueno" };
      return { ...result, status: "Muy alto (++)", color: "blue", text: "Excelente" };
    }
  }
  return { status: "Fuera de rango", color: "gray", text: "Consulte manual", normalRange: null, boundaries: [0, 0, 0] };
}

export function interpretICE(value) {
  const num = toNumber(value);
  if (num === null) return null;
  const result = { normalRange: [0.4, 0.49], boundaries: [0.35, 0.5, 0.6] };
  if (num < 0.4) return { ...result, status: "Bajo (-)", color: "blue", text: "Bajo" };
  if (num < 0.5) return { ...result, status: "Óptimo (0)", color: "green", text: "Saludable" };
  if (num < 0.6) return { ...result, status: "Riesgo (+)", color: "orange", text: "Riesgo moderado" };
  return { ...result, status: "Alto riesgo (++)", color: "red", text: "Riesgo elevado" };
}

export function interpretFFMI(gender, value) {
  const num = toNumber(value);
  if (num === null) return null;
  if (gender === "female") {
    const result = { normalRange: [15.0, 19.0], boundaries: [14.0, 19.0, 22.0] };
    if (num < 15.0) return { ...result, status: "Déficit (-)", color: "red", text: "Déficit de masa libre de grasa" };
    if (num <= 19.0) return { ...result, status: "Normal (0)", color: "green", text: "Adecuado" };
    return { ...result, status: "Alto (+)", color: "blue", text: "Reserva elevada" };
  }
  const result = { normalRange: [18.0, 22.0], boundaries: [17.0, 22.0, 25.0] };
  if (num < 18.0) return { ...result, status: "Déficit (-)", color: "red", text: "Déficit de masa libre de grasa" };
  if (num <= 22.0) return { ...result, status: "Normal (0)", color: "green", text: "Adecuado" };
  return { ...result, status: "Alto (+)", color: "blue", text: "Reserva elevada" };
}

export function interpretMetAge(chronoAge, metAge) {
  if (metAge === null || !Number.isFinite(chronoAge)) return null;
  const diff = metAge - chronoAge;
  const result = {
    normalRange: [Math.max(18, chronoAge - 15), chronoAge],
    boundaries: [Math.max(18, chronoAge - 10), chronoAge + 1, chronoAge + 10]
  };
  if (diff <= -5) return { ...result, status: "Óptimo (-)", color: "blue", text: "Estimación favorable" };
  if (diff <= 0) return { ...result, status: "Bueno (0)", color: "green", text: "Dentro de objetivo" };
  if (diff <= 5) return { ...result, status: "Alerta (+)", color: "orange", text: "Estimación elevada" };
  return { ...result, status: "Elevado (++)", color: "red", text: "Estimación muy elevada" };
}

export function interpretTMR(value) {
  const num = toNumber(value);
  if (num === null) return null;
  const result = { normalRange: [28.0, 32.0], boundaries: [25.0, 28.0, 32.0] };
  if (num < 25) return { ...result, status: "Alerta (-)", color: "red", text: "Metabolismo bajo respecto a la masa libre de grasa" };
  if (num < 28) return { ...result, status: "Bajo (-)", color: "orange", text: "Eficiencia reducida" };
  if (num <= 32) return { ...result, status: "Óptimo (0)", color: "green", text: "Eficiencia óptima" };
  return { ...result, status: "Alto (+)", color: "blue", text: "Gasto elevado" };
}

export function canGenerateReport(data) {
  const age = getAge(data.age);
  const reportBmi = getReportBmi(data);
  const hasAge = Number.isFinite(age) && age >= 18 && age <= 110;
  const hasMetric = [reportBmi, data.fat, data.visceral, data.muscle, data.rm].some(
    (value) => toNumber(value) !== null
  );
  return hasAge && hasMetric;
}
