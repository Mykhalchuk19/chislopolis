import '../styles/basic.sass';
import './checkName.js';
import './instruction.js';

let arr = [];
let a;
let q;
let d;
let n = 1;
let elements;
let rows;
const time = document.getElementById('time');
const restart = document.getElementById('restart');
const stopBtn = document.getElementById('stop');
const pauseBtn = document.getElementById('pause');
const hindBtn = document.getElementById('hind');
const clearBtn = document.getElementById('clear');
const helpBtn = document.getElementById('help');
const currentNum = document.getElementById('current-number');
let seconds;
const usual = document.getElementById('usual');
const reverse = document.getElementById('reverse');
const ordinary = document.getElementById('ordinary');
const even = document.getElementById('even');
const odd = document.getElementById('odd');
const records = document.getElementById('records-inner');
const divTable = document.getElementById('div-table');
let amountlvl = 0;
const namePlayer = document.getElementById('name-player');


// -------------------ЗАПИС РЕКОРДІВ В ТАБЛИЦЮ------------------
function clearListOfRecords(list) {
  while (list.firstChild) {
    list.removeChild(list.firstChild);
  }
}

function clearTableOfRecords(div) {
  div.children.forEach((list) => {
    clearListOfRecords(list);
  });
}

function addRecordsToTable(div, array) {
  array.sort((c, b) => (c.levels < b.levels ? 1 : -1));
  const infoPlayerList = div.children[0];
  const infoLvlList = div.children[1];
  array.forEach((item) => {
    const infoPlayerItem = document.createElement('li');
    const infoLvlItem = document.createElement('li');
    infoPlayerItem.innerHTML = item.name;
    infoLvlItem.innerHTML = item.levels;
    infoPlayerList.appendChild(infoPlayerItem);
    infoLvlList.appendChild(infoLvlItem);
  });
}

function writeRecords(div, array) {
  const json = localStorage.getItem('records');
  array = JSON.parse(json);
  if (array != null) {
    clearTableOfRecords(document.getElementById('records-inner'));
    addRecordsToTable(div, array);
  }
}

// ------------Перевірка localStorage-------------

let playersArr = [];
let playersInf = JSON.parse(localStorage.getItem('records'));
if (playersInf != null) {
  playersArr = JSON.parse(JSON.stringify(playersInf));
}
let playersRecords = JSON.parse(JSON.stringify(playersInf));
writeRecords(records, playersRecords);

// -----------------Додавання об'єкту в localSorage--------------

function writeObj(objArr) {
  const playerName = namePlayer.value;
  const obj = {
    name: '',
    levels: 0
  };
  obj.name = playerName;
  obj.levels = amountlvl;
  objArr.push(obj);
  localStorage.setItem('records', JSON.stringify(objArr));
}

// -----------------------ОЧИСТИТИ РЕКОРДИ----------------------

function clearRecords() {
  localStorage.clear();
  playersArr = [];
  playersInf = [];
  playersRecords = [];
  clearTableOfRecords(records);
}

clearBtn.addEventListener('click', clearRecords);

// --------------------СТВОРЕННЯ ТАБЛИЦІ---------------

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
  divTable.appendChild(table);
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

// ------------СТАРТ-----------------

function start() {
  if (window.timerId != null) {
    window.clearInterval(window.timerId);
  }
  const table = document.querySelector('table');
  if (divTable.contains(table) === true) {
    divTable.removeChild(table);
  }
  rows = 2;
  q = 1;
  if (ordinary.checked) {
    q = 1;
    const amount = amountRows(rows);
    range(1, amount, q);
    even.disabled = true;
    odd.disabled = true;
    a = amount;
  } else if (even.checked) {
    q = 2;
    const amount = amountRows(rows) * 2;
    range(2, amount, q);
    ordinary.disabled = true;
    odd.disabled = true;
    a = amount;
  } else if (odd.checked) {
    q = 2;
    const amount = amountRows(rows) * 2;
    range(1, amount, q);
    ordinary.disabled = true;
    even.disabled = true;
    a = amount;
  }
  shuffle(arr);
  createTable(arr);
  clickCell();
  seconds = rows * rows * 3;
  time.innerHTML = seconds;
  stopBtn.disabled = false;
  pauseBtn.disabled = false;
  pauseBtn.style.backgroundColor = '#d64541';
  this.disabled = true;
  namePlayer.disabled = true;
  hindBtn.disabled = false;
  helpBtn.disabled = true;
  helpBtn.style.backgroundColor = '#95a6a6';
  window.timerId = window.setInterval(go, 1000);
}

