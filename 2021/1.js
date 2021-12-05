const input = require("fs")
  .readFileSync("inputs/2021/1.txt")
  .toString()
  .split("\n")
  .map((x) => parseInt(x, 10));

let count = 0;

for (let i = 1; i < input.length; i++) {
  count += input[i - 1] < input[i] ? 1 : 0;
}

console.log(count);

count = 0;

for (let i = 3; i < input.length; i++) {
  count +=
    input[i - 3] + input[i - 2] + input[i - 1] <
    input[i - 2] + input[i - 1] + input[i]
      ? 1
      : 0;
}

console.log(count);
