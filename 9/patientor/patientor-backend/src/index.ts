import express from "express";
import cors from "cors";

import diagnosesRouter from "./routes/diagnoses";
import patientsRouter from "./routes/patients";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/ping", (_req, res) => {
  console.log("someone pinged here");
  res.send("pong");
});

app.use("/api", diagnosesRouter);
app.use("/api", patientsRouter);

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
