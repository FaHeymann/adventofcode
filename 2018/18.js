const input = require('fs').readFileSync('inputs/2018/18.txt').toString();
let grid = input.split('\n').map(line => line.split(''));

const isOpen = (y, x) => y >= 0 && y < grid.length && x >= 0 && x < grid[0].length && grid[y][x] === '.';
const isLumberyard = (y, x) => y >= 0 && y < grid.length && x >= 0 && x < grid[0].length && grid[y][x] === '#';
const isWooded = (y, x) => y >= 0 && y < grid.length && x >= 0 && x < grid[0].length && grid[y][x] === '|';

const countNeighbors = (y, x, f) =>
  (f(y - 1, x - 1, -1, -1) ? 1 : 0)
  + (f(y - 1, x, -1, 0) ? 1 : 0)
  + (f(y - 1, x + 1, -1, 1) ? 1 : 0)
  + (f(y, x - 1, 0, -1) ? 1 : 0)
  + (f(y, x + 1, 0, 1) ? 1 : 0)
  + (f(y + 1, x - 1, 1, -1) ? 1 : 0)
  + (f(y + 1, x, 1, 0) ? 1 : 0)
  + (f(y + 1, x + 1, 1, 1) ? 1 : 0);

// const countOpenNeighboors = (y, x) => countNeighbors(y, x, isOpen);
const countLumberyardNeighboors = (y, x) => countNeighbors(y, x, isLumberyard);
const countWoodedNeighboors = (y, x) => countNeighbors(y, x, isWooded);

const step = () => {
  const next = [];
  for (let y = 0; y < grid.length; y++) {
    next[y] = [];
    for (let x = 0; x < grid[0].length; x++) {
      if (grid[y][x] === '.') {
        next[y][x] = countWoodedNeighboors(y, x) > 2 ? '|' : '.';
      } else if (grid[y][x] === '|') {
        next[y][x] = countLumberyardNeighboors(y, x) > 2 ? '#' : '|';
      } else if (grid[y][x] === '#') {
        next[y][x] = countLumberyardNeighboors(y, x) > 0 && countWoodedNeighboors(y, x) > 0 ? '#' : '.';
      }
    }
  }
  grid = next;
}

for (let i = 0; i < 10; i++) {
  step();
}

let lumberyardCount = grid.reduce((sum, l) => sum + l.filter(e => e === '#').length, 0);
let woodedCount = grid.reduce((sum, l) => sum + l.filter(e => e === '|').length, 0);
console.log(lumberyardCount * woodedCount);

const serializeGrid = () => grid.map(line => line.join('')).join('');

const configurations = {};

for (let i = 10; i < 1000000000; i++) {
  if (serializeGrid() in configurations) {
    const period = i - configurations[serializeGrid()];
    i += Math.floor((1000000000 - i) / period) * period;
  }
  configurations[serializeGrid()] = i;
  step();
}

lumberyardCount = grid.reduce((sum, l) => sum + l.filter(e => e === '#').length, 0);
woodedCount = grid.reduce((sum, l) => sum + l.filter(e => e === '|').length, 0);
console.log(lumberyardCount * woodedCount);
