import { Diagnosis } from "./../types";
import diagnosesData from "../../data/diagnoses";

const diagnoses: Diagnosis[] = diagnosesData;

const getDiagnosesData = (): Diagnosis[] => {
  return diagnoses;
};

const getDiagnosisById = (id: string): Diagnosis | undefined => {
  return diagnoses.find((diagnosis) => {
    return diagnosis.code === id;
  });
};

export default { getDiagnosesData, getDiagnosisById };
