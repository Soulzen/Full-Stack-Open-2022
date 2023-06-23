import { v4 as uuid } from "uuid";

import patientsData from "../../data/patients";
import {
  Patient,
  NonSensitivePatient,
  NewPatient,
  EntryWithoutId,
  Entry,
} from "../types";

let patients: Patient[] = patientsData;

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

const getPatientDataById = (id: string): Patient | undefined => {
  return patients.find((patient) => patient.id === id);
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

const saveEntryByPatientId = (
  id: string,
  entry: EntryWithoutId
): Entry | undefined => {
  const patientToUpdate = patients.find((patient) => patient.id === id);
  if (patientToUpdate === undefined) return undefined;
  const newEntry: Entry = { id: uuid(), ...entry };
  patientToUpdate.entries.push(newEntry);
  const newPatients = patients.map((patient) => {
    if (patient.id === id) {
      return patientToUpdate;
    } else {
      return patient;
    }
  });
  patients = newPatients;
  return newEntry;
};

export default {
  getPatientsData,
  getNonSensitivePatientsData,
  savePatient,
  getPatientDataById,
  saveEntryByPatientId,
};
