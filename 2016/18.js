const input = '.^.^..^......^^^^^...^^^...^...^....^^.^...^.^^^^....^...^^.^^^...^^^^.^^.^.^^..^.^^^..^^^^^^.^^^..^';

let grid = [input.split('')];

for (let y = 1; y < 40; y++) {
  grid[y] = [];
  for (let x = 0; x < input.length; x++) {
    const left = x > 0 && grid[y - 1][x - 1] === '^';
    const center = grid[y - 1][x] === '^';
    const right = x < input.length - 1 && grid[y - 1][x + 1] === '^';

    grid[y][x] = (left && center && !right)
      || (!left && center && right)
      || (left && !center && !right)
      || (!left && !center && right)
      ? '^' : '.';
  }
}

console.log(grid.reduce((sum, row) => sum + row.filter(c => c === '.').length, 0));

// star2

grid = [input.split('')];

for (let y = 1; y < 400000; y++) {
  grid[y] = [];
  for (let x = 0; x < input.length; x++) {
    const left = x > 0 && grid[y - 1][x - 1] === '^';
    const center = grid[y - 1][x] === '^';
    const right = x < input.length - 1 && grid[y - 1][x + 1] === '^';

    grid[y][x] = (left && center && !right)
      || (!left && center && right)
      || (left && !center && !right)
      || (!left && !center && right)
      ? '^' : '.';
  }
}

console.log(grid.reduce((sum, row) => sum + row.filter(c => c === '.').length, 0));
