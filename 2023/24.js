const input = require("fs").readFileSync("inputs/2023/24.txt").toString();

const particles = input.split('\n').map(line => {
  const [pos, vel] = line.split(' @ ').map(a => a.split(', ').map(n => parseInt(n, 10)))
  const m = vel[1] / vel[0]
  const y0 = pos[1] - pos[0] * m
  return { pos, vel, m, y0 }
})

let count = 0

const lowerBound = 200000000000000
const upperBound = 400000000000000

for (let i = 0; i < particles.length; i++) {
  for (let j = 0; j < i; j++) {
    const p1 = particles[i]
    const p2 = particles[j]

    if (Math.abs(p1.m - p2.m) < Number.EPSILON) {
      continue
    }

    const intersectX = (p1.y0 - p2.y0) / (p2.m - p1.m)
    const intersectY = (p1.y0 + p1.m * intersectX)

    if ((p1.pos[0] > intersectX && p1.vel[0] > 0) || (p1.pos[0] < intersectX && p1.vel[0] < 0)) {
      continue
    }
    if ((p2.pos[0] > intersectX && p2.vel[0] > 0) || (p2.pos[0] < intersectX && p2.vel[0] < 0)) {
      continue
    }

    if (intersectX >= lowerBound && intersectX <= upperBound && intersectY >= lowerBound && intersectY <= upperBound) {
      count += 1
      continue
    }
  }
}

console.log(count)
