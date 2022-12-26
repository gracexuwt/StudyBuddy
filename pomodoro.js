const timer = {
    study: 25,
    shortBreak: 5,
};
  
let interval;
let clock = document.querySelector('.clock');
  
const clickSound = new Audio('button-sound.mp3');
const alarmSound = new Audio('alarm-sound.wav');

const mainButton = document.getElementById('js-btn');
mainButton.addEventListener('click', () => {
    clickSound.play();
    const { action } = mainButton.dataset;
    if (action === 'start') {
        startTimer();
    }
    else{
        stopTimer();
    }
});
  
const modeButtons = document.querySelector('#js-mode-buttons');
modeButtons.addEventListener('click', handleMode);
  
function handleMode(event) {
    const { mode } = event.target.dataset;
  
    if (!mode) return;
  
    switchMode(mode);
    stopTimer();
}

function switchMode(mode) {
    timer.mode = mode;
    timer.remainingTime = {
      total: timer[mode] * 60,
      minutes: timer[mode],
      seconds: 0,
    };
  
    document
      .querySelectorAll('button[data-mode]')
      .forEach(e => e.classList.remove('active'));
    document.querySelector(`[data-mode="${mode}"]`).classList.add('active');
  
    updateTimer();
}

function updateTimer() {
    const { remainingTime } = timer;
    if(remainingTime.seconds < 10){
      clock.innerHTML = `${remainingTime.minutes}:0${remainingTime.seconds}`;
    }
    else{
      clock.innerHTML = `${remainingTime.minutes}:${remainingTime.seconds}`;
    }
}
  
function getRemainingTime(endTime) {
    const currentTime = Date.parse(new Date());
    const difference = endTime - currentTime;
  
    const total = Number.parseInt(difference / 1000, 10);
    const minutes = Number.parseInt((total / 60) % 60, 10);
    const seconds = Number.parseInt(total % 60, 10);
  
    return {
      total,
      minutes,
      seconds,
    };
}
  
function startTimer() {
    let { total } = timer.remainingTime;
    const endTime = Date.parse(new Date()) + total * 1000;
  
    mainButton.dataset.action = 'stop';
    mainButton.textContent = 'stop';
    mainButton.classList.add('active');
  
    interval = setInterval(function() {
      timer.remainingTime = getRemainingTime(endTime);
      updateTimer();
  
      total = timer.remainingTime.total;
      if (total <= 0) {
        clearInterval(interval);

        switch (timer.mode) {
          case 'study':
            switchMode('shortBreak');
            break;
          default:
            switchMode('study');
        }

        alarmSound.play();
        if (Notification.permission === 'granted') {
            const text =
              timer.mode === 'study' ? 'You have studied a while, take a break!' : 'Break is over, time to study!';
            new Notification(text);
        }
      }
    }, 1000);
}

function stopTimer(){
    clearInterval(interval);
    mainButton.dataset.action = 'start';
    mainButton.textContent = 'start';
    mainButton.classList.remove('active');
}

document.addEventListener('DOMContentLoaded', () => {
    // Check if the browser allows notifications
  if ('Notification' in window) {
    // If notification permissions have neither been granted or denied
    if (Notification.permission !== 'granted' && Notification.permission !== 'denied') {
      // ask the user for permission
      Notification.requestPermission().then(function(permission) {
        // If permission is granted
        if (permission === 'granted') {
          // Create a new notification
          new Notification(
            'Studybuddy: You will be notified at the start of each study/break session!'
          );
        }
      });
    }
  }
    switchMode('study');
});