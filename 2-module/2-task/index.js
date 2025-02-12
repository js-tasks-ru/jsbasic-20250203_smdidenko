function isEmpty(obj) {
  let attributesCount = 0;
  for (const key in obj) {
    attributesCount += 1;
  }
  return attributesCount === 0;
}
