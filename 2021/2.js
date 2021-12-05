const input = require("fs")
  .readFileSync("inputs/2021/2.txt")
  .toString()
  .split("\n")
  .map((l) => l.split(" "));

let pos = [0, 0];

input.forEach((line) => {
  if (line[0] === "forward") {
    pos[0] += parseInt(line[1], 10);
  }
  if (line[0] === "down") {
    pos[1] += parseInt(line[1], 10);
  }
  if (line[0] === "up") {
    pos[1] -= parseInt(line[1], 10);
  }
});

console.log(pos[0] * pos[1]);

let aim = 0;
pos = [0, 0];

input.forEach((line) => {
  if (line[0] === "forward") {
    pos[0] += parseInt(line[1], 10);
    pos[1] += parseInt(line[1], 10) * aim;
  }
  if (line[0] === "down") {
    aim += parseInt(line[1], 10);
  }
  if (line[0] === "up") {
    aim -= parseInt(line[1], 10);
  }
});

console.log(pos[0] * pos[1]);
