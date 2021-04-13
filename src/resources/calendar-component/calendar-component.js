// https://preview.keenthemes.com/metronic/demo1/index.html
// {
//   inicio:16/07/1982,
//   termino:16/10/1982,
//   dias:[
//       data:{dia:20/07/1982, tipo:1, habilitado:false},
//       data:{dia:21/07/1982, tipo:1, habilitado:false},
//       data:{dia:22/07/1982, tipo:1, habilitado:false}
//        ]
//   }
  
//   1 - legenda
//   2 - navegacao dos meses
//   3 - desabilitar o dia tem aparecer
//   4 - ao clicar abre alguma coisa 
//   5 - nao deixar os meses voltarem ou irem alem das datas.

export class CalendarComponent {
  selectedDay = {}
  daysOfWeek = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];
  monthsList = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

  // Set the current month, year
  currMonth = new Date().getMonth();
  currYear = new Date().getFullYear();
  currDay = new Date().getDate();

  constructor() {
    this.showcurr();
  }

  showcurr() {
    this.showMonth(this.currYear, this.currMonth);
  };

  showMonth(y, m) {
    this.monthYearString = `${this.monthsList[m]} ${y}`
    let firstDayOfMonth = new Date(y, m, 1).getDay();
    let lastDateOfMonth = new Date(y, m + 1, 0).getDate();
    let lastDayOfLastMonth = m == 0 ? new Date(y - 1, 11, 0).getDate() : new Date(y, m, 0).getDate();

    this.calendarRows = []
    this.lastMonthDays = []
    this.nextMonthDays = []
    let newWeek = []

    for (let index = 1; index <= lastDateOfMonth; index++) {
      let newDay = {}
      newDay.month = m;
      newDay.year = y;
      newDay.classes = ""

      let dayOfWeek = new Date(y, m, index).getDay();  
      // If Sunday, start new row
      if (dayOfWeek == 0) {
        newWeek = []
      }
      // If not Sunday but first day of the month
      // it will write the last days from the previous month
      else if (index == 1) {
        let k = lastDayOfLastMonth - firstDayOfMonth + 1;
        for (let j = 0; j < firstDayOfMonth; j++) {
          newDay = {}
          console.log(k)
          newDay.day = k
          newDay.month = "prev"
          newDay.year = y
          newDay.classes = ""
          newDay.classes += "not-current"
          this.lastMonthDays.push(newDay)
          k++;
        }
      }
  
      newDay = {}
      newDay.month = m;
      newDay.year = y;
      newDay.classes = ""

      // Write the current day in the loop
      let chk = new Date();
      let chkY = chk.getFullYear();
      let chkM = chk.getMonth();
      if (chkY == this.currYear && chkM == this.currMonth && index == this.currDay) {
        newDay.day = index
        newDay.classes += "today"
        newWeek.push(newDay)
      } else {
        newDay.day = index
        newDay.classes += "normal"

        if (index === 5)  newDay.classes += " status-1"
        if (index === 8)  newDay.classes += " status-2"
        if (index === 15)  newDay.classes += " status-3"
        if (index === 20)  newDay.classes += " status-4"
        if (index === 23)  newDay.classes += " status-5"

        newWeek.push(newDay)
      }
      // If Saturday, closes the row
      if (dayOfWeek == 6) {
        this.calendarRows.push(newWeek)
      }
      
      // If not Saturday, but last day of the selected month
      // it will write the next few days from the next month
      else if (index == lastDateOfMonth) {
        let k = 1;
        for (dayOfWeek; dayOfWeek < 6; dayOfWeek++) {
          let newDay = {}
          newDay.month = "next"
          newDay.year = y;
          newDay.day = k
          newDay.classes = ""
          newDay.classes += "not-current"
          this.nextMonthDays.push(newDay)
          k++;
        }
      }
    }

    console.log(this.lastMonthDays)

    this.calendarRows.push(newWeek)    
    let newfirstRow = this.lastMonthDays.concat(this.calendarRows[0])
    let newlastRow = this.calendarRows[this.calendarRows.length - 1].concat(this.nextMonthDays)
    this.calendarRows[0] = newfirstRow
    this.calendarRows[this.calendarRows.length - 1] = newlastRow
    console.log("calendarRows", this.calendarRows)
  };
  
  nextMonth() {
    if (this.currMonth == 11) {
      this.currMonth = 0;
      this.currYear = this.currYear + 1;
    } else {
      this.currMonth = this.currMonth + 1;
    }
    this.showcurr();
  };
  
  previousMonth() {
    if (this.currMonth == 0) {
      this.currMonth = 11;
      this.currYear = this.currYear - 1;
    } else {
      this.currMonth = this.currMonth - 1;
    }
    this.showcurr();
  };

  onSelectDay(day) {
    this.selectedDay = day
    console.log(this.selectedDay)
  }
}
