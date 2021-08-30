const input = require('fs').readFileSync('inputs/2019/20.txt').toString();

const raw = input.split('\n').map(l => l.split(''));

const grid = [];

const get = (y, x) => y >= 0 && x >= 0 && y < raw.length && x < raw[0].length ? raw[y][x] : ' ';
const isConnectedToGrid = (y, x) => [
  [y - 1, x],
  [y + 1, x],
  [y, x - 1],
  [y, x + 1],
].some(c => get(...c) === '.');

const findConnected = (y, x) => {
  const point = [
    [y - 1, x],
    [y + 1, x],
    [y, x - 1],
    [y, x + 1],
  ].find(c => get(...c) === '.');
  return { y: point[0], x: point[1] };
};

const portals = {};

let start;
let end;

for (let y = 0; y < raw.length; y++) {
  grid[y] = [];
  for (let x = 0; x < raw[0].length; x++) {
    if (raw[y][x].match(/[A-Z]/)) {
      let name;
      if (y - 1 >= 0 && raw[y - 1][x].match(/[A-Z]/)) {
        name = raw[y - 1][x] + raw[y][x];
      } else if (x - 1 >= 0 && raw[y][x - 1].match(/[A-Z]/)) {
        name = raw[y][x - 1] + raw[y][x];
      } else if (y + 1 < raw.length && raw[y + 1][x].match(/[A-Z]/)) {
        name = raw[y][x] + raw[y + 1][x];
      } else if (x + 1 < raw[0].length && raw[y][x + 1].match(/[A-Z]/)) {
        name = raw[y][x] + raw[y][x + 1];
      }
      if (!(name in portals)) {
        portals[name] = {};
      }
      if (isConnectedToGrid(y, x)) {
        if (y === 1 || x === 1 || y === raw.length - 2 || x === raw[0].length - 2) {
          portals[name].outer = {x, y};
        } else {
          portals[name].inner = {x, y};
        }
        grid[y][x] = 'P';
        if (name === 'AA') {
          start = findConnected(y, x);
          start.d = 0;
        }
        if (name === 'ZZ') {
          end = findConnected(y, x);
          end.d = 0;
        }
      } else {
        grid[y][x] = ' ';
      }
    } else {
       grid[y][x] = raw[y][x];
    }
  }
}

const resolve = p => {
  if (grid[p.y][p.x] === 'P') {
    let entry = Object.values(portals).find(portal => portal.outer.y === p.y && portal.outer.x === p.x);
    if (entry) {
      return entry.inner ? Object.assign({}, findConnected(entry.inner.y, entry.inner.x), { d: p.d - 1 }) : { d: 0, y: 0, x: 0};
    }

    entry = Object.values(portals).find(portal => portal.inner && portal.inner.y === p.y && portal.inner.x === p.x);
    return entry.outer ? Object.assign({}, findConnected(entry.outer.y, entry.outer.x), { d: p.d + 1 }) : { d: 0, y: 0, x: 0};
  }
  return p;
};

const dist = () => {
  const queue = [start];
  const distances = {};
  distances[`0#${start.y}#${start.x}`] = 0;

  while (queue.length > 0) {
    const t = queue.shift();
    if (t.d < 0) {
      continue;
    }
    if (t.y === portals.AA.outer.y && t.x === portals.AA.outer.x) {
      continue;
    }
    const dist = distances[`${t.d}#${t.y}#${t.x}`];
    if (t.y === end.y && t.x === end.x) {
      if (t.d === 0) {
        return dist;
      } else {
        continue;
      }
    }

    [
      {y: t.y - 1, x: t.x, d: t.d},
      {y: t.y, x: t.x - 1, d: t.d},
      {y: t.y, x: t.x + 1, d: t.d},
      {y: t.y + 1, x: t.x, d: t.d},
    ]
      .map(p => resolve(p))
      .filter(({ y, x, d }) => !(`${d}#${y}#${x}` in distances) && ['P', '.'].includes(grid[y][x]))
      .forEach(({ y, x, d }) => {
        distances[`${d}#${y}#${x}`] = dist + 1;
        queue.push({ d, y, x });
      });
  }
};

console.log(dist());
