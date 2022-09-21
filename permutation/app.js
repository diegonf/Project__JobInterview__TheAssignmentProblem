const getAllPossiblePermutations = (length) => {
  let numArr = [];
  for (let i = 0; i < length; i++) {
    numArr[i] = i + 1;
  }
  let arrayAllPermutableOptions = getAllPossiblePermutationsIterating(numArr);
  let allPossiblePermutations = arrayAllPermutableOptions.map( (row) => {
    return row.join('');
  });
  return allPossiblePermutations;
};

const getAllPossiblePermutationsIterating = (inputArray) => {
  let data = inputArray;
  let resultArray = [];
  let len = data.length;
  if (len === 0) {
    return [[]];
  }
  else {
    let first = data.shift(); // shift() returns the first element e delete this first element of thi original array
    let words = getAllPossiblePermutationsIterating(data); // here data is with the first element deleted
    words.forEach( (word) => {
      for (let i = 0; i < len; ++i) {
        let tmp = word.slice(); // slice() with no arguments just copies the entire array
        tmp.splice(i, 0, first); // splice(start, deleteCount, item1) - it is including the first element, in the index i, deleting a total of 0 elements
        resultArray.push(tmp);
      }
    });
  }
  return resultArray;
};

const convertArray = (arr) => {
  const newArr = arr.map(row => {
    return row.match(/[0-9]+/g);
  });
  return newArr.map(row => {
    return row.map(item => {
      return +item;
    });
  });
};

const getTotalOfAllOptions = (allOptions, arr) => {
  return allOptions.map(function (row) {
    let orderArr = row.split('');
    let holdArr = arr.map((row, ind) => {
      const index = orderArr[ind] - 1;
      return row[index];
    });
    let score = holdArr.reduce((first, second) => first + second ); // reduce returns the total sum of the array
    return [row, score];
  });
};

const ansConvert = (str) => {
  let res = '';
  for (let i = 0; i < str.length; i++) {
    res = res + '(' + (i + 1) + '-' + str[i] + ')';
  }
  return res;
};

const OptimalAssignments = (inputMatrix) => {
  //0. matrix length
  const length = inputMatrix.length;

  //1. get list of all possibilities by permutating the indices
  const possibleOptions = getAllPossiblePermutations(length);

  //2. convert the array of strings to an array of number arrays.
  const workArray = convertArray(inputMatrix);

  //3. attach to each option the sum of the items corresponding to the option
  let totalOfOptions = getTotalOfAllOptions(possibleOptions, workArray);

  //4. sort the totals from greatest to least, and return the most cost effective in string form
  totalOfOptions.sort( (a, b) => b[1] - a[1] );
  
  const bestOption = totalOfOptions.pop()[0]; 

  //5. convert the answer into the required format, and return
  return (ansConvert(bestOption));
}

const input1 = [ "(1,2,1)", "(4,1,5)", "(5,2,1)" ];  // Output: (1-1)(2-2)(3-3)
console.log(OptimalAssignments(input1));

const input2 = ["(5,4,2)", "(12,4,3)", "(3,4,13)"];
console.log(OptimalAssignments(input2)); // Output: (1-3)(2-2)(3-1)

const input3 = [ "(13,4,7,6)", "(1,11,5,4)", "(6,7,2,8)", "(1,3,5,9)" ]; // Output: (1-2)(2-4)(3-3)(4-1)
console.log(OptimalAssignments(input3));