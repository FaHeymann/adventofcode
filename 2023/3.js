const input = require("fs").readFileSync("inputs/2023/3.txt").toString();

const grid = input.split('\n').map(row => row.split(''))

let curNumber = ''
let hasSymbol = false
let numbers = []

const scanSurroundingForSymbol = (y, x) => {
  for (let checkY = y - 1; checkY <= y + 1; checkY++) {
    for (let checkX = x - 1; checkX <= x + 1; checkX++) {
      if (positionHasSymbol(checkY, checkX)) {
        return true
      }
    }
  }
}

const positionHasSymbol = (y, x) => {
  if (y < 0 || x < 0 || y >= grid.length || x >= grid[0].length) {
    return false
  }
  if (grid[y][x] === '.') {
    return false
  }
  return !grid[y][x].match(/[0-9]/)
}

const checkEnd = () => {
  if (curNumber !== '' && hasSymbol) {
    numbers.push(parseInt(curNumber, 10))
  }
  hasSymbol = false
  curNumber = ''
}

for (let y = 0; y < grid.length; y++) {
  for (let x = 0; x < grid[0].length; x++) {
    const c = grid[y][x]
    if (c.match(/[0-9]/)) {
      curNumber += c
      hasSymbol = hasSymbol || scanSurroundingForSymbol(y, x)
    } else {
      checkEnd()
    }
  }
  checkEnd()
}

console.log(numbers.reduce((a, b) => a + b, 0))
