const input = require("fs").readFileSync("inputs/2023/21.txt").toString();
const grid = input.split('\n').map(line => line.split(''))

const distances = {}

for (let y = 0; y < grid.length; y++) {
  for (let x = 0; x < grid[0].length; x++) {
    if (grid[y][x] === 'S') {
      distances[0] = [[y, x]]
      grid[y][x] = 'x'
    }
  }
}

const insert = (y, x, d) => {
  if (grid[y][x] === '.') {
    grid[y][x] = 'x'
    distances[d].push([y, x])
  }
}

for (let i = 0; i < 64; i++) {
  distances[i + 1] = []
  distances[i].forEach(([y, x]) => {
    insert(y - 1, x, i + 1)
    insert(y + 1, x, i + 1)
    insert(y, x - 1, i + 1)
    insert(y, x + 1, i + 1)
  })
}

let count = 0

Object.entries(distances).forEach(([key, value]) => {
  if (parseInt(key, 10) % 2 === 0) {
    count += value.length
  }
})

console.log(count)
