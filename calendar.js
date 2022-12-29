const currentDate = document.querySelector(".current-date");

let date = new Date(),
currentYear = date.getFullYear(),
currentMonth = date.getMonth();

const months = ["January","February","March","April","May","June","July",
                "August","September","October","November","December"];
 
const renderCalendar = () =>{
    currentDate.innerText = `${months[currentMonth]} ${currentYear}`;
}
renderCalendar();