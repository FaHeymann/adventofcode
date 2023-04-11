const input = require("fs").readFileSync("inputs/2022/22.txt").toString();

const [rawMap, sequence] = input.split("\n\n");

const map = {};

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

const sideLength = 50;

rawMap.split("\n").forEach((line, y) => {
  line.split("").forEach((s, x) => {
    const localY = y % sideLength;
    const localX = x % sideLength;
    const segment = Math.floor(y / sideLength) * 3 + Math.floor(x / sideLength);
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
    1: (y) => ({ segment: 2, y, x: 0, dir: "R" }),
    2: (y) => ({ segment: 7, y: sideLength - 1 - y, x: sideLength - 1, dir: "L" }),
    4: (y) => ({ segment: 2, y: sideLength - 1, x: y, dir: "U" }),
    6: (y) => ({ segment: 7, y, x: 0, dir: "R" }),
    7: (y) => ({ segment: 2, y: sideLength - 1 - y, x: sideLength - 1, dir: "L" }),
    9: (y) => ({ segment: 7, y: sideLength - 1, x: y, dir: "U" }),
  },
  L: {
    1: (y) => ({ segment: 6, y: sideLength - 1 - y, x: 0, dir: 'R' }),
    2: (y) => ({ segment: 1, y, x: sideLength - 1, dir: 'L' }),
    4: (y) => ({ segment: 6, y: 0, x: y, dir: 'D' }),
    6: (y) => ({ segment: 1, y: sideLength - 1 - y, x: 0, dir: 'R' }),
    7: (y) => ({ segment: 6, y, x: sideLength - 1, dir: 'L' }),
    9: (y) => ({ segment: 1, y: 0, x: y, dir: 'D' }),
  },
  U: {
    1: (x) => ({ segment: 9, y: x, x: 0, dir: 'R' }),
    2: (x) => ({ segment: 9, y: sideLength - 1, x, dir: 'U' }),
    4: (x) => ({ segment: 1, y: sideLength - 1, x, dir: 'U' }),
    6: (x) => ({ segment: 4, y: x, x: 0, dir: 'R' }),
    7: (x) => ({ segment: 4, y: sideLength - 1, x, dir: 'U' }),
    9: (x) => ({ segment: 6, y: sideLength - 1, x, dir: 'U' }),
  },
  D: {
    1: (x) => ({ segment: 4, y: 0, x, dir: 'D' }),
    2: (x) => ({ segment: 4, y: x, x: sideLength - 1, dir: 'L' }),
    4: (x) => ({ segment: 7, y: 0, x, dir: 'D' }),
    6: (x) => ({ segment: 9, y: 0, x, dir: 'D' }),
    7: (x) => ({ segment: 9, y: x, x: sideLength - 1, dir: 'L' }),
    9: (x) => ({ segment: 2, y: 0, x, dir: 'D' }),
  },
};

const getNext = (segment, y, x, dir) => {
  if (dir === "R") {
    if (x === sideLength - 1) {
      return changeSegment.R[segment](y);
    }
    return { segment, y, x: x + 1, dir };
  }
  if (dir === "L") {
    if (x === 0) {
      return changeSegment.L[segment](y);
    }
    return { segment, y, x: x - 1, dir };
  }
  if (dir === "U") {
    if (y === 0) {
      return changeSegment.U[segment](x);
    }
    return { segment, y: y - 1, x, dir };
  }
  if (dir === "D") {
    if (y === sideLength - 1) {
      return changeSegment.D[segment](x);
    }
    return { segment, y: y + 1, x, dir };
  }
};

let y = 0;
let x = 0;
let segment = 1;
let dir = "R";

const move = () => {
  const { x: nextX, y: nextY, segment: nextSegment, dir: nextDir } = getNext(segment, y, x, dir);
  if (map[`${nextSegment}#${nextY}#${nextX}`] === "#") {
    return;
  }
  segment = nextSegment;
  y = nextY;
  x = nextX;
  dir = nextDir;
};

parseSequence(sequence).forEach((step) => {
  if (step === "L") {
    dir = turn["L"][dir];
  } else if (step === "R") {
    dir = turn["R"][dir];
  } else {
    for (let i = 0; i < step; i++) {
      move();
    }
  }
});

const dirToScore = {
  R: 0,
  D: 1,
  L: 2,
  U: 3,
};
console.log(1000 * (Math.floor(segment / 3) * sideLength + y + 1) + 4 * ((segment % 3) * sideLength + x + 1) + dirToScore[dir]);
