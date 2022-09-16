import { step1 } from "./step1.js";
import { transpose } from "./util.js";

export const step2 = (input) => {
  const transposedMatrix = transpose(input);
  const inputSecondStepTransposed = step1(transposedMatrix); // work with rows as in step one
  return transpose(inputSecondStepTransposed);
}