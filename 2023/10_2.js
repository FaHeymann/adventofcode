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
    isLoop: type === 'S',
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

let head

[[-1, 0], [0, 1], [1, 0], [0, -1]].some(([dy, dx]) => {
  if (position[0] + dy < 0 || position[0] + dy >= grid.length || position[1] + dx < 0 || position[1] + dx >= grid[0].length) {
    return
  }
  for (con of grid[position[0] + dy][position[1] + dx].connections) {
    if (con[0] === position[0] && con[1] === position[1]) {
     head = {
        cur: [position[0] + dy, position[1] + dx],
        prev: [...position],
      }
      return true
    }
  }
})

const check = new Set()

const move = head => {
  const tile = grid[head.cur[0]][head.cur[1]]
  const nextTile = tile.connections.find(con => con[0] !== head.prev[0] || con[1] !== head.prev[1])

  tile.isLoop = true

  if (nextTile[0] > tile.y) {
    check.add(`${tile.y}#${tile.x - 1}`)
    check.add(`${nextTile[0]}#${nextTile[1] - 1}`)
  }

  if (nextTile[0] < tile.y) {
    check.add(`${tile.y}#${tile.x + 1}`)
    check.add(`${nextTile[0]}#${nextTile[1] + 1}`)
  }

  if (nextTile[1] < tile.x) {
    check.add(`${tile.y - 1}#${tile.x}`)
    check.add(`${nextTile[0] - 1}#${nextTile[1]}`)
  }

  if (nextTile[1] > tile.x) {
    check.add(`${tile.y + 1}#${tile.x}`)
    check.add(`${nextTile[0] + 1}#${nextTile[1]}`)
  }

  return {
    cur: nextTile,
    prev: head.cur,
  }
}

while (true) {
  head = move(head)
  if (head.cur[0] === position[0] && head.cur[1] === position[1]) {
    break;
  }
}

const found = new Set()

const checkTile = (y, x) => {
  if (y < 0 || y >= grid.length || x < 0 || x >= grid[0].length) {
    return
  }
  const tile = grid[y][x]
  if (tile.isLoop || found.has(`${y}#${x}`)) {
    return
  }
  found.add(`${y}#${x}`)
  checkTile(y - 1, x)
  checkTile(y + 1, x)
  checkTile(y, x - 1)
  checkTile(y, x + 1)
}

check.forEach(cur => {
  const [y, x] = cur.split('#').map(n => parseInt(n, 10))
  checkTile(y, x)
})

console.log(found.size)
