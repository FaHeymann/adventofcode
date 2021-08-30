const input = require('fs').readFileSync('inputs/2019/18_2.txt').toString();

let start = { y: [], x: [], keys: [], lastMoved: -1 };
let keyCount = 0;

const grid = input.split('\n').map((l, y) => l.split('').map((c, x) => {
  if (c === '@') {
    start.y.push(y);
    start.x.push(x);
    return '.';
  } else if (c.match(/[a-z]/)) {
    keyCount++;
  }
  return c;
}));

const serialize = state => `${state.y.join(',')}#${state.x.join(',')}#${state.keys.join(',')}`;

const queue = [start];
const distances = new Map();
const foundAt = new Map();
distances.set(serialize(start), 0);

while (queue.length > 0) {
  const t = queue.shift();
  const d = distances.get(serialize(t));

  if (t.keys.length === keyCount) {
    console.log(d);
    break;
  }

  if (foundAt.has(t.keys.join(',')) && foundAt.get(t.keys.join(',')) < d - 250) {
    continue;
  }

  let moves = [];

  if ([-1, 0].includes(t.lastMoved) || grid[t.y[t.lastMoved]][t.x[t.lastMoved]].match(/[a-z]/)) {
    moves = moves.concat([
      {y: [t.y[0] - 1, t.y[1], t.y[2], t.y[3]], x: t.x, lastMoved: 0},
      {y: [t.y[0] + 1, t.y[1], t.y[2], t.y[3]], x: t.x, lastMoved: 0},
      {y: t.y, x: [t.x[0] - 1, t.x[1], t.x[2], t.x[3]], lastMoved: 0},
      {y: t.y, x: [t.x[0] + 1, t.x[1], t.x[2], t.x[3]], lastMoved: 0},
    ]);
  }

  if ([-1, 1].includes(t.lastMoved) || grid[t.y[t.lastMoved]][t.x[t.lastMoved]].match(/[a-z]/)) {
    moves = moves.concat([
      {y: [t.y[0], t.y[1] - 1, t.y[2], t.y[3]], x: t.x, lastMoved: 1},
      {y: [t.y[0], t.y[1] + 1, t.y[2], t.y[3]], x: t.x, lastMoved: 1},
      {y: t.y, x: [t.x[0], t.x[1] - 1, t.x[2], t.x[3]], lastMoved: 1},
      {y: t.y, x: [t.x[0], t.x[1] + 1, t.x[2], t.x[3]], lastMoved: 1},
    ]);
  }

  if ([-1, 2].includes(t.lastMoved) || grid[t.y[t.lastMoved]][t.x[t.lastMoved]].match(/[a-z]/)) {
    moves = moves.concat([
      {y: [t.y[0], t.y[1], t.y[2] - 1, t.y[3]], x: t.x, lastMoved: 2},
      {y: [t.y[0], t.y[1], t.y[2] + 1, t.y[3]], x: t.x, lastMoved: 2},
      {y: t.y, x: [t.x[0], t.x[1], t.x[2] - 1, t.x[3]], lastMoved: 2},
      {y: t.y, x: [t.x[0], t.x[1], t.x[2] + 1, t.x[3]], lastMoved: 2},
    ]);
  }

  if ([-1, 3].includes(t.lastMoved) || grid[t.y[t.lastMoved]][t.x[t.lastMoved]].match(/[a-z]/)) {
    moves = moves.concat([
      {y: [t.y[0], t.y[1], t.y[2], t.y[3] - 1], x: t.x, lastMoved: 3},
      {y: [t.y[0], t.y[1], t.y[2], t.y[3] + 1], x: t.x, lastMoved: 3},
      {y: t.y, x: [t.x[0], t.x[1], t.x[2], t.x[3] - 1], lastMoved: 3},
      {y: t.y, x: [t.x[0], t.x[1], t.x[2], t.x[3] + 1], lastMoved: 3},
    ]);
  }

  moves
    .forEach(({ y, x, lastMoved }) => {
      let keys = t.keys;

      for (let i = 0; i < 4; i++) {
        const f = grid[y[i]][x[i]];

        if (f === '#') {
          return;
        }

        if (f.match(/[a-z]/) && !keys.includes(f)) {
          keys = [...keys];
          keys.push(f);
          keys.sort();
          if (!foundAt.has(keys.join(','))) {
            foundAt.set(keys.join(','), d);
          }
        }

        if (f.match(/[A-Z]/) && !keys.includes(f.toLowerCase())) {
          return;
        }
      }

      if (distances.has(serialize({ y, x, keys }))) {
        return;
      }

      distances.set(serialize({ y, x, keys }), d + 1);
      queue.push({ y, x, keys, lastMoved });
    });
}
