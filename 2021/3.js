const input = require("fs")
  .readFileSync("inputs/2021/3.txt")
  .toString()
  .split("\n")
  .map((line) => line.split("").map((c) => parseInt(c, 10)));

const counts = new Array(input[0].length).fill(0);

input.forEach((line) => line.forEach((bit, i) => (counts[i] += bit)));

const gamma = parseInt(
  counts.map((bitCount) => (bitCount > 0.5 * input.length ? 1 : 0)).join(""),
  2
);
const eps = 2 ** input[0].length - 1 - gamma;

console.log(gamma * eps);

let oxy = [...input];
let pos = 0;

while (oxy.length > 1) {
  const count = oxy.reduce((cur, line) => cur + line[pos], 0);
  oxy = oxy.filter((line) => line[pos] === (count >= 0.5 * oxy.length ? 1 : 0));
  pos++;
}

let scrub = [...input];
pos = 0;

while (scrub.length > 1) {
  const count = scrub.reduce((cur, line) => cur + line[pos], 0);
  scrub = scrub.filter(
    (line) => line[pos] === (count < 0.5 * scrub.length ? 1 : 0)
  );
  pos++;
}

console.log(parseInt(oxy[0].join(""), 2) * parseInt(scrub[0].join(""), 2));
