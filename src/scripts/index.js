import '../styles/basic.sass';
import './checkName.js';
import './instruction.js';
import {
  playersRecords, writeRecords, playersArr, writeObj
} from './records';
import {
  arr, createTable, shuffle, range, amountRows
} from './playingfield';
export let amountlvl = 0;

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
const helpBtn = document.getElementById('help');
const currentNum = document.getElementById('current-number');
let seconds;
const usual = document.getElementById('usual');
const reverse = document.getElementById('reverse');
const ordinary = document.getElementById('ordinary');
const even = document.getElementById('even');
const odd = document.getElementById('odd');
const records = document.getElementById('records-inner');
const namePlayer = document.getElementById('name-player');

// ------------СТАРТ-----------------
function startFirstLvl() {
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
}

function start() {
  if (window.timerId != null) {
    window.clearInterval(window.timerId);
  }
  const table = document.querySelector('table');
  if (document.getElementById('div-table').contains(table) === true) {
    document.getElementById('div-table').removeChild(table);
  }
  rows = 2;
  q = 1;
  startFirstLvl();
  seconds = rows * rows * 3;
  time.innerHTML = seconds;
  stopBtn.disabled = false;
  pauseBtn.disabled = false;
  this.disabled = true;
  namePlayer.disabled = true;
  hindBtn.disabled = false;
  helpBtn.disabled = true;
  window.timerId = window.setInterval(go, 1000);
}

// ---------------ПАУЗА-----------

function pause() {
  const secondsPause = Number(time.innerHTML);
  const td = document.getElementsByTagName('td');
  if (this.innerHTML === 'Пауза') {
    window.clearInterval(timerId);
    this.innerHTML = 'Продовжити';
    //this.style.backgroundColor = '#019875';
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
    //this.style.backgroundColor = '#d64541';
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
    namePlayer.value = '';
    namePlayer.disabled = false;
    writeRecords(records, playersRecords);
    amountlvl = 0;
  } else {
    rows += 1;
    document.getElementById('div-table').removeChild(table);
    startFirstLvl();
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
  namePlayer.disabled = false;
  hindBtn.disabled = true;
  helpBtn.disabled = false;
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

document.getElementById('hind').addEventListener('click', hindNumber);
