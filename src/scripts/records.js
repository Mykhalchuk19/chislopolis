import {
  amountlvl
} from './index';

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
writeRecords(document.getElementById('records-inner'), playersRecords);

// -----------------Додавання об'єкту в localSorage--------------

function writeObj(objArr) {
  const playerName = document.getElementById('name-player').value;
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
  clearTableOfRecords(document.getElementById('records-inner'));
}

document.getElementById('clear').addEventListener('click', clearRecords);

export {
  writeObj, playersArr, writeRecords, playersRecords
};
