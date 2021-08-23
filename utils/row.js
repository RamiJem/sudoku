// Construct an array of row indices
const rows = [0, 9, 18, 27, 36, 45, 54, 63, 72].map(number => {
    let indices = [0, 1, 2, 3, 4, 5, 6, 7, 8]
    return indices.map(number2 => number + number2)
})


function rowIndex(index) {
    let i = 0
    if(index==0) {return 0}
    while(index >= [0, 9, 18, 27, 36, 45, 54, 63, 72][i]) {
        if(index == i) {return index}
        i++
    }
    return i-1
}

export default function row(index) {
    return rows[rowIndex(index)]
}