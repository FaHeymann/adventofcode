const input = `..##.
..#..
##...
#....
...##`;

let state = new Set();

input.split('\n').forEach((line, y) => {
  line.split('').forEach((c, x) => {
    if (c === '#') {
      state.add(`0#${y}#${x}`);
    }
  });
});

const getNeighbors = (d, y, x) => {
  const neighbors = [];
  if (y === 0) {
    neighbors.push([d - 1, 1, 2]);
    neighbors.push([d, y + 1, x]);
  } else if (y === 4) {
    neighbors.push([d - 1, 3, 2]);
    neighbors.push([d, y - 1, x]);
  } else if (y === 1 && x === 2) {
    neighbors.push([d, y - 1, x]);
    neighbors.push([d + 1, 0, 0]);
    neighbors.push([d + 1, 0, 1]);
    neighbors.push([d + 1, 0, 2]);
    neighbors.push([d + 1, 0, 3]);
    neighbors.push([d + 1, 0, 4]);
  } else if (y === 3 && x === 2) {
    neighbors.push([d, y + 1, x]);
    neighbors.push([d + 1, 4, 0]);
    neighbors.push([d + 1, 4, 1]);
    neighbors.push([d + 1, 4, 2]);
    neighbors.push([d + 1, 4, 3]);
    neighbors.push([d + 1, 4, 4]);
  } else {
    neighbors.push([d, y - 1, x]);
    neighbors.push([d, y + 1, x]);
  }

  if (x === 0) {
    neighbors.push([d - 1, 2, 1]);
    neighbors.push([d, y, x + 1]);
  } else if (x === 4) {
    neighbors.push([d - 1, 2, 3]);
    neighbors.push([d, y, x - 1]);
  } else if (x === 1 && y === 2) {
    neighbors.push([d, y, x - 1]);
    neighbors.push([d + 1, 0, 0]);
    neighbors.push([d + 1, 1, 0]);
    neighbors.push([d + 1, 2, 0]);
    neighbors.push([d + 1, 3, 0]);
    neighbors.push([d + 1, 4, 0]);
  } else if (x === 3 && y === 2) {
    neighbors.push([d, y, x + 1]);
    neighbors.push([d + 1, 0, 4]);
    neighbors.push([d + 1, 1, 4]);
    neighbors.push([d + 1, 2, 4]);
    neighbors.push([d + 1, 3, 4]);
    neighbors.push([d + 1, 4, 4]);
  } else {
    neighbors.push([d, y, x - 1]);
    neighbors.push([d, y, x + 1]);
  }

  return neighbors;
};

const neighborsCount = (d, y, x) => getNeighbors(d, y, x).map(c => state.has(c.join('#'))).filter(c => c).length;

const step = () => {
  const next = new Set();
  state.forEach(entry => {
    const coord = entry.split('#').map(p => parseInt(p, 10));
    getNeighbors(...coord).forEach(neighbor => {
      if (state.has(neighbor.join('#')) && neighborsCount(...neighbor) === 1) {
        next.add(neighbor.join('#'));
      } else if (!state.has(neighbor.join('#')) && [1, 2].includes(neighborsCount(...neighbor))) {
        next.add(neighbor.join('#'));
      }
    })
  });
  state = next;
}

for (let i = 0; i < 200; i++) {
  step();
}

console.log(state.size);
