const input = require("fs")
  .readFileSync("inputs/2021/5.txt")
  .toString()
  .split("\n");

const maps = [new Map(), new Map()];
const counts = [0, 0];

const key = (y, x) => `${y}#${x}`;

const update = (y, x, i) => {
  if (maps[i].get(key(y, x)) === 1) {
    counts[i]++;
    maps[i].set(key(y, x), 2);
  }
  if (!maps[i].get(key(y, x))) {
    maps[i].set(key(y, x), 1);
  }
};

input.forEach((line) => {
  const [[x1, y1], [x2, y2]] = line
    .split(" -> ")
    .map((p) => p.split(",").map((n) => parseInt(n, 10)));
  if (x1 === x2) {
    for (let y = Math.min(y1, y2); y <= Math.max(y1, y2); y++) {
      update(y, x1, 0);
      update(y, x1, 1);
    }
  } else if (y1 === y2) {
    for (let x = Math.min(x1, x2); x <= Math.max(x1, x2); x++) {
      update(y1, x, 0);
      update(y1, x, 1);
    }
  } else {
    for (let i = 0; i <= Math.abs(x1 - x2); i++) {
      update(y1 < y2 ? y1 + i : y1 - i, x1 < x2 ? x1 + i : x1 - i, 1);
    }
  }
});

console.log(...counts);
