export const transformData = (input) => {
  const transformedInput = input.map(row => {
    return row.match(/[0-9]+/g);
  })
  return transformedInput.map(row => {
    return row.map(item => {
      return +item;
    })
  })
};

export const transformResult = (result) => {
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
};

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