import diagnosesData from "../../data/diagnoses";

import { Diagnose } from "../types";

const diagnoses: Diagnose[] = diagnosesData;

const getDiagnosesData = (): Diagnose[] => {
  return diagnoses;
};

export default { getDiagnosesData };
