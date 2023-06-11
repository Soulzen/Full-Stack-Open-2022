import express from "express";

import patientsService from "../services/patientsService";
import { toNewPatient } from "../utils";

const router = express.Router();

router.get("/patients", (_req, res) => {
  const patientsData = patientsService.getNonSensitivePatientsData();
  res.json(patientsData);
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

export default router;
