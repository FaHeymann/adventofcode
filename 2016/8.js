const input = require('fs').readFileSync('inputs/2016/8.txt').toString();

let grid = [...Array(6).keys()].map(x => [...Array(50).keys()].map(x => ' '));

input.split('\n').forEach(line => {
  if (line.startsWith('rect')) {
    const [_, X, Y] = line.match(/^rect ([1-9]+)x([1-9]+)$/).map(x => parseInt(x, 10));
    for (let y = 0; y < Y; y++) {
      for (let x = 0; x < X; x++) {
        grid[y][x] = '#'
      }
    }
  }
  if (line.startsWith('rotate column')) {
    const [_, column, distance] = line.match(/^rotate column x=([0-9]+) by ([0-9]+)$/).map(x => parseInt(x, 10));
    const newGrid = grid.map(l => l.map(c => c));
    for (let i = 0; i < grid.length; i++) {
      newGrid[(i + distance) % grid.length][column] = grid[i][column];
    }
    grid = newGrid;
  }

  if (line.startsWith('rotate row')) {
    const [_, row, distance] = line.match(/^rotate row y=([0-9]+) by ([0-9]+)$/).map(x => parseInt(x, 10));
    const newRow = [];
    for (let i = 0; i < grid[0].length; i++) {
      newRow[(i + distance) % grid[0].length] = grid[row][i];
    }
    grid[row] = newRow;
  }
});

console.log(grid.map(l => l.join('')).join('\n'));
console.log(grid.reduce((sum, line) => sum + line.filter(c => c === '#').length, 0));


