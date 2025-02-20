function highlight(table) {
  let tableRows = table.querySelectorAll('tr');

  tableRows.forEach(rowElement => {
    if (rowElement.cells[3].dataset.available == "true") rowElement.classList.add('available'); else rowElement.classList.add('unavailable');
    if (rowElement.cells[3].dataset.available == undefined) rowElement.hidden = true;
    if (rowElement.cells[2].textContent == "m") rowElement.classList.add('male'); else rowElement.classList.add('female');
    if (rowElement.cells[1].textContent < 18) rowElement.style.textDecoration = 'line-through';
  });

  return null;
}
