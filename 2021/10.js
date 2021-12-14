const input = require("fs")
  .readFileSync("inputs/2021/10.txt")
  .toString()
  .split("\n")
  .map((l) => l.split(""));

const match = {
  "(": ")",
  "[": "]",
  "{": "}",
  "<": ">",
};

const points = {
  ")": 3,
  "]": 57,
  "}": 1197,
  ">": 25137,
};

const points2 = {
  "]": 2,
  ")": 1,
  "}": 3,
  ">": 4,
};

let sum = 0;
let scores = [];

input.forEach((l) => {
  let stack = [];
  l.some((c) => {
    if (Object.keys(match).includes(c)) {
      stack.push(c);
      return false;
    }
    const open = stack.pop();
    if (match[open] === c) {
      return false;
    }
    sum += points[c];
    stack = [];
    return true;
  });
  if (stack.length > 0) {
    scores.push(
      stack.reverse().reduce((total, c) => total * 5 + points2[match[c]], 0)
    );
  }
});

scores.sort((a, b) => (a < b ? 1 : -1));
console.log(sum);
console.log(scores[Math.floor(scores.length / 2)]);
