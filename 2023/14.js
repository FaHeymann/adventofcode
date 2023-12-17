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

for (let y = 0; y < grid.length; y++) {
  for (let x = 0; x < grid[0].length; x++) {
    if (grid[y][x] !== 'O') {
      continue
    }
    for (let dy = y - 1; dy >= 0; dy --) {
      if (grid[dy][x] === '.') {
        grid[dy][x] = 'O'
        grid[dy + 1][x] = '.'
      } else {
        break
      }
    }
  }
}

let count = 0
grid.forEach((l, i) => {
  count += l.filter(l => l === 'O').length * (grid.length - i)
})
console.log(count)

console.log(grid.map(l => l.join('')))