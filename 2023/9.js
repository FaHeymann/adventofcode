const input = require("fs").readFileSync("inputs/2023/9.txt").toString();

const nextLevel = arr => arr.reduce((cur, x, i) => i === arr.length - 1 ? cur : [...cur, arr[i + 1] - x], [])

let count = [0, 0]

input.split('\n').forEach(line => {
  let cur = line.split(' ').map(n => parseInt(n, 10))
  const stack = [cur]
  
  while (!cur.every(v => v === 0)) {
    cur = nextLevel(cur)
    stack.push(cur)
  }

  for (let i = stack.length - 2; i >= 0; i--) {
    stack[i].push(stack[i].at(-1) + stack[i + 1].at(-1))
    stack[i].unshift(stack[i][0] - stack[i + 1][0])
  }

  count[0] += stack[0].at(-1)
  count[1] += stack[0][0]
})

console.log(count)
