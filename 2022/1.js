const elves = require("fs")
  .readFileSync("inputs/2022/1.txt")
  .toString()
  .split("\n\n")
  .map((l) => l.split("\n").map((n) => parseInt(n, 10)));

const sums = elves.map((e) => e.reduce((acc, cur) => acc + cur, 0));

const max = sums.reduce(
  (acc, cur) => Math.max(acc, cur),
  Number.NEGATIVE_INFINITY
);
console.log(max);

sums.sort((a, b) => b - a);
console.log(sums[0] + sums[1] + sums[2]); 
