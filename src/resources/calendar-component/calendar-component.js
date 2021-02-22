// https://codepen.io/xmark/pen/WQaXdv

export class CalendarComponent {

  //Store div id
  divId;
  htmlCalendar;
  // Days of week, starting on Sunday
  DaysOfWeek = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];

  // Months, stating on January
  Months = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro"
  ];

  // Set the current month, year
  currMonth = new Date().getMonth();
  currYear = new Date().getFullYear();
  currDay = new Date().getDate();
  

  attached() {
    console.log(this.divId);
    this.showcurr();
  }
  
  // Goes to next month
  nextMonth() {
    if (this.currMonth == 11) {
      this.currMonth = 0;
      this.currYear = this.currYear + 1;
    } else {
      this.currMonth = this.currMonth + 1;
    }
    this.showcurr();
  };
  
  // Goes to previous month
  previousMonth() {
    if (this.currMonth == 0) {
      this.currMonth = 11;
      this.currYear = this.currYear - 1;
    } else {
      this.currMonth = this.currMonth - 1;
    }
    this.showcurr();
  };
  
  // Show current month
  showcurr() {
    this.showMonth(this.currYear, this.currMonth);
  };
  
  // Show month (year, month)
  showMonth(y, m) {
    // let d = new Date();

    // First day of the week in the selected month
    let firstDayOfMonth = new Date(y, m, 1).getDay();
    // Last day of the selected month
    let lastDateOfMonth = new Date(y, m + 1, 0).getDate();
    // Last day of the previous month
    let lastDayOfLastMonth = m == 0 ? new Date(y - 1, 11, 0).getDate() : new Date(y, m, 0).getDate();
  
    let html = "<table>";
  
    // Write selected month and year
    html += "<thead><tr>";
    html += '<td colspan="7">' + this.Months[m] + " " + y + "</td>";
    html += "</tr></thead>";
  
    // Write the header of the days of the week
    html += '<tr class="days">';
    for (let i = 0; i < this.DaysOfWeek.length; i++) {
      html += "<td>" + this.DaysOfWeek[i] + "</td>";
    }
    html += "</tr>";
  
    // Write the days
    let i = 1;
    do {
      let dow = new Date(y, m, i).getDay();
  
      // If Sunday, start new row
      if (dow == 0) {
        html += "<tr>";
      }
      // If not Sunday but first day of the month
      // it will write the last days from the previous month
      else if (i == 1) {
        html += "<tr>";
        let k = lastDayOfLastMonth - firstDayOfMonth + 1;
        for (let j = 0; j < firstDayOfMonth; j++) {
          html += '<td class="not-current">' + k + "</td>";
          k++;
        }
      }
  
      // Write the current day in the loop
      let chk = new Date();
      let chkY = chk.getFullYear();
      let chkM = chk.getMonth();
      if (chkY == this.currYear && chkM == this.currMonth && i == this.currDay) {
        html += '<td class="today">' + i + "</td>";
      } else {
        html += '<td class="normal">' + i + "</td>";
      }
      // If Saturday, closes the row
      if (dow == 6) {
        html += "</tr>";
      }
      // If not Saturday, but last day of the selected month
      // it will write the next few days from the next month
      else if (i == lastDateOfMonth) {
        let k = 1;
        for (dow; dow < 6; dow++) {
          html += '<td class="not-current">' + k + "</td>";
          k++;
        }
      }
  
      i++;
    } while (i <= lastDateOfMonth);
  
    // Closes table
    html += "</table>";

    this.htmlCalendar = html;
  
    // Write HTML to the div
    // document.getElementById(this.divId).innerHTML = html;
  };
    
  // // Get element by id
  // getId(id) {
  //   return document.getElementById(id);
  // }
  
}
