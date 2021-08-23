import styles from './Cell.module.css'

export default function CandidateCell({ candidates, index, solveActive, setSudoku, selectedCell, setSelectedCell}) {
    
    const solveModeForCell = (index, solveActive) => {
        setSudoku(prev => prev.map(sudokuCell => {
            if(sudokuCell['index'] == index) {
                return {...sudokuCell, 'normal': solveActive}
            } else {
                return sudokuCell
            }
        }))
    }
    return <div     
                id={`cell${index}`}
                className={`${styles.candidates} ${index === selectedCell ? styles.selected : ''}`}
                onClick = {e => {
                    solveModeForCell(index, solveActive)
                    setSelectedCell(index)
                }}
                >
                    {Object.keys(candidates).map(key => {
                        if(candidates[key] === true) {
                            return <div key={key} className={styles.candidateNumber}>{key}</div>
                        } else {
                            // return <div> </div>
                            return <div key={key} className={styles.hiddenCandidate}>{key}</div>
                        }
                    })}
                </div>
}