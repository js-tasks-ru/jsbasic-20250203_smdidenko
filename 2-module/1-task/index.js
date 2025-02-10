function sumSalary(salaries) {
  let salarySum = 0;
  for (let key in salaries) {
    if (typeof salaries[key] === 'number' && Number.isFinite(salaries[key])) {
		salarySum += salaries[key];
    }
  }
  return salarySum;
}
