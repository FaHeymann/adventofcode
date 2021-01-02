const rotate = grid => {
  newGrid = [];
  for (let y = 0; y < grid.length; y++) {
    newGrid[y] = [];
    for (let x = 0; x < grid.length; x++) {
      newGrid[y][x] = grid[x][grid.length - 1 - y];
    }
  }
  return newGrid;
}

const flip = grid => grid.map(line => [...line].reverse());

const splitIntoTwos = grid => {
  const out = [];
  for (let y = 0; y < grid.length; y += 2) {
    for(let x = 0; x < grid.length; x += 2) {
      out.push([
        [grid[y][x], grid[y][x + 1]],
        [grid[y + 1][x], grid[y + 1][x + 1]],
      ]);
    }
  }
  return out;
};

const splitIntoThrees = grid => {
  const out = [];
  for (let y = 0; y < grid.length; y += 3) {
    for(let x = 0; x < grid.length; x += 3) {
      out.push([
        [grid[y][x], grid[y][x + 1], grid[y][x + 2]],
        [grid[y + 1][x], grid[y + 1][x + 1], grid[y + 1][x + 2]],
        [grid[y + 2][x], grid[y + 2][x + 1], grid[y + 2][x + 2]],
      ]);
    }
  }
  return out;
};

const joinFours = fours => {
  const grid = [];
  const squaresPerSide = Math.sqrt(fours.length);
  for (let y = 0; y < squaresPerSide; y++) {
    grid[4 * y] = [];
    grid[4 * y + 1] = [];
    grid[4 * y + 2] = [];
    grid[4 * y + 3] = [];
    for (let x = 0; x < squaresPerSide; x++) {
      grid[4 * y + 0][4 * x + 0] = fours[y * squaresPerSide + x][0][0];
      grid[4 * y + 1][4 * x + 0] = fours[y * squaresPerSide + x][1][0];
      grid[4 * y + 2][4 * x + 0] = fours[y * squaresPerSide + x][2][0];
      grid[4 * y + 3][4 * x + 0] = fours[y * squaresPerSide + x][3][0];

      grid[4 * y + 0][4 * x + 1] = fours[y * squaresPerSide + x][0][1];
      grid[4 * y + 1][4 * x + 1] = fours[y * squaresPerSide + x][1][1];
      grid[4 * y + 2][4 * x + 1] = fours[y * squaresPerSide + x][2][1];
      grid[4 * y + 3][4 * x + 1] = fours[y * squaresPerSide + x][3][1];

      grid[4 * y + 0][4 * x + 2] = fours[y * squaresPerSide + x][0][2];
      grid[4 * y + 1][4 * x + 2] = fours[y * squaresPerSide + x][1][2];
      grid[4 * y + 2][4 * x + 2] = fours[y * squaresPerSide + x][2][2];
      grid[4 * y + 3][4 * x + 2] = fours[y * squaresPerSide + x][3][2];

      grid[4 * y + 0][4 * x + 3] = fours[y * squaresPerSide + x][0][3];
      grid[4 * y + 1][4 * x + 3] = fours[y * squaresPerSide + x][1][3];
      grid[4 * y + 2][4 * x + 3] = fours[y * squaresPerSide + x][2][3];
      grid[4 * y + 3][4 * x + 3] = fours[y * squaresPerSide + x][3][3];
    }
  }
  return grid;
}

const joinThrees = threes => {
  const grid = [];
  const squaresPerSide = Math.sqrt(threes.length);
  for (let y = 0; y < squaresPerSide; y++) {
    grid[3 * y] = [];
    grid[3 * y + 1] = [];
    grid[3 * y + 2] = [];
    for (let x = 0; x < squaresPerSide; x++) {
      grid[3 * y + 0][3 * x + 0] = threes[y * squaresPerSide + x][0][0];
      grid[3 * y + 1][3 * x + 0] = threes[y * squaresPerSide + x][1][0];
      grid[3 * y + 2][3 * x + 0] = threes[y * squaresPerSide + x][2][0];

      grid[3 * y + 0][3 * x + 1] = threes[y * squaresPerSide + x][0][1];
      grid[3 * y + 1][3 * x + 1] = threes[y * squaresPerSide + x][1][1];
      grid[3 * y + 2][3 * x + 1] = threes[y * squaresPerSide + x][2][1];

      grid[3 * y + 0][3 * x + 2] = threes[y * squaresPerSide + x][0][2];
      grid[3 * y + 1][3 * x + 2] = threes[y * squaresPerSide + x][1][2];
      grid[3 * y + 2][3 * x + 2] = threes[y * squaresPerSide + x][2][2];
    }
  }
  return grid;
}

const input = require('fs').readFileSync('inputs/2017/21.txt').toString();

const rules = {};

input.split('\n').forEach(line => {
  rules[line.split(' => ')[0]] = line.split(' => ')[1];
});

const applyRules = splitGrid => {
  const result = [];
  splitGrid.forEach(chunk => {
    if (chunk.map(l => l.join('')).join('/') in rules) {
      result.push(rules[chunk.map(l => l.join('')).join('/')].split('/').map(l => l.split('')));
      return;
    }

    ['r', 'r', 'r', 'f', 'r', 'r', 'r'].some(action => {
      chunk = action === 'r' ? rotate(chunk) : flip(chunk);
      if (chunk.map(l => l.join('')).join('/') in rules) {
        result.push(rules[chunk.map(l => l.join('')).join('/')].split('/').map(l => l.split('')));
        return true;
      }
      return false;
    });
  });
  return result;
};

let picture = [
  '.#.'.split(''),
  '..#'.split(''),
  '###'.split(''),
]

for (let i = 0; i < 5; i++) {
  if (picture.length % 2 === 0) {
    picture = splitIntoTwos(picture);
    picture = applyRules(picture);
    picture = joinThrees(picture);
  } else if (picture.length % 3 === 0) {
    picture = splitIntoThrees(picture);
    picture = applyRules(picture);
    picture = joinFours(picture);
  }
}

console.log(picture.reduce((sum, line) => sum + line.filter(c => c === '#').length, 0));

picture = [
  '.#.'.split(''),
  '..#'.split(''),
  '###'.split(''),
]

for (let i = 0; i < 18; i++) {
  if (picture.length % 2 === 0) {
    picture = splitIntoTwos(picture);
    picture = applyRules(picture);
    picture = joinThrees(picture);
  } else if (picture.length % 3 === 0) {
    picture = splitIntoThrees(picture);
    picture = applyRules(picture);
    picture = joinFours(picture);
  }
}

console.log(picture.reduce((sum, line) => sum + line.filter(c => c === '#').length, 0));
