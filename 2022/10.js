const input = require("fs").readFileSync("inputs/2022/10.txt").toString();

let x = 1;
let i = 1;
let sum = 0;
const picture = [];

const tick = () => {
  picture.push([x - 1, x, x + 1].includes((i % 40) - 1) ? "#" : ".");

  if ([20, 60, 100, 140, 180, 220].includes(i)) {
    sum += i * x;
  }
  i++;
};

input.split("\n").forEach((line) => {
  if (line === "noop") {
    tick();
  } else {
    const change = parseInt(line.split(" ")[1], 10);
    tick();
    tick();
    x += change;
  }
});

console.log(sum);
for (let i = 0; i < 6; i += 1) {
  console.log(picture.join("").substring(i * 40, i * 40 + 39));
}
