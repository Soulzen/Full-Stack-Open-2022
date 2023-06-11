interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercise = (daysTrained: number[], expected: number): Result => {
  const periodLength = daysTrained.length;
  const trainingDays = daysTrained.filter((hoursTrained: number) => {
    return hoursTrained > 0;
  }).length;
  const average =
    daysTrained.reduce(
      (acc: number, current: number): number => acc + current,
      0
    ) / periodLength;
  const target = expected;
  const success = average >= target;
  const rating = average - target >= 0 ? 3 : average - target < -0.5 ? 1 : 2;
  let ratingDescription;
  switch (rating) {
    case 1:
      ratingDescription = "Low effort, shame on you";
      break;
    case 2:
      ratingDescription = "Quite OK";
      break;
    case 3:
      ratingDescription = "Great Job, congrats!";
      break;

    default:
      ratingDescription = "Something went wrong";
      break;
  }
  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

// console.log(calculateExercise([3, 0, 2, 4.5, 0, 3, 1], 2))
// const weekWorkout = process.argv.slice(3).map((n) => Number(n));
// const target = Number(process.argv[2]);

// console.log(calculateExercise(weekWorkout, target));

export default calculateExercise;
export { Result };
