const input = require('fs').readFileSync('inputs/2020/11.txt').toString();;

const star1 = () => {
  let grid = input.split('\n').map(line => line.split(''));

  const getValue = (y, x, grid) => y < 0 || y >= grid.length || x < 0 || x >= grid[0].length ? false : grid[y][x] === '#';
  const getLitNeighbors = (y, x, grid) =>
    (getValue(y - 1, x - 1, grid) ? 1 : 0)
    + (getValue(y - 1, x, grid) ? 1 : 0)
    + (getValue(y - 1, x + 1, grid) ? 1 : 0)
    + (getValue(y, x - 1, grid) ? 1 : 0)
    + (getValue(y, x + 1, grid) ? 1 : 0)
    + (getValue(y + 1, x - 1, grid) ? 1 : 0)
    + (getValue(y + 1, x, grid) ? 1 : 0)
    + (getValue(y + 1, x + 1, grid) ? 1 : 0);

  const step = grid => {
    const next = [];
    let change = false;
    for (let y = 0; y < grid.length; y++) {
      next[y] = [];
      for (let x = 0; x < grid[0].length; x++) {
        if (grid[y][x] === 'L' && getLitNeighbors(y, x, grid) === 0) {
          next[y][x] = '#';
          change = true;
        } else if (grid[y][x] === '#' && getLitNeighbors(y, x, grid) >= 4) {
          next[y][x] = 'L';
          change = true;
        } else {
          next[y][x] = grid[y][x];
        }
      }
    }
    return [next, change];
  }

  let change = true;

  while (change) {
    [grid, change] = step(grid);
  }

  console.log(grid.reduce((sum, row) => sum + row.filter(x => x === '#').length, 0));
}

star1();

let grid = input.split('\n').map(line => line.split(''));

const getValue = (y, x, deltaY, deltaX, grid) => {
  if (y < 0 || y >= grid.length || x < 0 || x >= grid[0].length) {
    return false;
  }
  if (grid[y][x] === '#') {
    return true;
  }
  if (grid[y][x] === 'L') {
    return false;
  }
  return getValue(y + deltaY, x + deltaX, deltaY, deltaX, grid);
};

const getLitNeighbors = (y, x, grid) =>
  (getValue(y - 1, x - 1, -1, -1, grid) ? 1 : 0)
  + (getValue(y - 1, x, -1, 0, grid) ? 1 : 0)
  + (getValue(y - 1, x + 1, -1, 1, grid) ? 1 : 0)
  + (getValue(y, x - 1, 0, -1, grid) ? 1 : 0)
  + (getValue(y, x + 1, 0, 1, grid) ? 1 : 0)
  + (getValue(y + 1, x - 1, 1, -1, grid) ? 1 : 0)
  + (getValue(y + 1, x, 1, 0, grid) ? 1 : 0)
  + (getValue(y + 1, x + 1, 1, 1, grid) ? 1 : 0);

const step = grid => {
  const next = [];
  let change = false;
  for (let y = 0; y < grid.length; y++) {
    next[y] = [];
    for (let x = 0; x < grid[0].length; x++) {
      if (grid[y][x] === 'L' && getLitNeighbors(y, x, grid) === 0) {
        next[y][x] = '#';
        change = true;
      } else if (grid[y][x] === '#' && getLitNeighbors(y, x, grid) >= 5) {
        next[y][x] = 'L';
        change = true;
      } else {
        next[y][x] = grid[y][x];
      }
    }
  }
  return [next, change];
}

let change = true;

while (change) {
  [grid, change] = step(grid);
}

console.log(grid.reduce((sum, row) => sum + row.filter(x => x === '#').length, 0));
