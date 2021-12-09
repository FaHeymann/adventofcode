const input = require("fs")
  .readFileSync("inputs/2021/9.txt")
  .toString()
  .split("\n")
  .map((l) => l.split("").map((n) => parseInt(n, 10)));

const get = (y, x) => {
  if (y < 0 || y >= input.length || x < 0 || x >= input[0].length) {
    return Number.POSITIVE_INFINITY;
  }
  return input[y][x];
};

const key = (y, x) => `${y}#${x}`;

let sum = 0;
const lowPoints = [];

input.forEach((line, y) => {
  line.forEach((v, x) => {
    if (
      v < get(y - 1, x) &&
      v < get(y + 1, x) &&
      v < get(y, x - 1) &&
      v < get(y, x + 1)
    ) {
      sum += v + 1;
      lowPoints.push({ y, x });
    }
  });
});

console.log(sum);

const rec = (y, x, visited = []) => {
  if (visited.includes(key(y, x)) || get(y, x) >= 9) {
    return;
  }
  visited.push(key(y, x));
  rec(y + 1, x, visited);
  rec(y - 1, x, visited);
  rec(y, x + 1, visited);
  rec(y, x - 1, visited);
  return visited;
};

const results = lowPoints.map((p) => rec(p.y, p.x, []).length);
results.sort((a, b) => (a > b ? -1 : 1));

console.log(results[0] * results[1] * results[2]);
