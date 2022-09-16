export const step1 = (input) => {
  return input.map(row => {
    const minOfRow = Math.min(...row);
    const subtractedRow = row.map(item => {
      return item - minOfRow;
    })
    return subtractedRow;
  })
}