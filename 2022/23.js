// const input = `.....
// ..##.
// ..#..
// .....
// ..##.
// .....`;

// const input = `..............
// ..............
// .......#......
// .....###.#....
// ...#...#.#....
// ....#...##....
// ...#.###......
// ...##.#.##....
// ....#..#......
// ..............
// ..............
// ..............`

const input = require("fs").readFileSync("inputs/2022/23.txt").toString();

const elves = [];
input.split("\n").forEach((line, y) => {
  line.split("").forEach((s, x) => {
    if (s === "#") {
      elves.push({ y, x });
    }
  });
});

let attemptOrder = ["N", "S", "W", "E"];

let occupied = new Set();
let proposals = new Map();
const addProposal = (y, x) => {
  if (!proposals.has(`${y}#${x}`)) {
    proposals.set(`${y}#${x}`, 1);
  } else {
    proposals.set(`${y}#${x}`, proposals.get(`${y}#${x}`) + 1);
  }
};

const dirMap = {
  all: [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ],
  N: [
    [-1, -1],
    [-1, 0],
    [-1, 1],
  ],
  S: [
    [1, -1],
    [1, 0],
    [1, 1],
  ],
  W: [
    [-1, -1],
    [0, -1],
    [1, -1],
  ],
  E: [
    [-1, 1],
    [0, 1],
    [1, 1],
  ],
};

const moveMap = {
  N: [-1, 0],
  S: [1, 0],
  W: [0, -1],
  E: [0, 1],
};

const hasOccupied = (y, x, dir) => {
  return dirMap[dir].some(([deltaY, deltaX]) => {
    const checkY = y + deltaY;
    const checkX = x + deltaX;
    return occupied.has(`${checkY}#${checkX}`);
  });
};

const round = () => {
  occupied = new Set();
  proposals = new Map();
  elves.forEach((e) => {
    occupied.add(`${e.y}#${e.x}`);
  });
  elves.forEach((elv) => {
    // console.log('new elv')
    if (!hasOccupied(elv.y, elv.x, "all")) {
      return;
    }
    attemptOrder.some((dir) => {
      // console.log(dir)
      if (!hasOccupied(elv.y, elv.x, dir)) {
        // console.log('yes')
        elv.nextY = elv.y + moveMap[dir][0];
        elv.nextX = elv.x + moveMap[dir][1];
        addProposal(elv.nextY, elv.nextX);
        return true
      }
    });
  });
  // console.log(elves)
  // console.log(proposals)
  
  elves.forEach((elv) => {
    // console.log(elv)
    // console.log(proposals.get(`${elv.nextY}#${elv.nextX}`))
    if (elv.nextY !== undefined && proposals.get(`${elv.nextY}#${elv.nextX}`) === 1) {
      // console.log('got here')
      elv.y = elv.nextY;
      elv.x = elv.nextX;
    }
    delete elv.nextY;
    delete elv.nextX;
  });
  // console.log(elves)
  attemptOrder = [attemptOrder[1], attemptOrder[2], attemptOrder[3], attemptOrder[0]]
};

for (let i = 0; i < 10; i++) {
  round()
}

let minY = Number.MAX_SAFE_INTEGER
let minX = Number.MAX_SAFE_INTEGER
let maxY = Number.NEGATIVE_INFINITY
let maxX = Number.NEGATIVE_INFINITY

elves.forEach(elv => {
  minY = Math.min(minY, elv.y);
  minX = Math.min(minX, elv.x);
  maxY = Math.max(maxY, elv.y);
  maxX = Math.max(maxX, elv.x);
})

console.log((maxX + 1 - minX) * (maxY + 1 - minY) - elves.length)
