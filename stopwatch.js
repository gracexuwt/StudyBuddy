
let [milliseconds,seconds,minutes,hours] = [0,0,0,0];
let watch = document.querySelector('.watch');
let Interval;

const clis = new Audio('button-sound.mp3');

document.getElementById('sw-btn').addEventListener('click', ()=>{
    clis.play();
    if(Interval!==null){
        clearInterval(Interval);
    }
    Interval = setInterval(startWatch,10);
});

document.getElementById('sw-ps').addEventListener('click', ()=>{
    clis.play();
    clearInterval(Interval);
});

document.getElementById('sw-rst').addEventListener('click', ()=>{
    clis.play();
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