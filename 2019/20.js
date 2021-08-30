const input = require('fs').readFileSync('inputs/2019/20.txt').toString();

const raw = input.split('\n').map(l => l.split(''));

console.log(raw.map(l => l.join('')).join('\n'));

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
        portals[name] = [];
      }
      if (isConnectedToGrid(y, x)) {
        portals[name].push({ y, x });
        grid[y][x] = 'P';
        if (name === 'AA') {
          start = findConnected(y, x);
        }
        if (name === 'ZZ') {
          end = findConnected(y, x);
        }
      } else {
        grid[y][x] = ' ';
      }
    } else {
       grid[y][x] = raw[y][x];
    }
  }
}

console.log(grid.map(l => l.join('')).join('\n'));
console.log(portals);

const resolve = p => {
  if (grid[p.y][p.x] === 'P') {
    const entry = Object.values(portals).find(portal => portal.some(e => e.y === p.y && e.x === p.x));
    if (entry.length === 1 || (entry[1].y === p.y && entry[1].x === p.x)) {
      // console.log(findConnected(entry[0].y, entry[0].x));
      return findConnected(entry[0].y, entry[0].x);
    }
    // console.log(findConnected(entry[0].y, entry[0].x));
    return findConnected(entry[1].y, entry[1].x);
  }
  return p;
};

// console.log(resolve({ y: 21, x: 25 }));

const dist = () => {
  const queue = [start];
  const distances = {};
  distances[`${start.y}#${start.x}`] = 0;

  while (queue.length > 0) {
    const t = queue.shift();
    if (t.y === portals.AA[0].y && t.x === portals.AA[0].x) {
      continue;
    }
    const d = distances[`${t.y}#${t.x}`];
    if (t.y === end.y && t.x === end.x) {
      // console.log(distances);
      console.log(grid.map((l, y) => l.map((c, x) => `${y}#${x}` in distances ?  distances[`${y}#${x}`] % 10 : c).join('')).join('\n'));
      return d;
    }

    [
      {y: t.y - 1, x: t.x},
      {y: t.y, x: t.x - 1},
      {y: t.y, x: t.x + 1},
      {y: t.y + 1, x: t.x},
    ]
      .map(p => resolve(p))
      .filter(({ y, x }) => !(`${y}#${x}` in distances) && ['P', '.'].includes(grid[y][x]))
      .forEach(({ y, x }) => {
        distances[`${y}#${x}`] = d + 1;
        queue.push({ y, x });
      });
  }

  console.log(grid.map((l, y) => l.map((c, x) => `${y}#${x}` in distances ?  distances[`${y}#${x}`] % 10 : c).join('')).join('\n'));
};


console.log(dist());

console.log()
