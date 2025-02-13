function filterRange(arr, a, b) {
  let filter = [];
  
  arr.forEach(element => {
    if (element >= a && element <= b) {
      filter.push(element);
    }
  });

  return filter;
}
