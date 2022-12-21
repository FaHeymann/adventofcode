const input = require("fs").readFileSync("inputs/2022/15.txt").toString();
const targetLine = 2000000

const slices = []

let beaconsInTargetRow = new Set()

input.split("\n").forEach((line) => {
  const [_, sx, sy, bx, by] = line
    .match(/Sensor at x=(.*), y=(.*)\: closest beacon is at x=(.*), y=(.*)/)
    .map((n) => parseInt(n, 10));

  const yDistance = Math.abs(sy - targetLine)
  const distance = Math.abs(sx - bx) + Math.abs(sy - by)
  const xDistance = distance - yDistance

  if (by === targetLine) {
    beaconsInTargetRow.add(bx)
  }

  if (xDistance >= 0) {
    const start = sx - xDistance
    const end = sx + xDistance
    slices.push([start, end])
  }
});

const counted = new Set()

slices.forEach(([start, end]) => {
  for (let i = start; i <= end; i++) {
    counted.add(i)
  }
})

console.log(counted.size - beaconsInTargetRow.size)

// part 2
const searchLimit = 4000000
const getSlices = (targetLine) => {
  const slices = [];

  input.split("\n").forEach((line) => {
    const [_, sx, sy, bx, by] = line
      .match(/Sensor at x=(.*), y=(.*)\: closest beacon is at x=(.*), y=(.*)/)
      .map((n) => parseInt(n, 10));

    const yDistance = Math.abs(sy - targetLine);
    const distance = Math.abs(sx - bx) + Math.abs(sy - by);
    const xDistance = distance - yDistance;

    if (xDistance >= 0) {
      const start = sx - xDistance;
      const end = sx + xDistance;
      slices.push([start, end]);
    }
  });

  return slices;
};

const findGap = (slices, target, y) => {
  let x = 0
  while(x <= target) {
    const result = slices.some(slice => {
      if (slice[0] <= x && slice[1] >= x) {
        x = slice[1] + 1
        return true
      }
    })

    if (!result) {
      console.log(x * searchLimit + y)
      process.exit(0)
    }
  }
}

for (let y = 0; y <= searchLimit; y++) {
  const slices = getSlices(y)
  findGap(slices, searchLimit, y)
}