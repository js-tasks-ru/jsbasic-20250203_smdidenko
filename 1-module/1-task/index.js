function factorial(n) {
  let factorial = 1;

  for (let i = 1; i < n+1; i++) {
    factorial = factorial * i;      
  }
  
  return factorial;
}