const input = require("fs").readFileSync("inputs/2022/12.txt").toString();

const grid = input
  .split("\n")
  .map((line) => line.split("").map((c) => c.charCodeAt(0)));

const start = [0, 0];
const target = [0, 0];

for (let y = 0; y < grid.length; y++) {
  for (let x = 0; x < grid[0].length; x++) {
    if (grid[y][x] === "S".charCodeAt(0)) {
      grid[y][x] = "a".charCodeAt(0);
      start[0] = y;
      start[1] = x;
    }
    if (grid[y][x] === "E".charCodeAt(0)) {
      grid[y][x] = "z".charCodeAt(0);
      target[0] = y;
      target[1] = x;
    }
  }
}

const getNeighbors = (y, x) => {
  const result = [];
  if (y > 0) {
    result.push([y - 1, x]);
  }
  if (y < grid.length - 1) {
    result.push([y + 1, x]);
  }
  if (x > 0) {
    result.push([y, x - 1]);
  }
  if (x < grid[0].length - 1) {
    result.push([y, x + 1]);
  }

  return result;
};

let min = Number.MAX_SAFE_INTEGER

const solve = (yStart, xStart, logResult) => {
  const queue = [
    {
      pos: [yStart, xStart],
      steps: 0,
      height: "a".charCodeAt(0),
    },
  ];

  const visited = new Set();
  visited.add("0#0");

  const tick = () => {
    const state = queue.pop();
    const [y, x] = state.pos;
    const curHeight = grid[y][x];

    if (y === target[0] && x === target[1]) {
      if (logResult) {
        console.log(state.steps)
      }
      min = Math.min(min, state.steps)
      return true;
    }

    getNeighbors(y, x)
      .map((pos) => ({
        pos,
        steps: state.steps + 1,
        height: grid[pos[0]][pos[1]],
      }))
      .filter((s) => s.height <= curHeight + 1)
      .filter((s) => !visited.has(`${s.pos[0]}#${s.pos[1]}`))
      .forEach((s) => {
        queue.unshift(s)
        visited.add(`${s.pos[0]}#${s.pos[1]}`);
      });
  };

  while (queue.length > 0 && !tick()) {}
}

for (let y = 0; y < grid.length; y++) {
  for (let x = 0; x < grid[0].length; x++) {
    if (grid[y][x] === "a".charCodeAt(0)) {
      solve(y, x, y === start[0] && x === start[1])
    }
  }
}

console.log(min)
