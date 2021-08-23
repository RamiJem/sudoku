import styles from './Cell.module.css'
import { useEffect, useState } from 'react'


export default function Cell ({ number, index, warning, setSudoku, solveActive, selectedCell, setSelectedCell }) {
    const [sudokuNumber, setSudokuNumber] = useState(number)
    useEffect(() => {
        setSudokuNumber(number.toString().slice(-1))
    }, [number])

    const solveModeForCell = (index, solveActive) => {
        setSudoku(prev => prev.map(sudokuCell => {
            if(sudokuCell['index']==index) {
                return {...sudokuCell, 'normal': solveActive}
            } else {
                return sudokuCell
            }
        }))
    }

    return <div   
                autoComplete="off"
                id={`cell${index+1}`}
                type="text" 
                value={isNaN(sudokuNumber) || sudokuNumber === '0' || sudokuNumber === 0 ? '' : sudokuNumber}
                className = {`${styles.cell} ${index === selectedCell ? styles.selected : ''} ${warning ? styles.warning : ''}`}
                onClick = {e => {
                    console.log('index: ', index, ' selected: ', selectedCell)
                    const input = document.getElementById('first-post')
                    input.focus()
                    solveModeForCell(index, solveActive)
                    setSelectedCell(index)
                }}
                >
                 {isNaN(sudokuNumber) || sudokuNumber === '0' || sudokuNumber === 0 ? '' : sudokuNumber}
            </div>
}