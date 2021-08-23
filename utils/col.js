// Construct an array of column indices
const cols = [0, 1, 2, 3, 4, 5, 6, 7, 8].map(index => {
    return [0, 1, 2, 3, 4, 5, 6, 7, 8].map(number2 => (index + number2*9))
})

export default function col(index) {
    // Index is an int from 0-80, mod 9 will give correct index in cols
    // OR MOD 8 ??????????
    // ?????????????
    
    return cols[index%9]
}