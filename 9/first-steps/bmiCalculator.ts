const calculateBMI = (height: number, mass: number): string => {
  const bmi = mass / ((height / 100) ^ 2);
  console.log(bmi);

  if (bmi < 16) return "Underweight (Severe thinness)";
  else if (bmi < 17) return "Underweight (Moderate thinness)";
  else if (bmi < 18.5) return "Underweight (Mild thinness)";
  else if (bmi < 25) return "Normal range";
  else if (bmi < 30) return "Overweight (Pre-obese)";
  else if (bmi < 35) return "Obese (Class I)";
  else if (bmi < 40) return "Obese (Class II)";
  else if (bmi >= 40) return "Obese (Class III)";
  else return "Error: BMI NaN";
};

export default calculateBMI;

// console.log(calculateBMI(188, 80))

// console.log(calculateBMI(Number(process.argv[2]), Number(process.argv[3])))
