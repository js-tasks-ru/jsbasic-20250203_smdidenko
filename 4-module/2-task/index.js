function makeDiagonalRed(table) {
  
  let tableRows = table.querySelectorAll('tr');
  console.log(`tableRows = ${tableRows.length}`);
  for (let i = 0; i < tableRows.length; i++) {
    
    let rowElements = tableRows[i].querySelectorAll('td');
    for (let j = 0; j < rowElements.length; j++) {
      
      if (i==j) {
        rowElements[j].style.backgroundColor = 'red';
      }
      
    }
    
  }

}
