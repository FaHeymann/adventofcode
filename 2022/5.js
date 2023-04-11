const input = require("fs").readFileSync("inputs/2022/5.txt").toString();

const [init, instructions] = input.split('\n\n').map(p => p.split('\n'))

const stacks = []
init.pop()

init.forEach(line => {
  let index = 0
  for (let i = 1; i < line.length; i += 4) {
    if (line.split('')[i] !== ' ') {
      if (!stacks[index]) {
        stacks[index] = []
      }
      stacks[index].unshift(line.split('')[i])
    }
    index++;
  }
})

const stacks2 = JSON.parse(JSON.stringify(stacks))

instructions.forEach(line => {
  const [_, amount, from, to] = line.match(/move (.*) from (.*) to (.*)/).map(n => parseInt(n, 10))
  const buffer = []
  for (let i = 0; i < amount; i++) {
    const item = stacks[from - 1].pop();
    stacks[to - 1].push(item)
    const item2 = stacks2[from - 1].pop();
    buffer.unshift(item2)
  }
  stacks2[to - 1] = stacks2[to - 1].concat(buffer)
})

let result = ''

stacks.forEach(stack => {
  result += stack.pop()
})

console.log(result)

result = ''

stacks2.forEach(stack => {
  result += stack.pop()
})

console.log(result)