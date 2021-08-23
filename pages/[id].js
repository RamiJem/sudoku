import db from '../db'
import styles from '../components/Layout.module.css'
import SudokuBoard from '../components/SudokuBoard'
import NumberPad from '../components/NumberPad'
import row from '../utils/row'
import col from '../utils/col'
import unit from '../utils/unit'
import conflict from '../utils/conflict'


import { useState, useEffect } from 'react'

export default function Sudoku ({ sudokuProp }) {
   console.log(sudokuProp)
    const initial = sudokuProp.puzzle
    const solution = sudokuProp.solution
    const [sudoku, setSudoku] = useState(initial.split("").map((num, index) => ({
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
    const [solved, setSolved] = useState(false)
    const [selectedCell, setSelectedCell] = useState(null)
    const [solveActive, setSolveActive] = useState(true)
    const [inputObject, setInputObject] = useState({"cell": null, "input": null})
    
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
        // console.log('handle: ', handle)
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

    return <div>
        {/* <div className={styles.timeAndSettings}> */}
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
  console.log('paths: ', paths)
  return {
    paths,
    fallback: false
    // fallback: true,
  }
}