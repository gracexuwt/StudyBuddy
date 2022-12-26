
let [milliseconds,seconds,minutes,hours] = [0,0,0,0];
let watch = document.querySelector('.watch');
let Interval;

const mButton = document.getElementById('sw-btn');
const clis = new Audio('button-sound.mp3');

mButton.addEventListener('click', ()=>{
    clis.play();
    const { action } = mButton.dataset;
    if (action === 'start') {
        mButton.dataset.action = 'stop';
        mButton.textContent = 'pause';
        mButton.classList.add('active'); 
        if(Interval!==null){
            clearInterval(Interval);
        }
        Interval = setInterval(startWatch,10);
    }
    else{
        clearInterval(Interval);
        mButton.dataset.action = 'start';
        mButton.textContent = 'start';
        mButton.classList.add('active');   
    }
    
});

document.getElementById('sw-rst').addEventListener('click', ()=>{
    clis.play();
    const { action1 } = mButton.dataset;
    if (action1 !== 'start') {
        mButton.dataset.action = 'start';
        mButton.textContent = 'start';
        mButton.classList.add('active');  
    }
    clearInterval(Interval);
    [milliseconds,seconds,minutes,hours] = [0,0,0,0];
    watch.innerHTML = '00:00:00';
});

function startWatch(){
    milliseconds+=10;
    if(milliseconds == 1000){
        milliseconds = 0;
        seconds++;
        if(seconds == 60){
            seconds = 0;
            minutes++;
            if(minutes == 60){
                minutes = 0;
                hours++;
            }
        }
    }

 let hrs = hours < 10 ? "0" + hours : hours; // If 0-9 return "0" + hours, if >=10 then return hours
 let min = minutes < 10 ? "0" + minutes : minutes;
 let sec = seconds < 10 ? "0" + seconds : seconds;

 watch.innerHTML = ` ${hrs}:${min}:${sec} `;
}