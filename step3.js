import { containArray, containColumnOrRow, isZeroCovered } from "./util.js";
// Step 3.1
const starAllPossibleZeros = (input) => {
  let assignedZeros = [];
  for (var i = 0; i < input.length; i++) {
    for (var j = 0; j < input.length; j++) {
      // Check if it is ZERO and UNIQUE in its column and row
      const columnOrRowAlreadyAssigned = containColumnOrRow(assignedZeros, [i,j]);
      if (input[i][j] === 0 && !columnOrRowAlreadyAssigned) assignedZeros.push([i, j]);
    }
  }
  return assignedZeros;
}

const coverAllColumsOfStarredZeros = (assignedZeros) => {
  // Step 3.2
  const coveredColumns = assignedZeros.map(item => {
    return item[1];
  })
  return coveredColumns;
}

const workingWithPrimedZeros = (input, assignedZeros, primedZeros, coveredRows, coveredColumns) => {
  // Step 3.3
  for (var i = 0; i < input.length; i++) {
    for (var j = 0; j < input.length; j++) {
      // Check if it is ZERO and is NOT ASSIGNED
      const isCovered = isZeroCovered(i, j, coveredRows, coveredColumns)
      if (input[i][j] === 0 && !isCovered) {
        primedZeros.push([i, j]); // Prime zero

        // Step 3.3.1
        // ### it looks if there are assigned zeros in the same row as the primed one
        let assignedZeroSameRow = [];
        input[i].forEach((item, index) => {
          if (index !== j && item === 0) {
            const isAssigned = containArray(assignedZeros, [i, index]);
            if (isAssigned) assignedZeroSameRow.push(i, index);
          }
        });
        if (assignedZeroSameRow.length >= 1) {
          // Step 3.3.1 found assigned zeros in the same row of the non-assigned
          coveredRows.push(i);  // add the row to the covered rows
          coveredColumns.splice(coveredColumns.indexOf(assignedZeroSameRow[1]), 1);  // remove the column of the covered columns
        }
        // Step 3.3.2
        else {
          // Step 3.3.2.1 look for assigned zeros in the same column
          let assignedZeroSameColumn = [];
          for (var k = 0; k < input.length; k++) {
            if (k !== i && input[k][j] === 0) {
              const isAssigned = containArray(assignedZeros, [k, j]);
              if (isAssigned) assignedZeroSameColumn.push(k, j);
            }
          }

          if (assignedZeroSameColumn.length >= 1) {
            // Step 3.3.2.1.1 Find primed zero on the corresponding row and get back to step 1
            let primedZeroSameRowAssignedZeroSameColumn = [];
            for (var k = 0; k < input.length; k++) {
              const isPrimed = containArray(primedZeros, [assignedZeroSameColumn[0], k]);
              if (k !== assignedZeroSameColumn[1] && input[assignedZeroSameColumn[0]][k] === 0 && isPrimed) {
                primedZeroSameRowAssignedZeroSameColumn.push(assignedZeroSameColumn[0], k);
              }
            }
            if (primedZeroSameRowAssignedZeroSameColumn.length >= 1) {
              // Last step - check path
              for (var r = 0; r < input.length; r++) {
                for (var c = 0; c < input.length; c++) {
                  // check if it is in the path
                  const iRow = Math.min(i, assignedZeroSameColumn[0]);
                  const fRow = Math.max(i, assignedZeroSameColumn[0]);
                  const iCol = Math.min(j, primedZeroSameRowAssignedZeroSameColumn[1]);
                  const fCol = Math.max(j, primedZeroSameRowAssignedZeroSameColumn[1]);
                  if ((r >= iRow && r <= fRow && c === j) || (r === assignedZeroSameColumn[0] && c >= iCol && c <= fCol)) {
                    // in the path
                    // removing assigned zeros in the path
                    const isAssigned = containArray(assignedZeros, [r, c]);
                    if (isAssigned) {
                      assignedZeros = assignedZeros.filter((assignedZero) => {
                        return assignedZero[0] !== r && assignedZero[1] !== c;
                      })
                    }
                    const isPrimed = containArray(primedZeros, [r, c]);
                    if (isPrimed) {
                      assignedZeros.push([r, c]);
                    }
                  }
                }
              }
              coveredColumns = coverAllColumsOfStarredZeros(assignedZeros);
              coveredRows = [];
              primedZeros = [];
              return workingWithPrimedZeros(input, assignedZeros, primedZeros, coveredRows, coveredColumns);
            } else {
              // Step 3.3.2.1.2
              // stop
            }
          } else {
            // Step 3.3.2.2
            // stop
          }
        }
      }
    }
  }

  const isAllZerosCovered = !input.some((row, r) => {
    return row.some((item, c) => {
      return item === 0 && !isZeroCovered(r, c, coveredRows, coveredColumns);
    })
  });
  if (isAllZerosCovered) {
    return { coveredRows, coveredColumns };
  } else {
    return workingWithPrimedZeros(input, assignedZeros, [], coveredRows, coveredColumns);
  }
}

export const step3 = (input) => {
  // Step 3.1
  let assignedZeros = starAllPossibleZeros(input);
  // Step 3.2
  let coveredColumns = coverAllColumsOfStarredZeros(assignedZeros);
  // Step 3.3 
  let coveredRows = [], primedZeros = [];
  return workingWithPrimedZeros(input, assignedZeros, primedZeros, coveredRows, coveredColumns);
}