const currentDate = document.querySelector(".current-date");
const daysTag = document.querySelector(".days");
const prevNext = document.querySelectorAll(".icons span");

let date = new Date(),
currentYear = date.getFullYear(),
currentMonth = date.getMonth();

const months = ["January","February","March","April","May","June","July",
                "August","September","October","November","December"];
 
const renderCalendar = () =>{
    //Get first day of the current month
    let firstDayofMonth = new Date(currentYear,currentMonth,1).getDay(),
    //Get last date of current month
    lastDateofMonth = new Date(currentYear,currentMonth+1,0).getDate(),
    //Get last day of the month
    lastDayofMonth = new Date(currentYear,currentMonth,lastDateofMonth).getDay(),
    //Get last date of previous month
    lastDateofPrevMonth = new Date(currentYear,currentMonth,0).getDate();

    let liTag = "";

    for (let i=firstDayofMonth; i>0; i--){
        liTag += `<li class="inactive">${lastDateofPrevMonth - i + 1}</li>`;
    }

    for(let i=1; i<= lastDateofMonth; i++){
        let isToday = i === date.getDate() && currentMonth === new Date().getMonth()
                    && currentYear === new Date().getFullYear() ? "active" : "";
        liTag += `<li class="${isToday}">${i}</li>`;
    }

    for(let i=lastDayofMonth; i<6; i++){
        liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`;
    }
    currentDate.innerText = `${months[currentMonth]} ${currentYear}`
    daysTag.innerHTML = liTag;
} 
renderCalendar();

prevNext.forEach(icon => {
    icon.addEventListener("click", () => {
        currentMonth = icon.id === "prev" ? currentMonth - 1 : currentMonth + 1;

        if(currentMonth < 0 || currentMonth > 11){ //prev year or next year
            date = new Date(currentYear,currentMonth);
            currentYear = date.getFullYear();
            currentMonth = date.getMonth();
        }else{
            date = new Date();
        }
        renderCalendar();
    });
});