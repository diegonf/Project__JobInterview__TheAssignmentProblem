import { step3 } from "./step3.js";
import { containArray, isZeroCovered } from "./util.js";

const isIntersection = (i, j, coveredRows, coveredColumns) => {
  let intersactions = []
  coveredRows.map(r => {
    coveredColumns.map(c => {
      intersactions.push([r, c]);
    })
  })
  return containArray(intersactions, [i, j]);
}

const getIdealMatrixStep4 = (input, coveredRows, coveredColumns) => {
  let uncoveredValues = [];
  for (var i = 0; i < input.length; i++) {
    for (var j = 0; j < input.length; j++) {
      const isCovered = isZeroCovered(i, j, coveredRows, coveredColumns)
      if (!isCovered) {
        uncoveredValues.push(input[i][j]);
      }
    }
  }
  const minValue = Math.min(...uncoveredValues);

  const inputFourthStep = input.map((row, r) => {
    return row.map((item, c) => {
      const isCovered = isZeroCovered(r, c, coveredRows, coveredColumns);
      const isIntersec = isIntersection(r, c, coveredRows, coveredColumns);
      if (isCovered) {
        if (isIntersec) {
          return item + minValue;
        } else {
          return item;
        }
      } else {
        return item - minValue;
      }
    })
  })

  // console.log('Fourth Step');
  // inputFourthStep.map(row => {
  //   console.log(row);
  // })
  // call step 3 to get new covered lines
  const { coveredRows: newCovRow, coveredColumns: newCovCOl } = step3(inputFourthStep);
  const m = newCovRow.length + newCovCOl.length;

  if (m < input.length) {
    return getIdealMatrixStep4(inputFourthStep, newCovRow, newCovCOl);
  } else {
    return inputFourthStep;
  }
}

export const step4 = (input, coveredRows, coveredColumns) => {
  const m = coveredRows.length + coveredColumns.length;

  if (m < input.length) {
    return getIdealMatrixStep4(input, coveredRows, coveredColumns)
  } else {
    return input;
  }
}