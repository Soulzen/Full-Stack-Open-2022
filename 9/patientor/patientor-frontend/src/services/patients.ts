import axios from "axios";
import {
  Entry,
  EntryWithoutId,
  Patient,
  PatientFormValues,
  PatientWithRequiredInfo,
} from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(`${apiBaseUrl}/patients`);

  return data;
};

const getPatientById = async (id: string | undefined) => {
  const patient = await axios.get<PatientWithRequiredInfo>(
    `${apiBaseUrl}/patients/${id}`
  );
  return patient;
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(`${apiBaseUrl}/patients`, object);

  return data;
};

const addEntry = async (patientId: string, entry: EntryWithoutId) => {
  const { data } = await axios.post<Entry>(
    `${apiBaseUrl}/patients/${patientId}/entries`,
    entry
  );
  return data;
};

const PatientsService = {
  getAll,
  getPatientById,
  create,
  addEntry,
};

export default PatientsService;
