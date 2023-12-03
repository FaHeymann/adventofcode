const input = require("fs").readFileSync("inputs/2023/2.txt").toString();

const bounds = {
  r: 12,
  g: 13,
  b: 14,
}

let sum = 0;

input.split('\n').forEach((line) => {
  const [rawId, rawGame] = line.split(': ')
  const id = parseInt(rawId.split(' ')[1], 10)
  const rawDraws = rawGame.split('; ')

  let possible = true
  rawDraws.forEach(rawDraw => {
    const rawStones = rawDraw.split(', ')
    rawStones.forEach(rawStone => {
      const [amount, color] = rawStone.split(' ')
      if (color === 'red' && parseInt(amount, 10) > bounds.r) {
        possible = false
      }
      if (color === 'green' && parseInt(amount, 10) > bounds.g) {
        possible = false
      }
      if (color === 'blue' && parseInt(amount, 10) > bounds.b) {
        possible = false
      }
    })
  })
  
  if (possible) {
    sum += id
  }
})

console.log(sum)
sum = 0

input.split('\n').forEach((line) => {
  const [rawId, rawGame] = line.split(': ')
  // const id = parseInt(rawId.split(' ')[1], 10)
  const rawDraws = rawGame.split('; ')

  let min = [0, 0, 0]
  rawDraws.forEach(rawDraw => {
    const rawStones = rawDraw.split(', ')
    rawStones.forEach(rawStone => {
      const [amount, color] = rawStone.split(' ')
      if (color === 'red') {
        min[0] = Math.max(amount, min[0])
      }
      if (color === 'green') {
        min[1] = Math.max(amount, min[1])
      }
      if (color === 'blue') {
        min[2] = Math.max(amount, min[2])
      }
    })
  })
  sum += min[0] * min[1] * min[2]
})

console.log(sum)
