const input = require("fs").readFileSync("inputs/2023/11.txt").toString();

const emptyRows = []
const emptyColumns = []

const grid = input.split('\n').map(line => line.split(''))

input.split('\n').forEach((line, y) => {
  if (line.split('').every(c => c === '.')) {
    emptyRows.push(y)
  }
})


for (let x = 0; x < grid[0].length; x++) {
  let columnEmpty = true
  for (let y = 0; y < grid.length; y++) {
    if (grid[y][x] !== '.') {
      columnEmpty = false;
      break;
    }
  }
  if (columnEmpty) {
    emptyColumns.push(x)
  }
}


const stars = []

for (let y = 0; y < grid.length; y++) {
  for(let x = 0; x < grid[0].length; x++) {
    if (grid[y][x] === '#') {
      stars.push([y, x])
    }
  }
}

const solve = (expansionFactor) => {
  let distance = 0

  for (let i = 0; i < stars.length; i++) {
    for (let j = 0; j < i; j++) {
      distance += Math.abs(stars[i][0] - stars[j][0]) + Math.abs(stars[i][1] - stars[j][1])
      emptyRows.forEach(row => {
        if (Math.min(stars[i][0], stars[j][0]) < row && Math.max(stars[i][0], stars[j][0]) > row) {
          distance += expansionFactor - 1
        }
      })
      emptyColumns.forEach(column => {
        if (Math.min(stars[i][1], stars[j][1]) < column && Math.max(stars[i][1], stars[j][1]) > column) {
          distance += expansionFactor - 1
        }
      })
    }
  }

  console.log(distance)
}

solve(2)
solve(1000000)

