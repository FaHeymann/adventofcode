const input = `...........
.....###.#.
.###.##..#.
..#.#...#..
....#.#....
.##..S####.
.##..#...#.
.......##..
.##.#.####.
.##..##.##.
...........`

// const input = require("fs").readFileSync("inputs/2023/21.txt").toString();

const grid = input.split('\n').map(line => line.split(''))

const visited = new Set()

const canAccessTile = (y, x) => {
  if (visited.has(`${y}#${x}`)) {
    return false
  }
  y = y % grid.length
  if (y < 0) {
    y += grid.length
  }
  x = x % grid[0].length
  if (x < 0) {
    x += grid[0].length
  }
  return grid[y][x] !== '#'
} 

const distances = {}

for (let y = 0; y < grid.length; y++) {
  for (let x = 0; x < grid[0].length; x++) {
    if (grid[y][x] === 'S') {
      distances[0] = [[y, x]]
      visited.add(`${y}#${x}`)
    }
  }
}

// console.log(grid)
// console.log(distances)

const insert = (y, x, d) => {
  if (canAccessTile(y, x)) {
    visited.add(`${y}#${x}`)
    distances[d].push([y, x])
  }
}

for (let i = 0; i < 5000; i++) {
  distances[i + 1] = []
  distances[i].forEach(([y, x]) => {
    insert(y - 1, x, i + 1)
    insert(y + 1, x, i + 1)
    insert(y, x - 1, i + 1)
    insert(y, x + 1, i + 1)
  })
}

// console.log(distances)

let count = 0

Object.entries(distances).forEach(([key, value]) => {
  if (parseInt(key, 10) % 2 === 0) {
    count += value.length
  }
})

console.log(count)
