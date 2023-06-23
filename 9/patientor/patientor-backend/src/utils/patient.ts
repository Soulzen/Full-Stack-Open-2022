import { Gender, NewPatient } from "../types";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isGender = (gender: string): gender is Gender => {
  return Object.values(Gender)
    .map((v) => {
      return v.toString();
    })
    .includes(gender);
};

const parseName = (name: unknown): string => {
  if (!isString(name)) throw new Error("Incorrect name");
  return name;
};

const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) throw new Error("Incorrect date");
  return date;
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender))
    throw new Error("Incorrect gender");
  return gender;
};

const parseOccupation = (occupation: unknown): string => {
  if (!isString(occupation)) throw new Error("Incorrect occupation");
  return occupation;
};

const parseSnn = (snn: unknown): string => {
  if (!isString(snn)) throw new Error("Incorrect snn");
  return snn;
};

export const toNewPatient = (rawPatient: unknown): NewPatient => {
  if (!rawPatient || typeof rawPatient !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if (
    "name" in rawPatient &&
    "dateOfBirth" in rawPatient &&
    "gender" in rawPatient &&
    "occupation" in rawPatient &&
    "ssn" in rawPatient
  ) {
    const newPatient: NewPatient = {
      name: parseName(rawPatient.name),
      dateOfBirth: parseDate(rawPatient.dateOfBirth),
      gender: parseGender(rawPatient.gender),
      occupation: parseOccupation(rawPatient.occupation),
      ssn: parseSnn(rawPatient.ssn),
      entries: [],
    };
    return newPatient;
  }
  throw new Error("Incorrect data: some fields are missing");
};
