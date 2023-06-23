import express from "express";

import patientsService from "../services/patientsService";
import { toNewPatient } from "../utils/patient";
import { toNewEntry } from "../utils/entry";

const router = express.Router();

router.get("/patients", (_req, res) => {
  const patientsData = patientsService.getNonSensitivePatientsData();
  res.json(patientsData);
});

router.get("/patients/:id", (req, res) => {
  const id = req.params.id;
  const patient = patientsService.getPatientDataById(id);
  res.status(201).json(patient);
});

router.post("/patients", (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);
    const savedPatient = patientsService.savePatient(newPatient);
    res.json(savedPatient);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

router.post("/patients/:id/entries", (req, res) => {
  try {
    const id = req.params.id;
    const entry = toNewEntry(req.body);
    const savedEntry = patientsService.saveEntryByPatientId(id, entry);
    res.status(201).json(savedEntry);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;
