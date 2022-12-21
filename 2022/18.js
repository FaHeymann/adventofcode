const input = require("fs").readFileSync("inputs/2022/18.txt").toString();

const cubes = input
  .split("\n")
  .map((c) => c.split(",").map((x) => parseInt(x, 10)));

const maxs = [
  Math.max(...cubes.map((c) => c[0])),
  Math.max(...cubes.map((c) => c[1])),
  Math.max(...cubes.map((c) => c[2])),
];

let count = 0;

cubes.forEach((cube) => {
  [
    [-1, 0, 0],
    [1, 0, 0],
    [0, -1, 0],
    [0, 1, 0],
    [0, 0, -1],
    [0, 0, 1],
  ].forEach((delta) => {
    if (
      !cubes.some(
        (s) =>
          s[0] === cube[0] + delta[0] &&
          s[1] === cube[1] + delta[1] &&
          s[2] === cube[2] + delta[2]
      )
    ) {
      count++;
    }
  });
});

console.log(count);

const outside = new Set();
const queue = [[0, 0, 0]];

tick = () => {
  const cur = queue.pop();
  if (outside.has(`${cur[0]}#${cur[1]}#${cur[2]}`)) {
    return;
  }

  if (
    cubes.some((s) => s[0] === cur[0] && s[1] === cur[1] && s[2] === cur[2])
  ) {
    return;
  }
  if (
    cur[0] < -1 ||
    cur[0] > maxs[0] + 1 ||
    cur[1] < -1 ||
    cur[1] > maxs[1] + 1 ||
    cur[2] < -1 ||
    cur[2] > maxs[2] + 1
  ) {
    return;
  }

  outside.add(`${cur[0]}#${cur[1]}#${cur[2]}`);
  queue.push([cur[0] - 1, cur[1], cur[2]]);
  queue.push([cur[0] + 1, cur[1], cur[2]]);
  queue.push([cur[0], cur[1] - 1, cur[2]]);
  queue.push([cur[0], cur[1] + 1, cur[2]]);
  queue.push([cur[0], cur[1], cur[2] - 1]);
  queue.push([cur[0], cur[1], cur[2] + 1]);
};

while (queue.length > 0) {
  tick();
}

count = 0;

cubes.forEach((cube) => {
  [
    [-1, 0, 0],
    [1, 0, 0],
    [0, -1, 0],
    [0, 1, 0],
    [0, 0, -1],
    [0, 0, 1],
  ].forEach((delta) => {
    if (
      outside.has(
        `${cube[0] + delta[0]}#${cube[1] + delta[1]}#${cube[2] + delta[2]}`
      )
    ) {
      count++;
    }
  });
});

console.log(count);
