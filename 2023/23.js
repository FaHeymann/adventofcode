// const input = `#.#####################
// #.......#########...###
// #######.#########.#.###
// ###.....#.>.>.###.#.###
// ###v#####.#v#.###.#.###
// ###.>...#.#.#.....#...#
// ###v###.#.#.#########.#
// ###...#.#.#.......#...#
// #####.#.#.#######.#.###
// #.....#.#.#.......#...#
// #.#####.#.#.#########v#
// #.#...#...#...###...>.#
// #.#.#v#######v###.###v#
// #...#.>.#...>.>.#.###.#
// #####v#.#.###v#.#.###.#
// #.....#...#...#.#.#...#
// #.#########.###.#.#.###
// #...###...#...#...#.###
// ###.###.#.###v#####v###
// #...#...#.#.>.>.#.>.###
// #.###.###.#.###.#.#v###
// #.....###...###...#...#
// #####################.#`

const input = require("fs").readFileSync("inputs/2023/23.txt").toString();

const grid = input.split('\n').map(line => line.split(''))

// const start = [0, 1]
const goal = [grid.length - 1, grid[0].length - 2]

const start = { y: 0, x: 1, history: [] }

const queue = [start]

let max = 0

while (queue.length > 0) {
  const { y, x, history } = queue.pop()
  if (y < 0 || x < 0 || y >= grid.length || x >= grid[0].length) {
    continue
  }

  if (history.includes(`${y}#${x}`)) {
    continue
  }

  if (y === grid.length - 1 && x === grid[0].length - 2) {
    max = Math.max(max, history.length)
  }

  if (grid[y][x] === '>' || grid[y][x] === '.') {
    queue.unshift({ y, x: x + 1, history: [...history, `${y}#${x}`] })
  }
  if (grid[y][x] === '<' || grid[y][x] === '.') {
    queue.unshift({ y, x: x - 1, history: [...history, `${y}#${x}`] })
  }
  if (grid[y][x] === 'v' || grid[y][x] === '.') {
    queue.unshift({ y: y + 1, x, history: [...history, `${y}#${x}`] })
  }
  if (grid[y][x] === '^' || grid[y][x] === '.') {
    queue.unshift({ y: y - 1, x, history: [...history, `${y}#${x}`] })
  }
}

console.log(max)
