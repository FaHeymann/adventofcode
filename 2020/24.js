const input = require('fs').readFileSync('inputs/2020/24.txt').toString();

let map = {};

input.split('\n').forEach(line => {
  const moves = [];

  for (let i = 0; i < line.length; i++) {
    if (['n', 's'].includes(line.charAt(i))) {
      moves.push(`${line.charAt(i)}${line.charAt(i + 1)}`);
      i++;
    } else {
      moves.push(line.charAt(i));
    }
  }

  let coord = [0, 0, 0];

  const movesMap = {
    ne: () => { coord = [coord[0] + 1, coord[1] - 1, coord[2]] },
    sw: () => { coord = [coord[0] - 1, coord[1] + 1, coord[2]] },
    nw: () => { coord = [coord[0], coord[1] - 1, coord[2] + 1] },
    se: () => { coord = [coord[0], coord[1] + 1, coord[2] - 1] },
    e: () => { coord = [coord[0] + 1, coord[1], coord[2] - 1] },
    w: () => { coord = [coord[0] - 1, coord[1], coord[2] + 1] },
  }

  moves.forEach(move => {
    movesMap[move]();
  });

  if (!(coord.join('#') in map)) {
    map[coord.join('#')] = false;
  }

  map[coord.join('#')] = !map[coord.join('#')];
});

console.log(Object.values(map).filter(v => v).length);

const getNeighbors = coord => [
  [coord[0] + 1, coord[1] - 1, coord[2]],
  [coord[0] - 1, coord[1] + 1, coord[2]],
  [coord[0], coord[1] - 1, coord[2] + 1],
  [coord[0], coord[1] + 1, coord[2] - 1],
  [coord[0] + 1, coord[1], coord[2] - 1],
  [coord[0] - 1, coord[1], coord[2] + 1],
];

const isFlipped = coord => (coord.join('#') in map) && map[coord.join('#')];

const getFlippedNeigborCount = coord => getNeighbors(coord).reduce((sum, n) => sum + (isFlipped(n) ? 1 : 0), 0);

const step = () => {
  let nextMap = {};
  Object.keys(map).forEach(stringCoord => {
    if (!map[stringCoord]) {
      return;
    }
    const coord = stringCoord.split('#').map(a => parseInt(a, 10));
    if ([1, 2].includes(getFlippedNeigborCount(coord))) {
      nextMap[stringCoord] = true;
    }
    getNeighbors(coord).forEach(neighbor => {
      if (!isFlipped(neighbor) && getFlippedNeigborCount(neighbor) === 2) {
        nextMap[neighbor.join('#')] = true;
      }
    });
  });
  map = nextMap;
}

for (let i = 0; i < 100; i++) {
  step();
}

console.log(Object.values(map).filter(v => v).length);
