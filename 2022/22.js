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

let maxX = 0;
let maxY = 0;

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

rawMap.split("\n").forEach((line, y) => {
  maxY = y;
  line.split("").forEach((s, x) => {
    if (s === ".") {
      if (startX === undefined) {
        startX = x;
        startY = y;
      }
      map[`${y}#${x}`] = ".";
    }
    if (s === "#") {
      map[`${y}#${x}`] = "#";
    }
    maxX = Math.max(x, maxX);
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

const getNext = (y, x, dir) => {
  if (dir === "R") {
    do {
      x++;
      if (x > maxX) {
        x = 0;
      }
    } while (!(`${y}#${x}` in map));
  }
  if (dir === "L") {
    do {
      x--;
      if (x < 0) {
        x = maxX;
      }
    } while (!(`${y}#${x}` in map));
  }
  if (dir === "U") {
    do {
      y--;
      if (y < 0) {
        y = maxY;
      }
    } while (!(`${y}#${x}` in map));
  }
  if (dir === "D") {
    do {
      y++;
      if (y > maxY) {
        y = 0;
      }
    } while (!(`${y}#${x}` in map));
  }
  return [y, x];
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

// for (let i = 0; i < 10; i++) {
//   console.log(y, x)
//   move()
// }

console.log(parseSequence(sequence));

parseSequence(sequence).forEach((step) => {
  if (step === "L") {
    dir = turn["L"][dir];
  } else if (step === "R") {
    dir = turn["R"][dir];
  } else {
    for (let i = 0; i < step; i++) {
      move();
      console.log(y, x, dir);
    }
  }
  console.log(y, x, dir);
});

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
