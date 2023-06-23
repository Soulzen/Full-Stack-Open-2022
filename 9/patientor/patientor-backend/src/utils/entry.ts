import { BaseEntryWithoutId, EntryWithoutId, HealthCheckRating } from "../types";

const isString = (text: unknown): text is string => {
  return (typeof text === "string" || text instanceof String) && text !== "";
};

const isNumber = (number: unknown): number is number => {
  return typeof number === "number";
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isType = (type: string): type is "HealthCheck" | "OccupationalHealthcare" | "Hospital" => {
  return type === "HealthCheck" || type === "OccupationalHealthcare" || type === "Hospital";
};

const isStringArray = (array: unknown): array is Array<string> => {
  return array instanceof Array && (typeof array[0] === "string" || array[0] instanceof String);
};

const isHealthCheckRating = (rating: number): rating is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(rating);
};

const parseDescription = (description: unknown): string => {
  if (!isString(description)) throw new Error("Incorrect description");
  return description;
};

const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) throw new Error("Incorrect date");
  return date;
};

const parseSpecialist = (specialist: unknown): string => {
  if (!isString(specialist)) throw new Error("Incorrect specialist");
  return specialist;
};

const parseType = (type: unknown): string => {
  if (!isString(type) || !isType(type)) throw new Error("Incorrect type");
  return type;
};

const parseDiagnosisCodes = (codes: unknown): Array<string> => {
  if (!isStringArray(codes)) throw new Error("Incorrect codes");
  return codes;
};

const parseHealthCheckRating = (healthCheckRating: unknown): HealthCheckRating => {
  if (!isNumber(healthCheckRating) || !isHealthCheckRating(healthCheckRating))
    throw new Error("Incorrect health check rating");
  return healthCheckRating;
};

const parseEmployerName = (name: unknown): string => {
  if (!isString(name)) throw new Error("Incorrect employer name");
  return name;
};

const parseSickLeave = (sickLeave: unknown): { startDate: string; endDate: string } => {
  if (
    !sickLeave ||
    typeof sickLeave !== "object" ||
    !("startDate" in sickLeave) ||
    !isString(sickLeave.startDate) ||
    !("endDate" in sickLeave) ||
    !isString(sickLeave.endDate)
  )
    throw new Error("Incorrect sick leave");
  return { startDate: sickLeave.startDate, endDate: sickLeave.endDate };
};

const parseDischarge = (discharge: unknown): { date: string; criteria: string } => {
  if (
    !discharge ||
    typeof discharge !== "object" ||
    !("date" in discharge) ||
    !isString(discharge.date) ||
    !("criteria" in discharge) ||
    !isString(discharge.criteria)
  )
    throw new Error("Incorrect discharge");
  return { date: discharge.date, criteria: discharge.criteria };
};

export const toNewEntry = (rawEntry: unknown): EntryWithoutId => {
  if (!rawEntry || typeof rawEntry !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if ("description" in rawEntry && "date" in rawEntry && "specialist" in rawEntry && "type" in rawEntry) {
    const newBaseEntry: BaseEntryWithoutId = {
      description: parseDescription(rawEntry.description),
      date: parseDate(rawEntry.date),
      specialist: parseSpecialist(rawEntry.specialist),
    };
    if ("diagnosisCodes" in rawEntry) {
      newBaseEntry.diagnosisCodes = parseDiagnosisCodes(rawEntry.diagnosisCodes);
    }
    const entryType = parseType(rawEntry.type);
    switch (entryType) {
      case "HealthCheck":
        if ("healthCheckRating" in rawEntry) {
          const HealthCheckNewEntry: EntryWithoutId = {
            ...newBaseEntry,
            type: "HealthCheck",
            healthCheckRating: parseHealthCheckRating(rawEntry.healthCheckRating),
          };
          return HealthCheckNewEntry;
        } else {
          throw new Error("HealthCheckRating needed on HealthCheck entry type");
        }

      case "OccupationalHealthcare":
        if ("employerName" in rawEntry) {
          const OccupationalHealthcareNewEntry: EntryWithoutId = {
            ...newBaseEntry,
            type: "OccupationalHealthcare",
            employerName: parseEmployerName(rawEntry.employerName),
          };
          if ("sickLeave" in rawEntry) {
            OccupationalHealthcareNewEntry.sickLeave = parseSickLeave(rawEntry.sickLeave);
          }
          return OccupationalHealthcareNewEntry;
        } else {
          throw new Error("Sick leave needed on OccupationalHealthcare entry type");
        }

      case "Hospital":
        if ("discharge" in rawEntry) {
          const HospitalNewEntry: EntryWithoutId = {
            ...newBaseEntry,
            type: "Hospital",
            discharge: parseDischarge(rawEntry.discharge),
          };
          return HospitalNewEntry;
        } else {
          throw new Error("Discharge needed on Hospital entry type");
        }

      default:
        throw new Error("Error handleling entry type");
    }
  } else {
    throw new Error("Incorrect data: some fields are missing");
  }
};
