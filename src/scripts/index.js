import '../styles/basic.sass';
let arr = [];
let a;
let q;
let d;
let currentColumn = 0;
let n = 1;
let elements;
let rows;
const wrapper = document.getElementById('wrapper');
const time = document.getElementById('time');
const restart = document.getElementById('restart');
const stopBtn = document.getElementById('stop');
const pauseBtn = document.getElementById('pause');
const hindBtn = document.getElementById('hind');
const clearBtn = document.getElementById('clear');
const helpBtn = document.getElementById('help');
stopBtn.disabled = true;
pauseBtn.disabled = true;
hindBtn.disabled = true;
const currentNum = document.getElementById('current-number');

const visibleDiv = document.createElement('div');

let seconds;
const usual = document.getElementById('usual');
const reverse = document.getElementById('reverse');
const ordinary = document.getElementById('ordinary');
const even = document.getElementById('even');
const odd = document.getElementById('odd');
const namePlayer = document.getElementById('name-player');
const records = document.getElementById('records');
const divTable = document.getElementById('div-table');
let amountlvl = 0;
let playerName;

// ------------Перевірка введення імені----------------

function checkName() {
    if (this.value.length > 2 && this.value.length < 9) {
        restart.disabled = false;
    } else if (this.value.length <= 2 || this.value.length >= 9) {
        restart.disabled = true;
    }
}
namePlayer.addEventListener('keyup', checkName);

/*function fullDisplay() {
    const table = document.querySelector('table');
    const orderDiv = document.getElementById('order');
    const typeDiv = document.getElementById('type');
    const btns = document.getElementById('btns');
    orderDiv.style.top = '50px';
    typeDiv.style.top = '140px';
    btns.style.top = '50px';
    records.style.top = '280px';
    visibleDiv.style.left = `${window.innerWidth / 2 - table.offsetWidth / 1.8}px`;
    visibleDiv.style.height = `${table.offsetHeight}px`;
    visibleDiv.style.width = `${table.offsetWidth}px`;
}

function adaptDisplay() {
    const table = document.querySelector('table');
    const orderDiv = document.getElementById('order');
    const typeDiv = document.getElementById('type');
    const btns = document.getElementById('btns');
    orderDiv.style.top = `${table.offsetHeight + 100}px`;
    typeDiv.style.top = `${table.offsetHeight + 185}px`;
    btns.style.top = `${table.offsetHeight + 100}px`;
    records.style.top = `${table.offsetHeight + 360}px`;
    visibleDiv.style.left = `${window.innerWidth / 2 - table.offsetWidth / 1.8}px`;
    visibleDiv.style.height = `${table.offsetHeight}px`;
    visibleDiv.style.width = `${table.offsetWidth}px`;
}

function adaptDisplayOpera() {
    const table = document.querySelector('table');
    const orderDiv = document.getElementById('order');
    const typeDiv = document.getElementById('type');
    const btns = document.getElementById('btns');
    orderDiv.style.top = `${table.offsetHeight + 460}px`;
    typeDiv.style.top = `${table.offsetHeight + 560}px`;
    btns.style.top = `${table.offsetHeight + 140}px`;
    records.style.top = `${table.offsetHeight + 690}px`;
    visibleDiv.style.left = `${window.innerWidth / 2 - table.offsetWidth / 1.8}px`;
    visibleDiv.style.height = `${table.offsetHeight}px`;
    visibleDiv.style.width = `${table.offsetWidth}px`;
}

function adapt() {
    const table = document.querySelector('table');
    if (rows === 2) {
        if (table.offsetWidth > window.innerWidth / 5) {
            adaptDisplay();
        } else {
            fullDisplay();
        }
    } else if (rows === 3) {
        if (table.offsetWidth > window.innerWidth / 4) {
            adaptDisplay();
        } else {
            fullDisplay();
        }
    } else if (rows >= 4 && rows < 6) {
        if (table.offsetWidth > window.innerWidth / 3) {
            adaptDisplay();
        } else {
            fullDisplay();
        }
    } else if (rows === 6) {
        if (table.offsetWidth > window.innerWidth / 2.8) {
            adaptDisplay();
        } else {
            fullDisplay();
        }
    } else if (rows === 7) {
        if (table.offsetWidth > window.innerWidth / 2.5) {
            adaptDisplay();
        } else {
            fullDisplay();
        }
    } else if (rows === 8) {
        if (table.offsetWidth > window.innerWidth / 2.3) {
            adaptDisplay();
        } else {
            fullDisplay();
        }
    } else if (rows === 9) {
        if (table.offsetWidth > window.innerWidth / 2.2) {
            adaptDisplay();
        } else {
            fullDisplay();
        }
    } else if (rows >= 10) {
        if (table.offsetWidth > window.innerWidth / 2) {
            adaptDisplay();
        } else {
            fullDisplay();
        }
    }
    if (window.innerWidth < 450 && table.offsetHeight !== 0) {
        adaptDisplayOpera();
    }
}

window.addEventListener('resize', adapt);*/

