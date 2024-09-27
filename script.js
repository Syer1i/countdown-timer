const datePicker = document.getElementById('datePicker');
const timePicker = document.getElementById('timePicker');
const timerDisplay = document.getElementById('timerDisplay');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
let countdownInterval;
let targetDateTime;
let paused = true;

const updateTimerDisplay = () => {
    const now = new Date().getTime();

    const distance = targetDateTime - now;

    if (distance <= 0) {
      clearInterval(countdownInterval);
      timerDisplay.textContent = 'Times up!';
      return;
    }
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));

    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

   timerDisplay.textContent = `${String(days).padStart(2, '0')} : ${String(hours).padStart(2, '0')} : ${String(minutes).padStart(2, '0')} : ${String(seconds).padStart(2, '0')}`;
  }

  const startTimer = () => {
    if (paused) {
      targetDateTime = new Date(datePicker.value + ' ' + timePicker.value).getTime();
      paused = false;
      countdownInterval = setInterval(updateTimerDisplay, 1000);
      startBtn.textContent = 'Resume';
      pauseBtn.disabled = false;
      resetBtn.disabled = false;
    } else {
      paused = true;
      clearInterval(countdownInterval);
      startBtn.textContent = 'Resume';
      pauseBtn.disabled = false;
      resetBtn.disabled = false;
    }
  }

  const pauseTimer = () => {
    paused = true;
    clearInterval(countdownInterval);
    startBtn.textContent = 'Resume';
    pauseBtn.disabled = false;
    resetBtn.disabled = false;
  }

const resetTimer = () => {
  clearInterval(countdownInterval);
  timerDisplay.textContent = '00:00:00';
  paused = true;
  startBtn.textContent = 'Start';
  pauseBtn.disabled = true;
  resetBtn.disabled = true;
}
startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);