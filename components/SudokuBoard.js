import Cell from './Cell'
import PreFilledCell from './PreFilledCell'
import CandidateCell from './CandidateCell'
import styles from './SudokuBoard.module.css'

export default function SudokuBoard({ sudoku, solved, setSudoku, solveActive, selectedCell, setSelectedCell }) {
    return <div className={`${styles.grid} ${solved ? styles.solved : ''}`}>
        {sudoku.map((sudokuCell, index) => {
            if(sudokuCell.prefilled) {
                // parseInt probably unnecessary at this point
                return <PreFilledCell key={index} number={parseInt(sudokuCell.number)} />
            } else {
                if(sudokuCell.normal && sudokuCell.number != 0) {
                    return <Cell
                                key={index}
                                index={index}
                                number={parseInt(sudokuCell.number)}
                                warning={sudokuCell.warning}
                                solveActive={solveActive}
                                selectedCell={selectedCell}
                                setSudoku={setSudoku}
                                setSelectedCell={setSelectedCell} />
                } else {
                    return <CandidateCell
                                key={index}
                                index={index}
                                candidates={sudokuCell.candidates}
                                solveActive={solveActive}
                                selectedCell={selectedCell}
                                setSudoku={setSudoku}
                                setSelectedCell={setSelectedCell} />
                }
            }
        })}
    </div>
}