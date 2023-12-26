// const input = `19, 13, 30 @ -2,  1, -2
// 18, 19, 22 @ -1, -1, -2
// 20, 25, 34 @ -2, -2, -4
// 12, 31, 28 @ -1, -2, -1
// 20, 19, 15 @  1, -5, -3`

const input = require("fs").readFileSync("inputs/2023/24.txt").toString();

const particles = input.split('\n').map(line => {
  const [pos, vel] = line.split(' @ ').map(a => a.split(', ').map(n => parseInt(n, 10)))
  const m = vel[1] / vel[0]
  const y0 = pos[1] - pos[0] * m
  return { pos, vel, m, y0 }
})

// console.log(particles)

// y = 22.5 - 0.5x
// y = 1 + 1x
// => 22.5 + (-0.5)x = 1 + 1x
// => (22.5 - 1) = 1x - (-0.5)x
// => (22.5 - 1) = (1 - (-0.5))x
// => x = ((22.5 - 1) / (1 - (-0.5)))

let count = 0

const lowerBound = 200000000000000
const upperBound = 400000000000000

for (let i = 0; i < particles.length; i++) {
  for (let j = 0; j < i; j++) {
    const p1 = particles[i]
    const p2 = particles[j]

    // console.log(p1)
    // console.log(p2)

    if (Math.abs(p1.m - p2.m) < Number.EPSILON) {
      console.log('parallel')
      console.log(p1.vel, p2.vel)
      continue
    }

    const intersectX = (p1.y0 - p2.y0) / (p2.m - p1.m)
    const intersectY = (p1.y0 + p1.m * intersectX)

    // console.log(intersectX)
    // console.log(intersectY)

    if ((p1.pos[0] > intersectX && p1.vel[0] > 0) || (p1.pos[0] < intersectX && p1.vel[0] < 0)) {
      // console.log('past')
      continue
    }
    if ((p2.pos[0] > intersectX && p2.vel[0] > 0) || (p2.pos[0] < intersectX && p2.vel[0] < 0)) {
      // console.log('past')
      continue
    }

    if (intersectX >= lowerBound && intersectX <= upperBound && intersectY >= lowerBound && intersectY <= upperBound) {
      // console.log('found')
      count += 1
      continue
    }
    // console.log('outside')

    // console.log()
  }
}

console.log(count)
