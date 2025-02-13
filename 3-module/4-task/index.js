function showSalary(users, age) {
  let filter = [];

  users.forEach(element => {
    if (element.age <= age) {
      filter.push(`${element.name}, ${element.balance}`)
    }
  });
  
  return filter.join('\n');
}
