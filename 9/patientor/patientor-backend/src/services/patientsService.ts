import { v4 as uuid } from "uuid";

import patientsData from "../../data/patients";
import { Patient, NonSensitivePatient, NewPatient } from "../types";

const patients: Patient[] = patientsData;

const getPatientsData = (): Patient[] => {
  return patients;
};

const getNonSensitivePatientsData = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => {
    return {
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
    };
  });
};

const savePatient = (patient: NewPatient): Patient => {
  const id = uuid();
  const newPatient = {
    id,
    ...patient,
  };
  patients.push(newPatient);
  return newPatient;
};

export default { getPatientsData, getNonSensitivePatientsData, savePatient };
