// const input = `        ...#
//         .#..
//         #...
//         ....
// ...#.......#
// ........#...
// ..#....#....
// ..........#.
//         ...#....
//         .....#..
//         .#......
//         ......#.

// 10R5L5R10L4R5L5`;

const input = require("fs").readFileSync("inputs/2022/22.txt").toString();

const [rawMap, sequence] = input.split("\n\n");

const map = {};

let startX = undefined;
let startY = undefined;

const turn = {
  R: {
    R: "D",
    D: "L",
    L: "U",
    U: "R",
  },
  L: {
    R: "U",
    D: "R",
    L: "D",
    U: "L",
  },
};

const sideLength = 50

rawMap.split("\n").forEach((line, y) => {
  line.split("").forEach((s, x) => {
    const localY = y % sideLength
    const localX = x % sideLength
    const segment = Math.floor(y / sideLength) * 3 + Math.floor(x / sideLength)
    if ([".", "#"].includes(s)) {
      map[`${segment}#${localY}#${localX}`] = s;
    }
  });
});

const parseSequence = (sequence) => {
  const result = [];
  let buffer = "";
  sequence.split("").forEach((c) => {
    if (c.match(/[0-9]/)) {
      buffer += c;
    } else {
      result.push(parseInt(buffer, 10));
      buffer = "";
      result.push(c);
    }
  });
  result.push(parseInt(buffer, 10));
  return result.filter((s) => s !== "");
};

const changeSegment = {
  R: {
    1: (y, x) => ({}),
    2: (y, x) => ({}),
    4: (y, x) => ({}),
    6: (y, x) => ({}),
    7: (y, x) => ({}),
    9: (y, x) => ({}),
  },
  D: {
    1: (y, x) => ({}),
    2: (y, x) => ({}),
    4: (y, x) => ({}),
    6: (y, x) => ({}),
    7: (y, x) => ({}),
    9: (y, x) => ({}),
  },
  L: {
    1: (y, x) => ({}),
    2: (y, x) => ({}),
    4: (y, x) => ({}),
    6: (y, x) => ({}),
    7: (y, x) => ({}),
    9: (y, x) => ({}),
  },
  U: {
    1: (y, x) => ({}),
    2: (y, x) => ({}),
    4: (y, x) => ({}),
    6: (y, x) => ({}),
    7: (y, x) => ({}),
    9: (y, x) => ({}),
  }
}

const getNext = (segment, y, x, dir) => {
  if (dir === "R") {
    if (x === sideLength - 1) {
      return changeSegment.R[segment](y, x)
    }
    return { segment, y, x: x + 1, dir }
  }
  if (dir === "L") {
    if (x === 0) {
      return changeSegment.L[segment](y, x)
    }
    return { segment, y, x: x - 1, dir }
  }
  if (dir === "U") {
    if (y === 0) {
      return changeSegment.U[segment](y, x)
    }
    return { segment, y: y - 1, x, dir }
  }
  if (dir === "D") {
    if (y === sideLength - 1) {
      return changeSegment.D[segment](y, x)
    }
    return { segment, y: y + 1, x, dir }
  }
  throw new Error('woops')
};

let y = startY;
let x = startX;
let dir = "R";

const move = () => {
  const [nextY, nextX] = getNext(y, x, dir);
  if (map[`${nextY}#${nextX}`] === "#") {
    return;
  }
  y = nextY;
  x = nextX;
};

// parseSequence(sequence).forEach((step) => {
//   if (step === "L") {
//     dir = turn["L"][dir];
//   } else if (step === "R") {
//     dir = turn["R"][dir];
//   } else {
//     for (let i = 0; i < step; i++) {
//       move();
//       console.log(y, x, dir);
//     }
//   }
//   console.log(y, x, dir);
// });

const dirToScore = {
  R: 0,
  D: 1,
  L: 2,
  U: 3,
};

console.log(1000 * (y + 1) + 4 * (x + 1) + dirToScore[dir]);

// console.log(map);
// console.log(maxY, maxX);
// console.log(startY, startX);
// console.log(parseSequence(sequence));
