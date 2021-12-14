const grid = require("fs")
  .readFileSync("inputs/2021/11.txt")
  .toString()
  .split("\n")
  .map((line) => line.split("").map((n) => parseInt(n, 10)));

let count = 0;
let count2 = 0;

const tick = (y, x) => {
  if (y < 0 || x < 0 || y >= grid.length || x >= grid[0].length) {
    return;
  }
  grid[y][x]++;
  if (grid[y][x] === 10) {
    count++;
    count2++;
    tick(y - 1, x);
    tick(y + 1, x);
    tick(y, x - 1);
    tick(y, x + 1);
    tick(y - 1, x - 1);
    tick(y + 1, x + 1);
    tick(y + 1, x - 1);
    tick(y - 1, x + 1);
  }
};

const step = () => {
  count2 = 0;
  grid.forEach((line, y) => {
    line.forEach((_, x) => {
      tick(y, x);
    });
  });
  grid.forEach((line, y) => {
    line.forEach((_, x) => {
      if (grid[y][x] > 9) {
        grid[y][x] = 0;
      }
    });
  });
};

for (let i = 0; true; i++) {
  step();
  if (i === 99) {
    console.log(count)
  }
  if (count2 === grid.length * grid[0].length) {
    console.log(i + 1)
    break;
  }
}
