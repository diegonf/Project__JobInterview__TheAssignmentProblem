import { step1 } from "./step1.js";
import { step2 } from "./step2.js";
import { step3 } from "./step3.js";
import { step4 } from "./step4.js";
import { step5 } from "./step5.js";
// import { transformData, transformResult } from "./util.js";

//uteis
export const util = {
  transformData: (input) => {
    const transformedInput = input.map(row => {
      return row.match(/[0-9]+/g);
    })
    return transformedInput.map(row => {
      return row.map(item => {
        return Number(item);
      })
    })
  },

  transformResult: (result) => {
    debugger;
    let resultOrdered = [];
    for (var i = 0; i < result.length; i++) {
      result.forEach((item, index) => {
        if (item[0] === i) {
          resultOrdered.push(result[index]);
        }
      })
    }

    let finalResult = '';
    resultOrdered.forEach(item => {
      finalResult = finalResult + '(' + (item[0] + 1) + '-' + (item[1] + 1) + ')';
    })

    return finalResult;
  }
}

// The Hungarian Method
const assignmentProblem = (ipt) => {
  // Transforming data
  const input = util.transformData(ipt);
  // Step 1
  const inputFirstStep = step1(input);
  // Step 2
  const inputSecondStep = step2(inputFirstStep);
  // Step 3
  const { coveredRows, coveredColumns } = step3(inputSecondStep);
  // Step 4
  const inputFourthStep = step4(inputSecondStep, coveredRows, coveredColumns);
  // Step 5
  const bestSolution = step5(inputFourthStep);
  // Transforming result
  const finalSolution = util.transformResult(bestSolution)
  return finalSolution;
}

const input = ["(5,4,2)", "(12,4,3)", "(3,4,13)"];
console.log(assignmentProblem(input));

const input2 = ["(1,2,1)", "(4,1,5)", "(5,2,1)"];
console.log(assignmentProblem(input2));

const input3 = ["(13,4,7,6)", "(1,11,5,4)", "(6,7,2,8)", "(1,3,5,9)"];
console.log(assignmentProblem(input3));

