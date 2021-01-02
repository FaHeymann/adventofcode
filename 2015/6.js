const input = require('fs').readFileSync('inputs/2015/6.txt').toString();

const star1 = () => {
  const grid = [];

  for (let y = 0; y < 1000; y++) {
    grid[y] = Array(1000).fill(0);
  }

  input.split('\n').forEach(line => {
    const [_, y1, x1, y2, x2] = line.match(/([0-9]{1,3}),([0-9]{1,3}) through ([0-9]{1,3}),([0-9]{1,3})/i);
    for (let y = Math.min(y1, y2); y <= Math.max(y1, y2); y++) {
      for (let x = Math.min(x1, x2); x <= Math.max(x1, x2); x++) {
        if (line.includes('on')) {
          grid[y][x] = 1;
        } else if (line.includes('off')) {
          grid[y][x] = 0;
        } else if (line.includes('toggle')) {
          grid[y][x] = grid[y][x] > 0 ? 0 : 1;
        }
      }
    }
  });

  console.log(grid.reduce((sum, line) => sum + line.reduce((innerSum, cur) => innerSum + cur, 0), 0));
}

star1();

const grid = [];

for (let y = 0; y < 1000; y++) {
  grid[y] = Array(1000).fill(0);
}

input.split('\n').forEach(line => {
  const [_, y1, x1, y2, x2] = line.match(/([0-9]{1,3}),([0-9]{1,3}) through ([0-9]{1,3}),([0-9]{1,3})/i);
  for (let y = Math.min(y1, y2); y <= Math.max(y1, y2); y++) {
    for (let x = Math.min(x1, x2); x <= Math.max(x1, x2); x++) {
      if (line.includes('on')) {
        grid[y][x] = grid[y][x] + 1;
      } else if (line.includes('off')) {
        grid[y][x] = Math.max(0, grid[y][x] - 1);
      } else if (line.includes('toggle')) {
        grid[y][x] = grid[y][x] + 2;
      }
    }
  }
});

console.log(grid.reduce((sum, line) => sum + line.reduce((innerSum, cur) => innerSum + cur, 0), 0));
