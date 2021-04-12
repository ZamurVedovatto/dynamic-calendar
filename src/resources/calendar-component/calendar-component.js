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

// https://codepen.io/xmark/pen/WQaXdv

export class CalendarComponent {


  // Days of week, starting on Sunday
  daysOfWeek = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];

  // monthsList, stating on January
  monthsList = [
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
  
    this.rowsDays = "";


    // Write the days
    let i = 1;
    do {
      let dow = new Date(y, m, i).getDay();
  
      // If Sunday, start new row
      if (dow == 0) {
        this.rowsDays += "<tr>";        
      }
      // If not Sunday but first day of the month
      // it will write the last days from the previous month
      else if (i == 1) {
        this.rowsDays += "<tr>";
        let k = lastDayOfLastMonth - firstDayOfMonth + 1;
        for (let j = 0; j < firstDayOfMonth; j++) {
          this.rowsDays += '<td class="not-current">' + k + "</td>";
          k++;
        }
      }
  
      // Write the current day in the loop
      let chk = new Date();
      let chkY = chk.getFullYear();
      let chkM = chk.getMonth();
      if (chkY == this.currYear && chkM == this.currMonth && i == this.currDay) {
        this.rowsDays += '<td class="today">' + i + "</td>";
      } else {
        this.rowsDays += '<td class="normal">' + i + "</td>";
      }
      // If Saturday, closes the row
      if (dow == 6) {
        this.rowsDays += "</tr>";
      }
      
      // If not Saturday, but last day of the selected month
      // it will write the next few days from the next month
      else if (i == lastDateOfMonth) {
        let k = 1;
        for (dow; dow < 6; dow++) {
          this.rowsDays += '<td class="not-current">' + k + "</td>";
          k++;
        }
      }
      i++;
    } while (i <= lastDateOfMonth);
  
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
}
