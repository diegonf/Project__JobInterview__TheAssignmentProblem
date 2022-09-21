import { containColumnOrRow } from "./util.js";

const getZerosMatrix = (input, assignedZeros) => {
  let zerosRow = [];
  let zerosColumns = [];
  for (var i = 0; i < input.length; i++) {
    let sumRow = 0;
    let sumCol = 0;
    for (var j = 0; j < input.length; j++) {
      const isCovered = containColumnOrRow(assignedZeros, [i, j]);
      if (!isCovered) {
        if (input[i][j] === 0) {
          sumRow++;
        }
        if (input[j][i] === 0) {
          sumCol++;
        }
      }
    }
    zerosRow.push(sumRow);
    zerosColumns.push(sumCol);
  }
  return { zerosRow, zerosColumns };
}

const assignZeros = (input, zerosRow, zerosColumns, assignedZeros) => {
  if (assignedZeros.length === input.length) {
    return assignedZeros;

  } else {
    const minRow = Math.min(...(zerosRow.filter(item => { return item !== 0 })));
    const indexOfRow = zerosRow.indexOf(minRow);
    const minCol = Math.min(...(zerosColumns.filter(item => { return item !== 0 })));
    const indexOfCol = zerosColumns.indexOf(minCol);

    if (minRow === 1) {
      for( var c = 0; c < input.length ; c++){
        const isCovered = containColumnOrRow(assignedZeros, [indexOfRow, c]);
        if (input[indexOfRow][c] === 0 && !isCovered) {
          assignedZeros.push([indexOfRow, c]);
          const { zerosRow: newZerosRow, zerosColumns: newZerosColumn } = getZerosMatrix(input, assignedZeros);
          return assignZeros(input, newZerosRow, newZerosColumn, assignedZeros);
        }
      }
    } else if (minCol === 1) {
      for (var i = 0; i < input.length; i++) {
        const isCovered = containColumnOrRow(assignedZeros, [i, indexOfCol]);
        if (input[i][indexOfCol] === 0 && !isCovered) {
          assignedZeros.push([i, indexOfCol]);
          const { zerosRow: newZerosRow, zerosColumns: newZerosColumn } = getZerosMatrix(input, assignedZeros);
          return assignZeros(input, newZerosRow, newZerosColumn, assignedZeros);
        }
      }
    } else {
      let sumRowsAndCols = [];
      let indexZeros = [];
      for (var i = 0; i < input.length; i++) {
        for (var j = 0; j < input.length; j++) {
          const isCovered = containColumnOrRow(assignedZeros, [i, j]);
          if (!isCovered && input[i][j] === 0) {
            const sum = zerosRow[i] + zerosColumns[j];
            sumRowsAndCols.push(sum);
            indexZeros.push([i, j]);
          }
        }
      }
      const minSum = Math.min(...sumRowsAndCols);
      const indexMinSum = sumRowsAndCols.indexOf(minSum);
      const [row, col] = indexZeros[indexMinSum];
      assignedZeros.push([row, col]);
      const { zerosRow: newZerosRow, zerosColumns: newZerosColumn } = getZerosMatrix(input, assignedZeros);
      return assignZeros(input, newZerosRow, newZerosColumn, assignedZeros);
    }
  }
}

export const step5 = (input) => {
  // Get sum of zeros for each row and column for the main input
  const { zerosRow, zerosColumns } = getZerosMatrix(input, []);
  // Assign all zeros
  const assignedZeros = assignZeros(input, zerosRow, zerosColumns, []);
  return assignedZeros;
};