function getMinMax(str) {

  function compareNumeric(a, b) {
    if (a > b) return 1;
    if (a == b) return 0;
    if (a < b) return -1;
  }

  let onlyNumbers = str
    .split(' ')
    .filter((item) => !isNaN(Number(item)))
    .map((item) => Number(item))
    .sort(compareNumeric);

  return {
    min: onlyNumbers[0],
    max: onlyNumbers.at(-1)
  };
}