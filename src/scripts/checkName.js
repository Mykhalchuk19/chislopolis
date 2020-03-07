const namePlayer = document.getElementById('name-player');
function checkName() {
  const restart = document.getElementById('restart');
  if (this.value.length > 2 && this.value.length < 9) {
    restart.disabled = false;
  } else if (this.value.length <= 2 || this.value.length >= 9) {
    restart.disabled = true;
  }
}
namePlayer.addEventListener('keyup', checkName);
