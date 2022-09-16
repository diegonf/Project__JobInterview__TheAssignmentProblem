export const transpose = (matrix) => {
  return matrix[0].map((col, i) => matrix.map(row => row[i]));
}

export const containArray = (mainArray, array) => {
  return mainArray.some(a => {
    return a[0] === array[0] && a[1] === array[1];
  });
}

export const containColumnOrRow = (mainArray, array) => {
  return mainArray.some(a => {
    return a[0] === array[0] || a[1] === array[1];
  });
}

export const isZeroCovered = (i, j, coveredRows, coveredColumns) => {
  const isCoveredRow = coveredRows.some(row => {
    return row === i;
  })
  const isCoveredColumn = coveredColumns.some(col => {
    return col === j;
  })
  return isCoveredRow || isCoveredColumn;
}