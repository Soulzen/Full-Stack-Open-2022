import express from "express";

import calculateBMI from "./bmiCalculator";
import calculateExercise from "./exerciseCalculator";

function isNumberArray(variable: unknown): variable is number[] {
  if (!Array.isArray(variable)) {
    return false;
  }

  return variable.every((element) => typeof element === "number");
}

const app = express();
app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack");
});

app.get("/bmi", (req, res) => {
  const { height, weight } = req.query;
  if (isNaN(Number(height)) || isNaN(Number(weight)))
    res.status(400).json({
      error: "malformatted parameters",
    });
  const bmi = calculateBMI(Number(height), Number(weight));
  res.json({ bmi, height, weight });
});

app.post("/exercises", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;
  if (!daily_exercises || !target) {
    res.status(400).json({ error: "missing parameters" });
  }
  if (isNumberArray(daily_exercises) && typeof target === "number") {
    const result = calculateExercise(daily_exercises, target);
    res.json(result);
  } else {
    res.status(400).json({ error: "malformatted parameters" });
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
