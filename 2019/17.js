const program = require('fs').readFileSync('inputs/2019/17.txt').toString().split(',').map(x => parseInt(x, 10));

const machine = require('./intcomp')(program, () => {});

const result = machine.runTillTermination();

let y = 0;
let x = 0;

const grid = [[]];

result.forEach(e => {
  if (e === 10) {
    y++;
    x = 0;
    grid[y] = [];
  } else {
    grid[y][x++] = String.fromCharCode(e);
  }
});

let sum = 0;

grid.forEach((line, y) => {
  line.forEach((e, x) => {
    if (y > 0 && x > 0 && y < grid.length - 1 && x < grid[0].length - 1 && grid[y][x] === '#' && grid[y - 1][x] === '#' && grid[y + 1][x] === '#' && grid[y][x - 1] === '#' && grid[y][x + 1] === '#') {
      sum += y * x;
    }
  });
});

console.log(sum);
