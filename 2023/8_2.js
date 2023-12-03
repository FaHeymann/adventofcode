const input = require("fs").readFileSync("inputs/2023/8.txt").toString();

const [instruction, rawMap] = input.split('\n\n')

const map = {}
rawMap.split('\n').forEach(line => {
  const [_, source, left, right] = line.match(/(.*) = \((.*), (.*)\)/)
  map[source] = [left, right]
})

let positions = Object.keys(map).filter(p => p.endsWith('A'))

let instructionPointer = 0
const getInstruction = () => {
  if (instructionPointer >= instruction.length) {
    instructionPointer = 0
  }
  return instruction.charAt(instructionPointer++)
}

let count = 0;
let cycles = positions.map(_ => -1)
let firsts = []

while (cycles.some(i => i === -1)) {
  const instruction = getInstruction() === 'L' ? 0 : 1
  positions = positions.map(position => map[position][instruction])
  positions.forEach((p, index) => {
    if (p.endsWith('Z')) {
      if (!firsts[index]) {
        firsts[index] = count
      } else if (cycles[index] === -1) {
        cycles[index] = count - firsts[index]
      }
    }
  })
  count++
}

const gcd = (a, b) => b == 0 ? a : gcd (b, a % b)
const lcm = (a, b) =>  a / gcd(a, b) * b

console.log(cycles.reduce(lcm, 1))