// -------------------ЗАПИС РЕКОРДІВ В ТАБЛИЦЮ------------------

function writeRecords(div, array) {
    const json = localStorage.getItem('records');
    array = JSON.parse(json);
    if (array != null) {
        array.sort((c, b) => (c.levels < b.levels ? 1 : -1));
        const spans = div.querySelectorAll('span');
        const brs = div.querySelectorAll('br');
        if (spans.length !== 0) {
            for (let j = 0; j < spans.length; j += 1) {
                div.removeChild(spans[j]);
            }
        }
        if (brs.length !== 0) {
            for (let j = 0; j < brs.length; j += 1) {
                div.removeChild(brs[j]);
            }
        }
        const headSpanName = document.createElement('span');
        const headSpanLevels = document.createElement('span');
        headSpanName.innerHTML = "Ім'я";
        headSpanLevels.innerHTML = 'Пройдено рівнів';
        headSpanName.classList.add('span-record-left');
        headSpanLevels.classList.add('span-record-right');
        div.appendChild(headSpanName);
        div.appendChild(headSpanLevels);
        for (let i = 0; i < array.length; i += 1) {
            const spanInfName = document.createElement('span');
            const spanInfLevels = document.createElement('span');
            spanInfName.innerHTML = array[i].name;
            spanInfLevels.innerHTML = array[i].levels;
            spanInfName.classList.add('span-record-left');
            spanInfLevels.classList.add('span-record-right');
            const br = document.createElement('br');
            div.appendChild(br);
            div.appendChild(spanInfName);
            div.appendChild(spanInfLevels);
        }
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
restart.disabled = true;

// -----------------Додавання об'єкту в localSorage--------------

function writeObj(objArr) {
    const obj = {
        name: '',
        levels: 0,
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
    const spans = records.querySelectorAll('span');
    const brs = records.querySelectorAll('br');
    if (spans.length !== 0) {
        for (let j = 0; j < spans.length; j += 1) {
            records.removeChild(spans[j]);
        }
    }
    if (brs.length !== 0) {
        for (let j = 0; j < brs.length; j += 1) {
            records.removeChild(brs[j]);
        }
    }
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
    currentColumn = 0;
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
        window.clearInterval(timerId);
    }
    const table = document.querySelector('table');
    if (divTable.contains(table) === true) {
        divTable.removeChild(table);
    }
    playerName = namePlayer.value;
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
    const table = document.querySelector('table');
    const td = document.getElementsByTagName('td');
    if (this.innerHTML === 'Пауза') {
        window.clearInterval(timerId);
        this.innerHTML = 'Продовжити';
        this.style.backgroundColor = '#019875';
        stopBtn.disabled = true;
        hindBtn.disabled = true;
        helpBtn.disabled = false;
        helpBtn.style.backgroundColor = '#bf55ec';
        visibleDiv.style.position = 'absolute';
        visibleDiv.style.opacity = '0';
        visibleDiv.style.zIndex = '5';
        visibleDiv.style.left = `${window.innerWidth / 2 - table.offsetWidth / 2}px`;
        visibleDiv.style.top = '0px';
        visibleDiv.style.height = `${table.offsetHeight}px`;
        visibleDiv.style.width = `${table.offsetWidth}px`;
        for (let i = 0; i < td.length; i += 1) {
            const computedStyle = getComputedStyle(td[i]);
            td[i].style.color = computedStyle.backgroundColor;
        }
        divTable.appendChild(visibleDiv);
    } else if (this.innerHTML === 'Продовжити') {
        stopBtn.disabled = false;
        hindBtn.disabled = false;
        helpBtn.disabled = true;
        helpBtn.style.backgroundColor = '#95a6a6';
        time.innerHTML = secondsPause;
        window.timerId = window.setInterval(go, 1000);
        this.innerHTML = 'Пауза';
        this.style.backgroundColor = '#d64541';
        for (let i = 0; i < td.length; i += 1) {
            td[i].style.color = '#fff';
        }
        if (divTable.contains(visibleDiv) === true) {
            visibleDiv.parentNode.removeChild(visibleDiv);
        }
    }
}

restart.addEventListener('click', start);
pauseBtn.addEventListener('click', pause);
//restart.addEventListener('click', adapt);

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
        adapt();
        alert('Наступний рівень');
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

// -----------------ЗАКРИТИ ІНСТРУКЦІЮ-----------------

function close() {
    const div = document.querySelector('.help-div');
    wrapper.removeChild(div);
    if (pauseBtn.innerHTML === 'Продовжити') {
        pauseBtn.disabled = false;
        pauseBtn.style.backgroundColor = '#019875';
        namePlayer.disabled = true;
    }
    else {
        namePlayer.disabled = false;
    }
    helpBtn.disabled = false;
    helpBtn.style.backgroundColor = '#bf55ec';
}
// -----------------------ІНСТРУКЦІЯ-----------------
function help() {
    const helpDiv = document.createElement('div');
    const purposeGame = document.createElement('p');
    const headerHelp = document.createElement('h3');
    const parameters = document.createElement('h4');
    const textParameters = document.createElement('p');
    const closeHelp = document.createElement('button');
    helpDiv.classList.add('help-div');
    headerHelp.innerHTML = 'Гра "Числополіс"';
    purposeGame.innerHTML =
        'Ціль гри - знайти всі числа таблиці в певному порядку за відведений час. Пройти всі рівні гри. Кількість часу різна на кожен рівень.';
    parameters.innerHTML = 'Пояснення';
    textParameters.innerHTML =
        'Оберіть порядок чисел: "Звичайний" або "Зворотній" та тип чисел: "Звичайні", "Парні" або "Непарні". Після цього введіть своє ім&#39;я в поле вводу та натисніть на кнопку "Старт".<br>Натисніть на кнопку "Зупинити гру", якщо потрібно повністю зупинити гру.<br>Натисніть на кнопку "Пауза", щоб призупинити гру, "Продовжити", щоб продовжити.<br>Натисніть на кнопку "Підказка", якщо не можете знайти потрібне число. <br>Для того, щоб очистити Таблицю рекордів, натисніть на "Скинути рекорди".<br>Цікавої гри!!!';
    purposeGame.classList.add('help-p');
    textParameters.classList.add('help-p');
    closeHelp.classList.add('close-help');
    closeHelp.innerHTML = 'Зрозумiло';
    closeHelp.addEventListener('click', close);

    helpDiv.appendChild(headerHelp);
    helpDiv.appendChild(purposeGame);
    helpDiv.appendChild(parameters);
    helpDiv.appendChild(textParameters);
    helpDiv.appendChild(closeHelp);
    wrapper.appendChild(helpDiv);
    pauseBtn.disabled = true;
    helpBtn.disabled = true;
    namePlayer.disabled = true;
    pauseBtn.style.backgroundColor = '#95a6a6';
    helpBtn.style.backgroundColor = '#95a6a6';
}

helpBtn.addEventListener('click', help);

