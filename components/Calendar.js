
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import db from '../db'
import { useState, useEffect } from 'react'
import Link from 'next/link'
 
const monthNameToNumber = {'Jan' : '01', 'Feb': '02', 'Mar': '03', 'Apr': '04', 'May': '05', 'Jun': '06', 'Jul': '07', 'Aug': '08', 'Sep': '09', 'Oct': '10', 'Nov': '11', 'Dec': '12'}

function dateToString (day) {
  return day.toUTCString().slice(12, 16) + '-' + monthNameToNumber[day.toUTCString().slice(8,11)] + '-' + day.toUTCString().slice(5,7)
}

// function stringToDate (dayString) {
//   const year = dayString.slice(0, 4)
//   const month = parseInt(dayString.slice(5,7)) -1
//   const date = parseInt(dayString.slice(8, 10))
//   return new Date(Date.UTC(year, month, date))
// }
function DateComponent ({date, done, notAvailable, current}) {
  if (date.slice(8,10).startsWith('0')) {
    return <div ><a href={`/${date}`} className={`${styles.date} ${done ? styles.yesDone : styles.notDone} ${notAvailable ? styles.notAvailable : ''} ${current ? styles.activeDate : ''}`}>{date.slice(9,10)}.</a></div>
  } else {
    return <div ><a href={`/${date}`} className={`${styles.date} ${done ? styles.yesDone : styles.notDone} ${notAvailable ? styles.notAvailable : ''} ${current ? styles.activeDate : ''}`}>{date.slice(8,10)}.</a></div>
  }
// if (date.slice(8,10).startsWith('0')) {
//     return <Link href={`/${date}`}><a className={`${styles.date} ${done ? styles.yesDone : styles.notDone} ${notAvailable ? styles.notAvailable : ''} ${current ? styles.activeDate : ''}`}>{date.slice(9,10)}.</a></Link>
//   } else {
//     return <Link href={`/${date}`}><a className={`${styles.date} ${done ? styles.yesDone : styles.notDone} ${notAvailable ? styles.notAvailable : ''} ${current ? styles.activeDate : ''}`}>{date.slice(8,10)}.</a></Link>
//   }
}

// function unpublishedDateComponent ({date}) {
//   if (date.slice(8,10).startsWith('0')) {
//     return <div className={styles.unpublishedDate}>{date.slice(9,10)}.</div>
//   } else {
//     return <div className={styles.unpublishedDate}>{date.slice(8,10)}.</div>
//   }
// }
export default function Calendar ({sudokuDate, realLifeDate}) {
  // list of dates in month
  const dates = calendar(sudokuDate, realLifeDate) 
  //const dateCopy = new Date(day)
  return <>
        <div style={{width: "90vw", borderBottom: "solid black 1px", padding: "0px", margin: "0px", marginLeft: "5vw"}}>
          <h1 style={{marginLeft: "0px", marginBottom: "3px"}}>{sudokuDate.getUTCFullYear() + ', ' + numberToMonth(sudokuDate)}</h1>
        </div>
        <div className={styles.calendar}>
        {dates.wholeMonth.map(date => {                  
                      const available = dates.smallerDaysInMonth.includes(date)
                      return <DateComponent key={date} current={dateToString(sudokuDate)==date} date={date} done={true} notAvailable={!available}/>})}
        </div>
      </>
}

function numberToMonth(day) {
  const  months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
  const number = day.getUTCMonth()
  return months[number]
}

function calendar (sudokuDate, realLifeDate) {
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

