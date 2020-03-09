function close() {
  const helpBlock = document.getElementById('help-div');
  helpBlock.style.display = 'none';
  if (document.getElementById('pause').innerHTML === 'Продовжити') {
    document.getElementById('pause').disabled = false;
    document.getElementById('pause').style.backgroundColor = '#019875';
    document.getElementById('name-player').disabled = true;
  } else {
    document.getElementById('name-player').disabled = false;
  }
  document.getElementById('help').disabled = false;
  document.getElementById('help').style.backgroundColor = '#bf55ec';
}
document.getElementById('help-close').addEventListener('click', close);

function help() {
  const helpBlock = document.getElementById('help-div');
  helpBlock.style.display = 'block';
  document.getElementById('pause').disabled = true;
  document.getElementById('help').disabled = true;
  document.getElementById('name-player').disabled = true;
}
document.getElementById('help').addEventListener('click', help);
