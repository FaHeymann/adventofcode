const input = require("fs").readFileSync("inputs/2023/13.txt").toString();

// const input = `#.##..##.
// ..#.##.#.
// ##......#
// ##......#
// ..#.##.#.
// ..##..##.
// #.#.##.#.

// #...##..#
// #....#..#
// ..##..###
// #####.##.
// #####.##.
// ..##..###
// #....#..#`

const instances = input.split('\n\n')

const solve = (instance, ignoreResult) => {
  const lines = instance.map(l => l.join())
  let count = 0

  for (let i = 1; i < lines.length; i++) {
    let match = true
    for (let j = 0; i - j > 0 && i + j < lines.length; j++) {
      // console.log('compare', i - j - 1, i + j )
      if (lines[i - j - 1] !== lines[i + j]) {
        match = false
        break;
      }
    }
    if (match && 100 * i !== ignoreResult) {
      count += 100 * i
      console.log('horizontal', i)
    }
  }


  const columns = []
  instance.forEach((line, y) => {
    line.forEach((c, x) => {
      if (y === 0) {
        columns.push('')
      }
      columns[x] += c
    })
  })
  // console.log(columns)

  for (let i = 1; i < columns.length; i++) {
    let match = true
    for (let j = 0; i - j > 0 && i + j < columns.length; j++) {
      // console.log('compare', i - j - 1, i + j )
      if (columns[i - j - 1] !== columns[i + j]) {
        match = false
        break;
      }
    }
    if (match && ignoreResult !== i) {
      count += i
      console.log('vertical', i)
    }
  }
  return count
}

let count = 0

const mutate = (grid, y, x) => {
  const output = JSON.parse(JSON.stringify(grid))
  output[y][x] = output[y][x] === '#' ? '.' : '#'
  return output
}

instances.forEach((instance, instanceIndex) => {
  console.log('instance', instanceIndex)
  const grid = instance.split('\n').map(line => line.split(''))
  const originalResult = solve(grid, -1)
  outer: for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
      const mutated = mutate(grid, y, x)
      const result = solve(mutated, originalResult)
      if (result !== 0) {
        count += result
        break outer
      }
    }
  }
})

console.log(count)
