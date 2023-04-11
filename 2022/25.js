const input = require("fs").readFileSync("inputs/2022/25.txt").toString();

const toDecimal = (n) => {
  let factor = 1;
  let number = 0;

  const map = {
    "=": -2,
    "-": -1,
    0: 0,
    1: 1,
    2: 2,
  };

  n.split("")
    .reverse()
    .forEach((c) => {
      number += map[c] * factor;
      factor *= 5;
    });

  return number;
};

toSnafu = (n) => {
  const buffer = ["0", ...n.toString(5).split("")].map((n) => parseInt(n));
  for (let i = buffer.length - 1; i >= 0; i--) {
    const cur = buffer[i];
    if (cur === 3) {
      buffer[i - 1]++;
      buffer[i] = "=";
    }
    if (cur === 4) {
      buffer[i - 1]++;
      buffer[i] = "-";
    }
    if (cur === 5) {
      buffer[i - 1]++;
      buffer[i] = "0";
    }
  }

  return (buffer[0] === 0 ? buffer.slice(1) : buffer).join("");
};

let sum = 0;

input.split("\n").forEach((line) => {
  sum += toDecimal(line);
});

console.log(sum)
console.log(toSnafu(sum))
