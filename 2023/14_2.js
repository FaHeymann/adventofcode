// const input = `O....#....
// O.OO#....#
// .....##...
// OO.#O....O
// .O.....O#.
// O.#..O.#.#
// ..O..#O..O
// .......O..
// #....###..
// #OO..#....`

const input = require("fs").readFileSync("inputs/2023/14.txt").toString();

const grid = input.split('\n').map(l => l.split(''))

const north = () => {
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
      if (grid[y][x] !== 'O') {
        continue
      }
      for (let dy = y - 1; dy >= 0; dy--) {
        if (grid[dy][x] === '.') {
          grid[dy][x] = 'O'
          grid[dy + 1][x] = '.'
        } else {
          break
        }
      }
    }
  }
}

const south = () => {
  for (let y = grid.length - 1; y >= 0; y--) {
    for (let x = 0; x < grid[0].length; x++) {
      if (grid[y][x] !== 'O') {
        continue
      }
      for (let dy = y + 1; dy < grid.length; dy++) {
        if (grid[dy][x] === '.') {
          grid[dy][x] = 'O'
          grid[dy - 1][x] = '.'
        } else {
          break
        }
      }
    }
  }
}

const west = () => {
  for (let x = 0; x < grid[0].length; x++) {
    for (let y = 0; y < grid.length; y++) {
      if (grid[y][x] !== 'O') {
        continue
      }
      for (let dx = x - 1; dx >= 0; dx--) {
        if (grid[y][dx] === '.') {
          grid[y][dx] = 'O'
          grid[y][dx + 1] = '.'
        } else {
          break
        }
      }
    }
  }
}

const east = () => {
  for (let x = grid[0].length; x >= 0; x--) {
    for (let y = 0; y < grid.length; y++) {
      if (grid[y][x] !== 'O') {
        continue
      }
      for (let dx = x + 1; dx < grid[0].length; dx++) {
        if (grid[y][dx] === '.') {
          grid[y][dx] = 'O'
          grid[y][dx - 1] = '.'
        } else {
          break
        }
      }
    }
  }
}

const cycle = () => {
  north()
  west()
  south()
  east()
}

const print = () => {
  console.log(grid.map(l => l.join('')).join('\n'))
  console.log('')
}

const score = () => grid.reduce((count, line, i) => count + line.filter(l => l === 'O').length * (grid.length - i), 0)

const gridToString = () => grid.map(l => l.join('')).join('')

const map = new Map()
let done = false

const cycles = 1000000000

for (let i = 0; i < cycles; i++) {
  cycle()
  if (map.has(gridToString()) && !done) {
    done = true
    const distance = i - map.get(gridToString())
    while(i + distance < cycles) {
      i += distance
    }
  }
  map.set(gridToString(), i)
}

console.log(score())
