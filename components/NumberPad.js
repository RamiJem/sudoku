import styles from './NumberPad.module.css'

export default function NumberPad({ selectedCell, setInputObject,
                                    setSudoku, sudoku, solveActive, setSolveActive}) {
    return <div>
                <div className={styles.solveAndCandidate}>
                    <div className={`${styles.number} ${solveActive ? styles.selected : ''}`}
                         onClick={() => {
                             setSolveActive(true)
                             setSudoku(prev => prev.map(sudokuObject => {
                                 if(sudokuObject.index === selectedCell) {
                                     return {...sudokuObject, 'normal': true}
                                 } else {
                                     return sudokuObject
                                 }
                             }))
                         }}>
                             Normal
                         </div>
                    <div className={`${styles.number} ${!solveActive ? styles.selected : ''}`}
                         onClick={() => {
                             setSolveActive(false)
                             setSudoku(prev => prev.map(sudokuObject => {
                                 if(sudokuObject.index === selectedCell) {
                                     return {...sudokuObject, 'normal': false}
                                 } else {
                                     return sudokuObject
                                 }
                             }))
                         }}>
                             Candidates
                    </div>
                </div>
                <div className={styles.grid}>
                {'123456789'.split('').map(number => <div
                                                key={number}
                                                className={styles.number}
                                                onClick={() => {
                                                    if(sudoku[selectedCell].normal) {
                                                        setInputObject({'cell': selectedCell, 'input': parseInt(number)})
                                                        const newSudoku = sudoku.map(sudokuObject => {
                                                            if(sudokuObject.index === selectedCell) {
                                                                return {...sudokuObject, 'number': parseInt(number)}
                                                            } else {
                                                                return sudokuObject
                                                            }
                                                        })
                                                        setSudoku(newSudoku)
                                                    } else {
                                                        const newSudoku = sudoku.map(sudokuObject => {
                                                            if(sudokuObject.index === selectedCell) {
                                                                return {...sudokuObject, 
                                                                        'candidates': {...sudokuObject.candidates, [number]: !sudokuObject.candidates[number]}}
                                                            } else {
                                                                return sudokuObject
                                                            }
                                                        })
                                                        setSudoku(newSudoku)
                                                    }
                                                }}> 
                                {number}
                             </div>
                     )}
                     <div key={'x'} className={styles.x} onClick={() => {
                         const newSudoku = sudoku.map(sudokuCell => {
                             if(sudokuCell.index === selectedCell) {
                                 if(sudoku[selectedCell].normal) {
                                     return {...sudokuCell, 'number': 0}
                                 } else {
                                     return {...sudokuCell, 'candidates': {1: false, 2: false, 3: false, 4: false, 5: false, 6: false, 7: false, 8: false, 9: false}}
                                 }
                             } else {
                                 return sudokuCell
                             }
                         })
                         setSudoku(newSudoku)
                         setInputObject({'cell': selectedCell, 'input': 'remove'})
                     }}>X</div>
                </div>
           </div>
}