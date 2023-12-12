const input = require("fs").readFileSync("inputs/2023/10.txt").toString();

const tiles = {
  '|': [true, false, true, false],
  '-': [false, true, false, true],
  'L': [true, true, false, false],
  'J': [true, false, false, true],
  '7': [false, false, true, true],
  'F': [false, true, true, false],
  'S': [false, false, false, false],
  '.': [false, false, false, false],
}

let position

const grid = input.split('\n').map((line, y) => line.split('').map((type, x) => {
  if (type === 'S') {
    position = [y, x]
  }
  return {
    y,
    x,
    type,
    connections: tiles[type].map((v, i) => {
      if (!v) {
        return null
      }
      if (i === 0) {
        return [y - 1, x]
      }
      if (i === 1) {
        return [y, x + 1]
      }
      if (i === 2) {
        return [y + 1, x]
      }
      if (i === 3) {
        return [y, x - 1]
      }
    }).filter(v => v !== null)
  }
}))

const heads = [];

[[-1, 0], [0, 1], [1, 0], [0, -1]].forEach(([dy, dx]) => {
  if (position[0] + dy < 0 || position[0] + dy >= grid.length || position[1] + dx < 0 || position[1] + dx >= grid[0].length) {
    return
  }
  for (con of grid[position[0] + dy][position[1] + dx].connections) {
    if (con[0] === position[0] && con[1] === position[1]) {
      heads.push({
        cur: [position[0] + dy, position[1] + dx],
        prev: [...position],
        distance: 1
      })
    }
  }
})

const move = head => {
  const tile = grid[head.cur[0]][head.cur[1]]
  const nextTile = tile.connections.find(con => con[0] !== head.prev[0] || con[1] !== head.prev[1])
  return {
    cur: nextTile,
    prev: head.cur,
    distance: head.distance + 1,
  }
}

while (true) {
  heads[0] = move(heads[0])
  if (heads[0].cur[0] === heads[1].cur[0] && heads[0].cur[1] === heads[1].cur[1]) {
    break;
  }

  heads[1] = move(heads[1])
  if (heads[0].cur[0] === heads[1].cur[0] && heads[0].cur[1] === heads[1].cur[1]) {
    break;
  }
}

console.log(heads[0].distance)


