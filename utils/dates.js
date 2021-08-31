const monthNameToNumber = {'Jan' : '01', 'Feb': '02', 'Mar': '03', 'Apr': '04', 'May': '05', 'Jun': '06', 'Jul': '07', 'Aug': '08', 'Sep': '09', 'Oct': '10', 'Nov': '11', 'Dec': '12'}


export function dateToString (day) {
    return day.toUTCString().slice(12, 16) + '-' + monthNameToNumber[day.toUTCString().slice(8,11)] + '-' + day.toUTCString().slice(5,7)
}

export function numberToMonth(day) {
    const  months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    const number = day.getUTCMonth()
    return months[number]
  }

export function calendar (sudokuDate, realLifeDate) {
    //   let dayCopy1 = new Date(sudokuDate)
    //   let dayCopy2 = new Date(sudokuDate)
    
    //   let dayCopy1 = new Date(sudokuDate)
    
      const monthName = sudokuDate.toUTCString().slice(8,11)
      const yearMonth = sudokuDate.toUTCString().slice(12, 16) + '-' + monthNameToNumber[monthName]
      const smallerList = []
      const firstDayOfMonth = yearMonth+"-01"
      let dayCopy2 = new Date(firstDayOfMonth)
      while (dateToString(dayCopy2).includes(yearMonth) && dayCopy2 <= realLifeDate) {    
              const dateString = dateToString(dayCopy2)  
              // if(dateString !== dateToString(day)) {smallerList.push(dateString)}
              smallerList.push(dateString)
              dayCopy2.setUTCDate(dayCopy2.getUTCDate() + 1)
      }
      smallerList.reverse()
      const wholeMonthList = []
      while (dateToString(dayCopy2).includes(yearMonth)) {
        const dateString = dateToString(dayCopy2)  
        if(dateString !== dateToString(sudokuDate)) {wholeMonthList.push(dateString)}
        // wholeMonthList.push(dateString)
        // Increment day
        dayCopy2.setUTCDate(dayCopy2.getUTCDate() + 1)
      }
    //   while (dateToString(dayCopy2).includes(yearMonth)) {    
    //           const dateString = dateToString(dayCopy2)  
    //           // if(dateString !== dateToString(day)) {smallerList.push(dateString)}
    //           smallerList.push(dateString)
    //           dayCopy2.setUTCDate(dayCopy2.getUTCDate() - 1)
    //   }
     
    //   const wholeMonthList = []
    //   while (dateToString(dayCopy1).includes(yearMonth)) {
    //     const dateString = dateToString(dayCopy1)  
    //     if(dateString !== dateToString(sudokuDate)) {wholeMonthList.push(dateString)}
    //     // wholeMonthList.push(dateString)
    //     // Increment day
    //     dayCopy1.setUTCDate(dayCopy1.getUTCDate() + 1)
    //   }
      wholeMonthList.reverse()
      wholeMonthList.push(...smallerList)
      wholeMonthList.reverse()
      return {'smallerDaysInMonth': smallerList, 'wholeMonth': wholeMonthList}
    }