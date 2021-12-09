const input = require("fs")
  .readFileSync("inputs/2021/6.txt")
  .toString()
  .split(",")
  .map((n) => parseInt(n, 10));

let state = new Array(9).fill(0);
input.forEach((i) => state[i]++);

const step = () => {
  const newState = new Array(9).fill(0);
  state.forEach((val, pos) => {
    if (pos === 0) {
      newState[6] += val;
      newState[8] += val;
    } else {
      newState[pos - 1] += val;
    }
  });
  state = newState;
};

for (let i = 0; i < 80; i++) {
  step();
}

console.log(state.reduce((sum, cur) => sum + cur, 0));

for (let i = 0; i < 256 - 80; i++) {
  step();
}

console.log(state.reduce((sum, cur) => sum + cur, 0));
