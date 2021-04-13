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

import { bindable } from 'aurelia-framework'

export class CalendarComponent {
  @bindable config
  disablePrev = false
  disableNext = false
  selectedDay = {}
  daysOfWeek = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"]
  monthsList = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]

  // Set the current month, year
  currMonth = new Date().getMonth()
  currYear = new Date().getFullYear()
  currDay = new Date().getDate()

  constructor() {
    this.showcurr()
  }

  attached() {
    console.log(this.config)
    this.firstMonth = this.config.inicio.getMonth()
    this.lastMonth = this.config.termino.getMonth()
    console.log(this.firstMonth)
    console.log(this.lastMonth)
  }

  showcurr() {
    this.showMonth(this.currYear, this.currMonth)
  }

  showMonth(y, m) {
    this.monthYearString = `${this.monthsList[m]} ${y}`
    let firstDayOfMonth = new Date(y, m, 1).getDay()
    let lastDateOfMonth = new Date(y, m + 1, 0).getDate()
    let lastDayOfLastMonth = m == 0 ? new Date(y - 1, 11, 0).getDate() : new Date(y, m, 0).getDate()

    this.calendarRows = []
    this.lastMonthDays = []
    this.nextMonthDays = []
    let newWeek = []

    for (let index = 1; index <= lastDateOfMonth; index++) {
      let newDay = {}
      newDay.month = m
      newDay.year = y
      newDay.appointments = 0
      newDay.classes = ""

      let dayOfWeek = new Date(y, m, index).getDay()  
      // If Sunday, start new row
      if (dayOfWeek == 0) {
        newWeek = []
      }
      // If not Sunday but first day of the month
      // it will write the last days from the previous month
      else if (index == 1) {
        let k = lastDayOfLastMonth - firstDayOfMonth + 1
        for (let j = 0; j < firstDayOfMonth; j++) {
          newDay = {}
          newDay.month = "prev"
          newDay.year = y
          newDay.appointments = 0
          newDay.classes = ""
          newDay.classes += "not-current"
          newDay.day = k
          newDay.date = new Date(this.setPrevMonth(m,y)[1], this.setPrevMonth(m,y)[0], k)
          this.lastMonthDays.push(newDay)
          k++
        }
      }
  
      newDay = {}
      newDay.month = m
      newDay.year = y
      newDay.appointments = 0
      newDay.classes = ""

      // Write the current day in the loop
      let chk = new Date()
      let chkY = chk.getFullYear()
      let chkM = chk.getMonth()
      if (chkY == this.currYear && chkM == this.currMonth && index == this.currDay) {
        newDay.classes += "today"
        newDay.day = index
        newDay.date = new Date(y, m, index)
        newWeek.push(newDay)
      } else {
        newDay.classes += "normal"
        newDay.day = index
        newDay.date = new Date(y, m, index)

        if (index === 5) newDay.classes += " status-1"
        if (index === 8) newDay.classes += " status-2"
        if (index === 15) newDay.classes += " status-3"
        if (index === 20) newDay.classes += " status-4"
        if (index === 23) newDay.classes += " status-5"

        if (index === 14) newDay.appointments = 5
        if (index === 17) newDay.appointments = 2

        newWeek.push(newDay)
      }
      // If Saturday, closes the row
      if (dayOfWeek == 6) {
        this.calendarRows.push(newWeek)
      }
      
      // If not Saturday, but last day of the selected month
      // it will write the next few days from the next month
      else if (index == lastDateOfMonth) {
        let k = 1
        for (dayOfWeek; dayOfWeek < 6; dayOfWeek++) {
          let newDay = {}
          newDay.month = "next"
          newDay.year = y
          newDay.appointments = 0
          newDay.classes = ""
          newDay.classes += "not-current"
          newDay.day = k
          newDay.date = new Date(this.setNextMonth(m,y)[1], this.setNextMonth(m,y)[0], k)
          this.nextMonthDays.push(newDay)
          k++
        }
      }
    }

    this.calendarRows.push(newWeek)    
    let newfirstRow = this.lastMonthDays.concat(this.calendarRows[0])
    let newlastRow = this.calendarRows[this.calendarRows.length - 1].concat(this.nextMonthDays)
    this.calendarRows[0] = newfirstRow
    this.calendarRows[this.calendarRows.length - 1] = newlastRow
    
    this.fillDaysSettings()
  }

  fillDaysSettings() {
    this.calendarRows.forEach(row => {
      for (let index = 0; index < row.length; index++) {
        const day = row[index];
        // console.log(day)
        // aqui vc faz acontecer
      }
    })
  }
  
  nextMonth() {
    if (this.currMonth == 11) {
      this.currMonth = 0
      this.currYear = this.currYear + 1
    } else {
      this.currMonth = this.currMonth + 1
    }
    this.showcurr()
    this.checkNavButtons();
  }
  
  previousMonth() {
    if (this.currMonth == 0) {
      this.currMonth = 11
      this.currYear = this.currYear - 1
    } else {
      this.currMonth = this.currMonth - 1
    }
    this.showcurr()
    this.checkNavButtons();
  }
  
  checkNavButtons() {
    this.disablePrev = (this.currMonth === this.firstMonth) ? true : false
    this.disableNext = (this.currMonth === this.lastMonth) ? true : false
  }

  setNextMonth(currentMonth, currentYear) {
    let m,y
    if (currentMonth == 11) {
      m = 0
      y = currentYear + 1
    } else {
      m = currentMonth + 1
      y = currentYear
    }
    return [m,y]
  }

  setPrevMonth(currentMonth, currentYear) {
    let m,y
    if (currentMonth == 0) {
      m = 11
      y = currentYear - 1
    } else {
      m = currentMonth - 1
      y = currentYear
    }
    return [m,y]
  }

  onSelectDay(day) {
    this.selectedDay = day
    console.log(this.selectedDay)
  }
}
