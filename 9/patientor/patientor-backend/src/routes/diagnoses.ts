import express from "express";

import diagnosesService from "../services/diagnosesServices";

const router = express.Router();

router.get("/diagnoses", (_req, res) => {
  const diagnoses = diagnosesService.getDiagnosesData();
  res.json(diagnoses);
});

export default router;
