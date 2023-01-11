var cal = {
    sMon : false, // week start on monday
    data : null, // events for selected period
    sDay : 0, sMth : 0, sYear : 0, // selected day month year
  
    months : [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ],
    days : ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"],

    hMth : null, hYear : null, // month/year selector
    hWrap : null, // calendar wrapper
    hFormWrap : null, hForm : null, // event form
    hfDate : null, hfTxt : null, hfDel : null, // form fields
  
    init : () => {
      cal.hMth = document.getElementById("calMonth");
      cal.hYear = document.getElementById("calYear");
      cal.hWrap = document.getElementById("calWrap");
      cal.hFormWrap = document.getElementById("calForm");
      cal.hForm = cal.hFormWrap.querySelector("form");
      cal.hfDate = document.getElementById("evtDate");
      cal.hfTxt = document.getElementById("evtTxt");
      cal.hfDel = document.getElementById("evtDel");
  
      // append month and year
      let now = new Date(), nowMth = now.getMonth();
      cal.hYear.value = parseInt(now.getFullYear());
      for (let i=0; i<12; i++) {
        let opt = document.createElement("option");
        opt.value = i;
        opt.innerHTML = cal.months[i];
        if (i==nowMth) { opt.selected = true; }
        cal.hMth.appendChild(opt);
      }

      cal.hMth.onchange = cal.draw;
      cal.hYear.onchange = cal.draw;
      cal.hForm.onsubmit = cal.save;
      document.getElementById("evtClose").onclick = () => cal.hFormWrap.close();
      cal.hfDel.onclick = cal.del;
  
      if (cal.sMon) { cal.days.push(cal.days.shift()); }
      cal.draw();
    },

    draw : () => {
      cal.sMth = parseInt(cal.hMth.value); // selected month
      cal.sYear = parseInt(cal.hYear.value); // selected year
      let daysInMth = new Date(cal.sYear, cal.sMth+1, 0).getDate(), // number of days in selected month
          startDay = new Date(cal.sYear, cal.sMth, 1).getDay(), // first day of the month
          endDay = new Date(cal.sYear, cal.sMth, daysInMth).getDay(), // last day of the month
          now = new Date(), // current date
          nowMth = now.getMonth(), // current month
          nowYear = parseInt(now.getFullYear()), // current year
          nowDay = cal.sMth==nowMth && cal.sYear==nowYear ? now.getDate() : null ;

      cal.data = localStorage.getItem("cal-" + cal.sMth + "-" + cal.sYear);
      if (cal.data==null) {
        localStorage.setItem("cal-" + cal.sMth + "-" + cal.sYear, "{}");
        cal.data = {};
      } else { cal.data = JSON.parse(cal.data); }

      let squares = [];
      if (cal.sMon && startDay != 1) {
        let blanks = startDay==0 ? 7 : startDay ;
        for (let i=1; i<blanks; i++) { squares.push("b"); }
      }
      if (!cal.sMon && startDay != 0) {
        for (let i=0; i<startDay; i++) { squares.push("b"); }
      }

      for (let i=1; i<=daysInMth; i++) { squares.push(i); }

      if (cal.sMon && endDay != 0) {
        let blanks = endDay==6 ? 1 : 7-endDay;
        for (let i=0; i<blanks; i++) { squares.push("b"); }
      }
      if (!cal.sMon && endDay != 6) {
        let blanks = endDay==0 ? 6 : 6-endDay;
        for (let i=0; i<blanks; i++) { squares.push("b"); }
      }

      cal.hWrap.innerHTML = `<div class="calHead"></div>
      <div class="calBody">
        <div class="calRow"></div>
      </div>`;
  
      wrap = cal.hWrap.querySelector(".calHead");
      for (let d of cal.days) {
        let cell = document.createElement("div");
        cell.className = "calCell";
        cell.innerHTML = d;
        wrap.appendChild(cell);
      }
      wrap = cal.hWrap.querySelector(".calBody");
      row = cal.hWrap.querySelector(".calRow");
      for (let i=0; i<squares.length; i++) {
        // Generate cell
        let cell = document.createElement("div");
        cell.className = "calCell";
        if (nowDay==squares[i]) { cell.classList.add("calToday"); }
        if (squares[i]=="b") { cell.classList.add("calBlank"); }
        else {
          cell.innerHTML = `<div class="cellDate">${squares[i]}</div>`;
          if (cal.data[squares[i]]) {
            cell.innerHTML += "<div class='evt'>" + cal.data[squares[i]] + "</div>";
          }
          cell.onclick = () => { cal.show(cell); };
        }
        row.appendChild(cell);
  
        // Next Row
        if (i!=(squares.length-1) && i!=0 && (i+1)%7==0) {
          row = document.createElement("div");
          row.className = "calRow";
          wrap.appendChild(row);
        }
      }
    },
  
    // Show event editor
    show : cell => {
      cal.hForm.reset();
      cal.sDay = cell.querySelector(".cellDate").innerHTML;
      cal.hfDate.value = `${cal.sDay} ${cal.months[cal.sMth]} ${cal.sYear}`;
      if (cal.data[cal.sDay] !== undefined) {
        cal.hfTxt.value = cal.data[cal.sDay];
        cal.hfDel.classList.remove("hide");
      } else { cal.hfDel.classList.add("hide"); }
      cal.hFormWrap.show();
    },
  
    // Save event
    save : () => {
      cal.data[cal.sDay] = cal.hfTxt.value;
      localStorage.setItem(`cal-${cal.sMth}-${cal.sYear}`, JSON.stringify(cal.data));
      cal.draw();
      cal.hFormWrap.close();
      return false;
    },
  
    // Delete event
    del : () => { if (confirm("Delete event?")) {
      delete cal.data[cal.sDay];
      localStorage.setItem(`cal-${cal.sMth}-${cal.sYear}`, JSON.stringify(cal.data));
      cal.draw();
      cal.hFormWrap.close();
    }}
  };
  window.onload = cal.init;