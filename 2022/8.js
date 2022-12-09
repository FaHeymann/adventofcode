const input = require("fs")
  .readFileSync("inputs/2022/8.txt")
  .toString()
  .split("\n")
  .map((line) => line.split("").map((x) => parseInt(x, 10)));

let count = 0;
let max = 0;

for (let y = 0; y < input.length; y++) {
  for (let x = 0; x < input[0].length; x++) {
    const cur = input[y][x];
    const views = [y, input.length - y - 1, x, input[0].length - x - 1];
    const blocked = [false, false, false, false];

    for (let iy = y - 1; iy >= 0; iy--) {
      if (input[iy][x] >= cur) {
        views[0] = y - iy;
        blocked[0] = true;
        break;
      }
    }

    for (let iy = y + 1; iy < input.length; iy++) {
      if (input[iy][x] >= cur) {
        views[1] = iy - y;
        blocked[1] = true;
        break;
      }
    }

    for (let ix = x - 1; ix >= 0; ix--) {
      if (input[y][ix] >= cur) {
        views[2] = x - ix;
        blocked[2] = true;
        break;
      }
    }

    for (let ix = x + 1; ix < input[0].length; ix++) {
      if (input[y][ix] >= cur) {
        views[3] = ix - x;
        blocked[3] = true;
        break;
      }
    }

    if (blocked.reduce((prev, cur) => prev || !cur, false)) {
      count++;
    }

    max = Math.max(views[0] * views[1] * views[2] * views[3], max);
  }
}

console.log(count, max);