// ---------------ПАУЗА-----------

function pause() {
  const secondsPause = Number(time.innerHTML);
  const td = document.getElementsByTagName('td');
  if (this.innerHTML === 'Пауза') {
    window.clearInterval(timerId);
    this.innerHTML = 'Продовжити';
    this.style.backgroundColor = '#019875';
    stopBtn.disabled = true;
    hindBtn.disabled = true;
    helpBtn.disabled = false;
    helpBtn.style.backgroundColor = '#bf55ec';
    td.forEach((item) => {
      item.innerHTML = '';
    });
  } else if (this.innerHTML === 'Продовжити') {
    stopBtn.disabled = false;
    hindBtn.disabled = false;
    helpBtn.disabled = true;
    helpBtn.style.backgroundColor = '#95a6a6';
    time.innerHTML = String(secondsPause);
    window.timerId = window.setInterval(go, 1000);
    this.innerHTML = 'Пауза';
    this.style.backgroundColor = '#d64541';
    td.forEach((item, index) => {
      item.innerHTML = arr[index];
    });
  }
}

restart.addEventListener('click', start);
pauseBtn.addEventListener('click', pause);

// --------------------ПЕРЕВІРКА НА ПЕРЕМОГУ---------------------

function checkWin() {
  const table = document.querySelector('table');
  n = 1;
  amountlvl += 1;
  if (rows === 8) {
    writeObj(playersArr);
    time.innerHTML = 'Ви перемогли! Вітаємо!!!';
    currentNum.innerHTML = '';
    window.clearInterval(timerId);
    stopBtn.disabled = true;
    hindBtn.disabled = true;
    pauseBtn.disabled = true;
    usual.disabled = false;
    reverse.disabled = false;
    ordinary.disabled = false;
    even.disabled = false;
    odd.disabled = false;
    helpBtn.disabled = false;
    pauseBtn.style.backgroundColor = '#95a6a6';
    helpBtn.style.backgroundColor = '#bf55ec';
    namePlayer.value = '';
    namePlayer.disabled = false;
    writeRecords(records, playersRecords);
    amountlvl = 0;
  } else {
    rows += 1;
    divTable.removeChild(table);
    if (ordinary.checked) {
      q = 1;
      const amount = amountRows(rows);
      range(1, amount, q);
      even.disabled = true;
      odd.disabled = true;
      a = amount;
    } else if (even.checked) {
      q = 2;
      const amount = amountRows(rows) * 2;
      range(2, amount, q);
      ordinary.disabled = true;
      odd.disabled = true;
      a = amount;
    } else if (odd.checked) {
      q = 2;
      const amount = amountRows(rows) * 2;
      range(1, amount, q);
      ordinary.disabled = true;
      even.disabled = true;
      a = amount;
    }
    shuffle(arr);
    createTable(arr);
    clickCell();
    let p = Number(seconds);
    p += rows * rows * 3;
    seconds = p;
    time.innerHTML = seconds;
  }
}

// -------------АЛГОРИТМ ЗВИЧАЙНОГО РЕЖИМУ ПОШУКУ ЧИСЕЛ---------------

function replaceUsualClass() {
  let s = 0;
  if (ordinary.checked) {
    if (this.innerHTML === String(n)) {
      this.classList.add('active');
      n += 1;
      currentNum.innerHTML = `Знайти: ${n}`;
    }
    if (n === a + 1) {
      checkWin();
    }
  } else if (odd.checked) {
    if (this.innerHTML === String(n)) {
      this.classList.add('active');
      n += 2;
      currentNum.innerHTML = `Знайти: ${n}`;
    }
    if (n === a + 1) {
      checkWin();
    }
  } else if (even.checked) {
    if (this.innerHTML === String(n + 1)) {
      this.classList.add('active');
      n += 2;
      s = n + 1;
      currentNum.innerHTML = `Знайти: ${s}`;
    }
    if (n === a + 1) {
      checkWin();
    }
  }
}

// -------------АЛГОРИТМ ЗВОРОТНЬОГО РЕЖИМУ ПОШУКУ ЧИСЕЛ---------------

