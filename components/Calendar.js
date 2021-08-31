
// import Head from 'next/head'
// import db from '../db'
// import { useState, useEffect } from 'react'
// import Link from 'next/link'

// import styles from '../styles/Home.module.css'
import styles from './Calendar.module.css'
import { dateToString, numberToMonth, calendar } from '../utils/dates'
 

function DateComponent ({date, done, notAvailable, current}) {
  if (date.slice(8,10).startsWith('0')) {
    return <div ><a href={`/${date}`} className={`${styles.date} ${done ? styles.yesDone : styles.notDone} ${notAvailable ? styles.notAvailable : ''} ${current ? styles.activeDate : ''}`}>{date.slice(9,10)}.</a></div>
  } else {
    return <div ><a href={`/${date}`} className={`${styles.date} ${done ? styles.yesDone : styles.notDone} ${notAvailable ? styles.notAvailable : ''} ${current ? styles.activeDate : ''}`}>{date.slice(8,10)}.</a></div>
  }
}

// function unpublishedDateComponent ({date}) {
//   if (date.slice(8,10).startsWith('0')) {
//     return <div className={styles.unpublishedDate}>{date.slice(9,10)}.</div>
//   } else {
//     return <div className={styles.unpublishedDate}>{date.slice(8,10)}.</div>
export default function Calendar ({sudokuDate, realLifeDate}) {
  const dates = calendar(sudokuDate, realLifeDate) 
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