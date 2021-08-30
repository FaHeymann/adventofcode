const levels = [];
const types = [];

const depth = 10689;
const targetY = 722;
const targetX = 11;

const modulo = 20183;

const typeMap = { 0: '.', 1: '=', 2: '|' };

const getGeologicalIndex = (y, x) => {
  if ((y === 0 && x === 0) || (y === targetY && x === targetX)) {
    return 0;
  } else if (y === 0) {
    return x * 16807;
  } else if (x === 0) {
    return y * 48271;
  }
  return levels[y - 1][x] * levels[y][x - 1];
}

for (let y = 0; y <= targetY; y++) {
  levels[y] = [];
  types[y] = [];
  for (let x = 0; x <= targetX; x++) {
    const level = (getGeologicalIndex(y, x) + depth) % modulo;
    levels[y][x] = level;
    types[y][x] = level % 3;
  }
}

console.log(types.reduce((sum, line) => sum + line.reduce((lineSum, e) => lineSum + e, 0), 0));
