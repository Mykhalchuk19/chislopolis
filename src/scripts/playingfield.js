let arr = [];

function getSqrt(num) {
  let f = 0;
  for (let i = 1; i <= num; i += 1) {
    if (num / i === i) {
      f = i;
    }
  }
  return f;
}

function createTable(array) {
  let currentColumn = 0;
  const table = document.createElement('table');
  for (let i = 0; i < array.length; i += 1) {
    if ((i + 1) % getSqrt(array.length) === 0) {
      const tr = document.createElement('tr');
      table.appendChild(tr);
      for (let j = currentColumn; j < array.length; j += 1) {
        const td = document.createElement('td');
        td.innerHTML = array[j];
        tr.appendChild(td);
        currentColumn += 1;
        if ((j + 1) % getSqrt(array.length) === 0) break;
      }
    }
  }
  document.getElementById('div-table').appendChild(table);
}

// --------------ФУНКЦІЇ НА ГЕНЕРУВАННЯ МАСИВУ--------------------

function compareRandom() {
  return Math.random() - 0.5;
}

function shuffle(array) {
  array.sort(compareRandom);
}

function range(from, to, l) {
  arr = [];
  for (let i = from; i <= to; i += l) {
    arr.push(i);
  }
}

function amountRows(row) {
  return row * row;
}

export {
  arr, createTable, shuffle, range, amountRows
};
