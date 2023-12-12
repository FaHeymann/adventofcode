const input = require("fs").readFileSync("inputs/2023/8.txt").toString();

const [instruction, rawMap] = input.split('\n\n')

const map = {}
rawMap.split('\n').forEach(line => {
  const [_, source, left, right] = line.match(/(.*) = \((.*), (.*)\)/)
  map[source] = [left, right]
})

console.log(map)


let position = 'AAA'
let steps = 0
let instructionPointer = 0
const getInstruction = () => {
  if (instructionPointer >= instruction.length) {
    instructionPointer = 0
  }
  return instruction.charAt(instructionPointer++)
}

let count = 0;

while (position !== 'ZZZ') {
  position = map[position][getInstruction() === 'L' ? 0 : 1]
  console.log(position)
  count++
}

console.log(count)
