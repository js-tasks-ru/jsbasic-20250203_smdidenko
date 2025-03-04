/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {
  elem = null;

  constructor(rows) {

    this.elem = document.createElement('table');

    let theader = document.createElement('thead');
    let theaderRow = document.createElement('tr');

    let th1 = document.createElement('th');
    th1.textContent = 'Имя';
    theaderRow.appendChild(th1);  
    let th2 = document.createElement('th');
    th2.textContent = 'Возраст';
    theaderRow.appendChild(th2);  
    let th3 = document.createElement('th');
    th3.textContent = 'Зарплата';
    theaderRow.appendChild(th3);
    let th4 = document.createElement('th');
    th4.textContent = 'Город';
    theaderRow.appendChild(th4);
    let th5 = document.createElement('th');
    theaderRow.appendChild(th5);

    theader.appendChild(theaderRow);
    this.elem.appendChild(theader);

    let tbody = document.createElement('tbody');
    for (let i = 0; i < rows.length; i++) {
      let newRow = this.#addRow(rows[i]);
      tbody.appendChild(newRow);
    }
    this.elem.appendChild(tbody);

  }

  #addRow(rowData) {
    let newRow = document.createElement('tr');

    for (let key in rowData) {
      let td = document.createElement('td');
      td.textContent = rowData[key];
      newRow.appendChild(td);
    }

    let tdDelete = document.createElement('td');
    let deleteButton = document.createElement('button');
    deleteButton.textContent = 'X';
    deleteButton.addEventListener('click', this.#onDeleteBtnClick)
    tdDelete.appendChild(deleteButton);
    newRow.appendChild(tdDelete);

    return newRow;
  }

  #onDeleteBtnClick = (event) => {
    const row = event.target.closest('tr');
    this.elem.deleteRow(row.rowIndex);
  }
  
}
