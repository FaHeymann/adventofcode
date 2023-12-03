const input = require("fs").readFileSync("inputs/2023/3.txt").toString();

const grid = input.split('\n').map(row => row.split(''))

const symbolMap = {}

let curNumber = ''
let curSymbols = new Set()

const scanSurroundingForSymbol = (y, x) => {
  for (let checkY = y - 1; checkY <= y + 1; checkY++) {
    for (let checkX = x - 1; checkX <= x + 1; checkX++) {
      if (positionHasSymbol(checkY, checkX)) {
        curSymbols.add(`${checkY}#${checkX}`)
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
  if (curNumber !== '') {
    curSymbols.forEach(symbol => {
      addToSymbolMap(symbol, parseInt(curNumber, 10))
    })
  }
  curSymbols = new Set()
  curNumber = ''
}

const addToSymbolMap = (position, number) => {
  if (!(position in symbolMap)) {
    symbolMap[position] = []
  }
  symbolMap[position].push(number)
}

for (let y = 0; y < grid.length; y++) {
  for (let x = 0; x < grid[0].length; x++) {
    const c = grid[y][x]
    if (c.match(/[0-9]/)) {
      curNumber += c
      scanSurroundingForSymbol(y, x)
    } else {
      checkEnd()
    }
  }
  checkEnd()
}

let result = 0

Object.entries(symbolMap).forEach(([key, value]) => {
  const [y, x] = key.split('#').map(n => parseInt(n, 10))
  if (grid[y][x] === '*' && value.length === 2) {
    result += value[0] * value[1]
  }
})

console.log(result)
