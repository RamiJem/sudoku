import db from '../db'
import styles from '../components/Layout.module.css'
import SudokuBoard from '../components/SudokuBoard'
import NumberPad from '../components/NumberPad'
import row from '../utils/row'
import col from '../utils/col'
import unit from '../utils/unit'
import conflict from '../utils/conflict'
import Calendar from '../components/Calendar'
// import { useRouter } from 'next/router'
import Head from 'next/head'


import { useState, useEffect } from 'react'

export default function Sudoku ({ sudokuProp }) {
    // console.log(sudokuProp)
    const initial = sudokuProp.puzzle
    const solution = sudokuProp.solution
    const [sudoku, setSudoku] = useState(sudokuProp.puzzle.split("").map((num, index) => ({
                                                        "number" : num === '.' ? 0 : parseInt(num),
                                                        "index": index,
                                                        "prefilled": num === '.' ? false : true,
                                                        "row": row(index),
                                                        "col": col(index),
                                                        "unit": unit(index),
                                                        "normal": true,
                                                        "warning": false,
                                                        "candidates": {1: false, 2: false, 3: false, 4: false, 5: false, 6: false, 7: false, 8: false, 9: false}
    })))
    // const router = useRouter()
    
    const [solved, setSolved] = useState(false)
    const [selectedCell, setSelectedCell] = useState(null)
    const [solveActive, setSolveActive] = useState(true)
    const [inputObject, setInputObject] = useState({"cell": null, "input": null})
    const [realLifeDate, setRealLifeDate] = useState(new Date())
    
    useEffect(() => {
        if(sudoku.reduce((acc, current) => acc + current.number, "") === solution) {
            setSelectedCell(null)
            setSolved(true)
        }  
    }, [sudoku])
   
    const [time, setTime] = useState({hours: "00", minutes: "00", seconds: "00"})
    let handle = null
    var totalSeconds = 0;
    function countTimer() {
        ++totalSeconds;
        var hour = Math.floor(totalSeconds /3600);
        var minute = Math.floor((totalSeconds - hour*3600)/60);
        var second = totalSeconds - (hour*3600 + minute*60);
        if(hour < 10)
            hour = "0"+hour;
        if(minute < 10)
            minute = "0"+minute;
        if(second < 10)
            second = "0"+second;
        setTime({hours: hour, minutes: minute, seconds: second})    
     }
    
    useEffect(() => {
        if(!solved){
            if (handle === null) {
                handle = setInterval(countTimer, 1000);
            } 
        }
        if(solved) {
            clearInterval(handle)
        }
        return () => clearInterval(handle);
    }, [solved])

    useEffect(() => {
        setSudoku(prev => prev.map(sudokuCell => {
            if(conflict(prev, sudokuCell.index)) {
                return {...sudokuCell, "warning": true}
            } else {
                return {...sudokuCell, "warning": false}
            }
        }))
    }, [inputObject])

    // useEffect(() => {
    //   setRealLifeDate(new Date())
    //   setTime({hours: "00", minutes: "00", seconds: "00"})
    
    //   console.log('newPage')
    // }, [router.asPath])

    const putNumberInCell = (cell, input) => {
        // Just access using index? No need for find
        const normalMode = sudoku.find(sudokuCell => sudokuCell.index == cell).normal
        if(normalMode) {
            setInputObject({'cell': cell, 'input': input})
            setSudoku(prev => prev.map(sudokuCell => {
                if(sudokuCell.index == cell) {
                    return {...sudokuCell, "number": input}
                } else {
                    return sudokuCell
                }
            }))
        } else {
            setSudoku(prev => prev.map(sudokuCell => {
                if (sudokuCell.index == cell) {
                    return {...sudokuCell, "candidates": {...sudokuCell.candidates, [input]: !sudokuCell.candidates[input]}}
                } else {
                    return sudokuCell
                }
            }))
        }
    }

    const onKeyPressed = (e) => {
        const parsedInput = parseInt(e.key)

        if(e.keyCode==8) {
            setInputObject({...inputObject, "input": "remove"})
            setSudoku(prev => prev.map(sudokuCell => {
                if (sudokuCell.index == selectedCell) {
                    return {...sudokuCell, "number": 0}
                } else {
                    return sudokuCell
                }
        }))}
        if(!parsedInput == 0 && Number.isInteger(parsedInput)) {
            putNumberInCell(selectedCell, parsedInput)
        }
    }

    const checkCell = () => {
        // Put selection back to selected cell. Now goes to button after clicking.
        setSudoku(prev => prev.map((sudokuCell, index) => {
            if(index === selectedCell) {
                if (sudoku[selectedCell].number === parseInt(solution[selectedCell])) {
                    return {...sudokuCell, "warning": false}
                } else {
                    return {...sudokuCell, "warning": true}
                }
            } else {
                return {...sudokuCell, "warning": false}
            }
        }))
    }
    const checkAllCells = () => {
        // Put selection back to selected cell. Now goes to button after clicking.
        setSudoku(prev => prev.map((sudokuCell, index) => {
            if(sudokuCell.number !== 0) {
                if (sudokuCell.number === parseInt(solution[index])) {             
                    return {...sudokuCell, "warning": false}
                } else {
                    // console.log('warning: ', sudokuCell.number, )
                    return {...sudokuCell, "warning": true}
                }
            } else {
                return {...sudokuCell, "warning": false}
            }
        }))
    }

    return <div>
        {/* <div className={styles.timeAndSettings}> */}
        <Head>
          <title>Daily sudoku: {sudokuProp.date}</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
          <meta name="description" content="A daily sudoku puzzle. You'll also find an archive of older sudoku puzzles going back to January 1, 2021."/>
        </Head>
        <div className={styles.help}> 
            Check: 
            <button className={styles.checkButton}
                    onClick={checkCell}>
               Selected Cell
            </button>
            <button className={styles.checkButton}
                    onClick={checkAllCells}>
                All Cells
            </button>
        </div>
        <div className={styles.timeAndSettings}>{time.hours + ':' + time.minutes +':' + time.seconds}</div >
        <h1>{handle}</h1>
            <div className={styles.layout}
                id="first-post"
                onKeyDown={onKeyPressed}
                tabIndex={0}>
                    <SudokuBoard sudoku={sudoku}
                                    setSudoku={setSudoku}
                                    solveActive={solveActive}
                                    solved={solved}
                                    selectedCell={selectedCell}
                                    setSelectedCell={setSelectedCell} />
                    <NumberPad   sudoku={sudoku}
                                setInputObject={setInputObject}
                                setSudoku={setSudoku}
                                selectedCell={selectedCell}
                                solveActive={solveActive}
                                setSolveActive={setSolveActive} />
            </div>
            <Calendar sudokuDate={new Date(sudokuProp.date)} realLifeDate={realLifeDate} />
        </div>
}


export async function getStaticProps (req) {

  const params = {
    TableName: 'Sudoku',
    Key: {
      date: req.params.id
    }
  };

  let sudoku
  try {
     sudoku = await db.get(params).promise()
  } catch(err) {
    console.log(err)
  }

  return {
    props: {
      sudokuProp: sudoku.Item
    }
  }
}

export async function getStaticPaths(req) {
  const params = {
    TableName: "Sudoku",
  };
  const scanResults = [];
  let items;
  do{
       items =  await db.scan(params).promise();
       items.Items.forEach((item) => scanResults.push(item));
       params.ExclusiveStartKey  = items.LastEvaluatedKey;
  }while(typeof items.LastEvaluatedKey !== "undefined");
  
  const paths = scanResults.map(sudoku => ({params: {id: sudoku.date}}))

  return {
    paths,
    fallback: "blocking"
    // fallback: true,
  }
}