function replaceReverseClass() {
  let s = 0;
  if (ordinary.checked) {
    if (this.innerHTML === String(n)) {
      this.classList.add('active');
      n -= 1;
      currentNum.innerHTML = `Знайти: ${n}`;
    }
    if (n === 0) {
      checkWin();
    }
  } else if (odd.checked) {
    if (this.innerHTML === String(d - 1)) {
      this.classList.add('active');
      d -= 2;
      s = d - 1;
      currentNum.innerHTML = `Знайти: ${s}`;
    }
    if (d === 0) {
      checkWin();
    }
  } else if (even.checked) {
    if (this.innerHTML === String(d)) {
      this.classList.add('active');
      d -= 2;
      currentNum.innerHTML = `Знайти: ${d}`;
    }
    if (d === 0) {
      checkWin();
    }
  }
}

// ------------------------КЛІКАБЕЛЬНІСТЬ КЛІТИНОК--------------------

function clickCell() {
  let s = 0;
  elements = document.querySelectorAll('td');
  if (usual.checked) {
    usual.disabled = false;
    reverse.disabled = true;
    n = 1;
    if (ordinary.checked || odd.checked) {
      currentNum.innerHTML = 'Знайти: 1';
    } else {
      currentNum.innerHTML = 'Знайти: 2';
    }
    for (let k = 0; k < elements.length; k += 1) {
      elements[k].addEventListener('click', replaceUsualClass);
    }
  } else if (reverse.checked) {
    reverse.disabled = false;
    usual.disabled = true;
    n = elements.length;
    d = n * 2;
    if (even.checked) {
      currentNum.innerHTML = `Знайти: ${d}`;
    } else if (odd.checked) {
      s = d - 1;
      currentNum.innerHTML = `Знайти: ${s}`;
    } else {
      currentNum.innerHTML = `Знайти: ${n}`;
    }
    for (let k = 0; k < elements.length; k += 1) {
      elements[k].addEventListener('click', replaceReverseClass);
    }
  }
}

// ----------------------ЗУПИНИТИ ГРУ-------------------
function stop() {
  window.clearInterval(timerId);
  const elementsStop = document.querySelectorAll('td');
  for (let i = 0; i < elementsStop.length; i += 1) {
    elementsStop[i].removeEventListener('click', replaceReverseClass);
    elementsStop[i].removeEventListener('click', replaceUsualClass);
  }
  usual.disabled = false;
  reverse.disabled = false;
  ordinary.disabled = false;
  even.disabled = false;
  odd.disabled = false;
  stopBtn.disabled = true;
  pauseBtn.disabled = true;
  pauseBtn.style.backgroundColor = '#95a6a6';
  namePlayer.disabled = false;
  hindBtn.disabled = true;
  helpBtn.disabled = false;
  helpBtn.style.backgroundColor = '#bf55ec';
  time.innerHTML = 'Гру завершено';
  writeObj(playersArr);
  writeRecords(records, playersRecords);
  amountlvl = 0;
  namePlayer.value = '';
  currentNum.innerHTML = '';
}

stopBtn.addEventListener('click', stop);

// -----------------ТАЙМЕР----------------------

function go() {
  let num = Number(time.innerHTML);
  num -= 1;
  time.innerHTML = num;
  if (num === 0) {
    stop();
  }
}

// ---------------ПІДКАЗКА----------------

function hindNumber() {
  const tds = document.querySelectorAll('td');
  if (usual.checked === true) {
    if (ordinary.checked === true || odd.checked === true) {
      for (let i = 0; i < tds.length; i += 1) {
        if (tds[i].innerHTML === String(n)) {
          tds[i].classList.add('hind');
        }
      }
    } else if (even.checked === true) {
      for (let i = 0; i < tds.length; i += 1) {
        if (tds[i].innerHTML === String(n + 1)) {
          tds[i].classList.add('hind');
        }
      }
    }
  } else if (reverse.checked === true) {
    if (ordinary.checked === true) {
      for (let i = 0; i < tds.length; i += 1) {
        if (tds[i].innerHTML === String(n)) {
          tds[i].classList.add('hind');
        }
      }
    } else if (even.checked === true) {
      for (let i = 0; i < tds.length; i += 1) {
        if (tds[i].innerHTML === String(d)) {
          tds[i].classList.add('hind');
        }
      }
    } else if (odd.checked === true) {
      for (let i = 0; i < tds.length; i += 1) {
        if (tds[i].innerHTML === String(d - 1)) {
          tds[i].classList.add('hind');
        }
      }
    }
  }
}

hindBtn.addEventListener('click', hindNumber);
