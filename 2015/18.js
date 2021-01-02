const input = require('fs').readFileSync('inputs/2015/18.txt').toString();

let grid = input.split('\n').map(line => line.split('').map(c => c === '#'));

const getValue = (y, x, grid) => y < 0 || y >= grid.length || x < 0 || x >= grid[0].length ? false : grid[y][x];
const getLitNeighbors = (y, x, grid) =>
  (getValue(y - 1, x - 1, grid) ? 1 : 0)
  + (getValue(y - 1, x, grid) ? 1 : 0)
  + (getValue(y - 1, x + 1, grid) ? 1 : 0)
  + (getValue(y, x - 1, grid) ? 1 : 0)
  + (getValue(y, x + 1, grid) ? 1 : 0)
  + (getValue(y + 1, x - 1, grid) ? 1 : 0)
  + (getValue(y + 1, x, grid) ? 1 : 0)
  + (getValue(y + 1, x + 1, grid) ? 1 : 0);

let step = grid => {
  const next = [];
  for (let y = 0; y < grid.length; y++) {
    next[y] = [];
    for (let x = 0; x < grid[0].length; x++) {
      if (grid[y][x]) {
        next[y][x] = [2, 3].includes(getLitNeighbors(y, x, grid));
      } else {
        next[y][x] = 3 === getLitNeighbors(y, x, grid);
      }
    }
  }
  return next;
}

for (let i = 0; i < 100; i++) {
  grid = step(grid);
}
console.log(grid.reduce((sum, row) => sum + row.filter(x => x).length,0));


// star2
grid = input.split('\n').map(line => line.split('').map(c => c === '#'));
grid[0][0] = true;
grid[0][99] = true;
grid[99][0] = true;
grid[99][99] = true;

step = grid => {
  const next = [];
  for (let y = 0; y < grid.length; y++) {
    next[y] = [];
    for (let x = 0; x < grid[0].length; x++) {
      if (grid[y][x]) {
        next[y][x] = [2, 3].includes(getLitNeighbors(y, x, grid));
      } else {
        next[y][x] = 3 === getLitNeighbors(y, x, grid);
      }
    }
  }

  next[0][0] = true;
  next[0][99] = true;
  next[99][0] = true;
  next[99][99] = true;
  return next;
}

for (let i = 0; i < 100; i++) {
  grid = step(grid);
}
console.log(grid.reduce((sum, row) => sum + row.filter(x => x).length,0));
