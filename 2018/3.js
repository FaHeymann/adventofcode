const input = require('fs').readFileSync('inputs/2018/3.txt').toString();

const grid = Array(1000);

for (let i = 0; i < 1000; i++) {
  grid[i] = Array(1000).fill(0);
}

input.split('\n').forEach(line => {
  const [_, id, yStart, xStart, yWidth, xWidth] = line.match(/^#([0-9]+) @ ([0-9]+),([0-9]+): ([0-9]+)x([0-9]+)$/).map(x => parseInt(x, 10));
  for (let y = yStart; y < yStart + yWidth; y++) {
    for (let x = xStart; x < xStart + xWidth; x++) {
      grid[y][x]++;
    }
  }
});

console.log(grid.reduce((sum, row) => sum + row.filter(e => e > 1).length, 0));

const grid2 = Array(1000);

for (let i = 0; i < 1000; i++) {
  grid2[i] = [];
  for (let j = 0; j < 1000; j++) {
    grid2[i][j] = [];
  }
}

const hasOverlap = Array(input.split('\n').length + 1).fill(false);

input.split('\n').forEach(line => {
  const [_, id, yStart, xStart, yWidth, xWidth] = line.match(/^#([0-9]+) @ ([0-9]+),([0-9]+): ([0-9]+)x([0-9]+)$/).map(x => parseInt(x, 10));
  for (let y = yStart; y < yStart + yWidth; y++) {
    for (let x = xStart; x < xStart + xWidth; x++) {
      if (grid2[y][x].length > 0) {
        hasOverlap[id] = true;
      }
      grid2[y][x].forEach(present => {
        hasOverlap[present] = true;
      });
      grid2[y][x].push(id);
    }
  }
});

console.log(hasOverlap.findIndex((v, i) => i !== 0 && !v));
