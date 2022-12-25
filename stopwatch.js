const timer = 0;
const clickSound = new Audio('button-sound.mp3');

let interval;

const mainButton = document.getElementById('sw-btn');
mainButton.addEventListener('click', () => {
    clickSound.play();
    const { action } = mainButton.dataset;
    if (action === 'startWatch') {
        startWatch();
    }
    else{
        pauseWatch();
    }
});
document.getElementById('sw-rst').addEventListener('click', ()=>{
    clickSound.play();
    clearInterval(interval);
    timer = 0;
});

function updateWatch() {
    const { remainingTime } = timer;
    const hours = `${remainingTime.hours}`.padStart(2, '0')
    const minutes = `${remainingTime.minutes}`.padStart(2, '0');
    const seconds = `${remainingTime.seconds}`.padStart(2, '0');
  
    const hs = document.getElementById('sw-hours');
    const min = document.getElementById('sw-minutes');
    const sec = document.getElementById('sw-seconds');
    hs.textContent = hours;
    min.textContent = minutes;
    sec.textContent = seconds;
}

function startWatch() {
    let { total } = timer.remainingTime;
    const endTime = Date.parse(new Date()) + total * 1000;
  
    mainButton.dataset.action = 'stop';
    mainButton.textContent = 'pause';
    mainButton.classList.add('active');
  
    interval = setInterval(function() {
      timer.remainingTime = getTime(endTime);
      updateWatch();
  
      total = timer.remainingTime.total;
    }, 1000);
}

function pauseWatch(){
    clearInterval(interval);
    mainButton.dataset.action = 'startWatch';
    mainButton.textContent = 'startWatch';
    mainButton.classList.remove('active');
}

function getTime(endTime) {
    const currentTime = Date.parse(new Date());
    const difference = currentTime - endTime;
  
    const total = Number.parseInt(difference / 1000, 10);
    const hours = Number.parseInt(total % 3600, 10);
    const minutes = Number.parseInt((total / 60) % 60, 10);
    const seconds = Number.parseInt(total % 60, 10);
  
    return {
      total,
      hours,
      minutes,
      seconds,
    };
}