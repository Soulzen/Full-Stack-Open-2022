import express from "express";

import diagnosesService from "../services/diagnosesServices";

const router = express.Router();

router.get("/diagnoses", (_req, res) => {
  const diagnoses = diagnosesService.getDiagnosesData();
  res.json(diagnoses);
});

router.get("/diagnoses/:id", (req, res) => {
  const id = req.params.id;
  const diagnosis = diagnosesService.getDiagnosisById(id);
  res.json(diagnosis);
});

export default router;
