const input = require("fs")
  .readFileSync("inputs/2021/7.txt")
  .toString()
  .split(",")
  .map((n) => parseInt(n, 10));

const fuelReq = (x) => input.reduce((sum, cur) => sum + Math.abs(x - cur), 0);
const fuelReq2 = (x) =>
  input.reduce(
    (sum, cur) => sum + (Math.abs(x - cur) * (Math.abs(x - cur) + 1)) / 2,
    0
  );

let last = Number.POSITIVE_INFINITY;

for (let i = Math.min(...input); true; i++) {
  const cur = fuelReq(i);
  if (cur > last) {
    console.log(last);
    break;
  }
  last = cur;
}

last = Number.POSITIVE_INFINITY;

for (let i = Math.min(...input); true; i++) {
  const cur = fuelReq2(i);
  if (cur > last) {
    console.log(last);
    break;
  }
  last = cur;
}
