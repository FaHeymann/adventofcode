const input = require("fs").readFileSync("inputs/2023/16.txt").toString();

const grid = input.split('\n').map(l => l.split(''))

const solve = (start) => {
  const beams = [start]
  const energized = new Set()
  const visited = new Set()

  const move = ({ y, x, d}) => {
    if (d === 'u') {
      return {
        y: y - 1,
        x,
        d,
      }
    }
    if (d === 'r') {
      return {
        y,
        x: x + 1,
        d,
      }
    }
    if (d === 'd') {
      return {
        y: y + 1,
        x,
        d,
      }
    }
    if (d === 'l') {
      return {
        y,
        x: x - 1,
        d,
      }
    }
  }


  const step = ({ y, x, d }) => {
    if (y < 0 || x < 0 || y >= grid.length || x >= grid[0].length) {
      return []
    }

    energized.add(`${y}#${x}`)

    if (visited.has(`${y}#${x}#${d}`)) {
      return []
    }
    visited.add(`${y}#${x}#${d}`)

    const tile = grid[y][x]

    if (tile === '.') {
      return [move({ y, x, d })]
    }
    if (tile === '/') {
      if (d === 'u') {
        return [move({ y, x, d: 'r' })]
      }
      if (d === 'r') {
        return [move({ y, x, d: 'u' })]
      }
      if (d === 'd') {
        return [move({ y, x, d: 'l' })]
      }
      if (d === 'l') {
        return [move({ y, x, d: 'd' })]
      }
    }
    if (tile === '\\') {
      if (d === 'u') {
        return [move({ y, x, d: 'l' })]
      }
      if (d === 'r') {
        return [move({ y, x, d: 'd' })]
      }
      if (d === 'd') {
        return [move({ y, x, d: 'r' })]
      }
      if (d === 'l') {
        return [move({ y, x, d: 'u' })]
      }
    }
    if (tile === '-') {
      if (d === 'u') {
        return [move({ y, x, d: 'l' }), move({ y, x, d: 'r' })]
      }
      if (d === 'r') {
        return [move({ y, x, d })]
      }
      if (d === 'd') {
        return [move({ y, x, d: 'l' }), move({ y, x, d: 'r' })]
      }
      if (d === 'l') {
        return [move({ y, x, d })]
      }
    }
    if (tile === '|') {
      if (d === 'u') {
        return [move({ y, x, d })]
      }
      if (d === 'r') {
        return [move({ y, x, d: 'u' }), move({ y, x, d: 'd' })]
      }
      if (d === 'd') {
        return [move({ y, x, d })]
      }
      if (d === 'l') {
        return [move({ y, x, d: 'u' }), move({ y, x, d: 'd' })]
      }
    }
    throw new Error('unknown tile')
  }

  while(beams.length > 0) {
    const cur = beams.pop()
    const next = step(cur)
    beams.push(...next)
  }

  return energized.size
}

console.log(solve({ y: 0, x: 0, d: 'r' }))

let max = 0

for (let y = 0; y < grid.length; y++) {
  const r1 = solve({ y, x: 0, d: 'r' })
  const r2 = solve({ y, x: grid[0].length - 1, d: 'l' })
  max = Math.max(max, r1, r2)
}

for (let x = 0; x < grid[0].length; x++) {
  const r1 = solve({ y: 0, x, d: 'd' })
  const r2 = solve({ y: grid.length - 1, x, d: 'u' })
  max = Math.max(max, r1, r2)
}

console.log(max)
