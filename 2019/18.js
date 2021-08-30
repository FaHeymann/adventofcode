const input = require('fs').readFileSync('inputs/2019/18.txt').toString();

let start = { keys: [] };
let keyCount = 0;

const grid = input.split('\n').map((l, y) => l.split('').map((c, x) => {
  if (c === '@') {
    start.y = y;
    start.x = x;
    return '.';
  } else if (c.match(/[a-z]/)) {
    keyCount++;
  }
  return c;
}));

const serialize = state => `${state.y}#${state.x}#${state.keys.join(',')}`;

const queue = [start];
const distances = {};
distances[serialize(start)] = 0;

while (queue.length > 0) {
  const t = queue.shift();
  const d = distances[serialize(t)];

  if (t.keys.length === keyCount) {
    console.log(d);
    break;
  }

  [
    {y: t.y - 1, x: t.x},
    {y: t.y, x: t.x - 1},
    {y: t.y, x: t.x + 1},
    {y: t.y + 1, x: t.x},
  ]
    .forEach(({ x, y }) => {
      const f = grid[y][x];
      let keys = t.keys;
      if (f === '#') {
        return;
      }

      if (f.match(/[a-z]/) && !keys.includes(f)) {
        keys = [...keys];
        keys.push(f);
        keys.sort();
      }

      if (f.match(/[A-Z]/) && !keys.includes(f.toLowerCase())) {
        return;
      }

      if (serialize({ y, x, keys }) in distances) {
        return;
      }

      distances[serialize({ y, x, keys })] = d + 1;
      queue.push({ y, x, keys });
    });
}
