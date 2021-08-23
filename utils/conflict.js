// import row from './row'
// import col from './col'
// import unit from './unit'

export default function conflict(sudoku, cell) {
   
    if(sudoku[cell].number == 0) {
        return false
    }

    const number = sudoku.find(sudokuCell => sudokuCell.index == cell).number

    const rowIndices = sudoku.find(sudokuCell => sudokuCell.index == cell).row
    const indexInRow = rowIndices.indexOf(cell)
    const slicedRow = [...rowIndices.slice(0, indexInRow), ...rowIndices.slice(indexInRow+1)]
    const row = slicedRow.map(ind => sudoku.find(sudokuCell => sudokuCell.index==ind).number)
   
    const colIndices = sudoku.find(sudokuCell => sudokuCell.index == cell).col
    const indexInColumn = colIndices.indexOf(cell)
    const slicedColumn = [...colIndices.slice(0, indexInColumn), ...colIndices.slice(indexInColumn+1)]
    const col = slicedColumn.map(ind => sudoku.find(sudokuCell => sudokuCell.index==ind).number)
   
    const unitIndices = sudoku.find(sudokuCell => sudokuCell.index == cell).unit
    const indexInUnit = unitIndices.indexOf(cell)
    const slicedUnit = [...unitIndices.slice(0, indexInUnit), ...unitIndices.slice(indexInUnit+1)]
    const unit = slicedUnit.map(ind => sudoku.find(sudokuCell => sudokuCell.index==ind).number)
   
    // const number = sudoku[cell].number

    // const rowIndices = sudoku[cell].row
    // const indexInRow = rowIndices.indexOf(cell)
    // const slicedRow = [...rowIndices.slice(0, indexInRow), ...rowIndices.slice(indexInRow + 1)]
    // const row = slicedRow.map(index => sudoku[index].number)

    // const columnIndices = sudoku[cell].col
    // const indexInColumn = columnIndices.indexOf(cell)
    // const slicedColumn = [...columnIndices.slice(0, indexInRow), ...columnIndices.slice(indexInColumn + 1)]
    // const col = slicedColumn.map(index => sudoku[index].number)

    // const unitIndices = sudoku[cell].unit
    // const indexInUnit = unitIndices.indexOf(cell)
    // const slicedUnit = [...unitIndices.slice(0, indexInUnit), ...unitIndices.slice(indexInUnit + 1)]
    // const unit = slicedUnit.map(index => sudoku[index].number)

    if(row.includes(number) || col.includes(number) || unit.includes(number)) {
        console.log('cell: ', cell, ' number: ', number)
        console.log('rowIndices: ', slicedRow, ' row: ', row, ' includes: ', row.includes(number))
        console.log('colIndices: ', slicedColumn, ' col: ', col, ' includes: ', col.includes(number))
        console.log('unitIndices: ', slicedUnit, ' unit: ', unit, 'includes: ', unit.includes(number))
    } else {
        // console.log('number' , number, ' not in conflict, cell: ', cell)
    }

    return row.includes(number) || col.includes(number) || unit.includes(number)
}