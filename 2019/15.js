const program = require('fs').readFileSync('inputs/2019/15.txt').toString().split(',').map(x => parseInt(x, 10));

const grid = { '0#0': 'D' };

let y = 0;
let x = 0;
let dir = 'S';

const dirMap = {
  N: { L: 'W', R: 'E' },
  S: { L: 'E', R: 'W' },
  E: { L: 'N', R: 'S' },
  W: { L: 'S', R: 'N' },
};

let input;

const moveMap = { N: 1, S: 2, W: 3, E: 4 };

const machine = require('./intcomp')(program, () => moveMap[input]);

let targetX;
let targetY;

const step = dir => {
  input = dir;
  const output = machine.runTillOutput();

  if (output === 0) {
    if (dir === 'N') {
      grid[`${y - 1}#${x}`] = '#';
    } else if (dir === 'S') {
      grid[`${y + 1}#${x}`] = '#';
    } else if (dir === 'E') {
      grid[`${y}#${x + 1}`] = '#';
    } else if (dir === 'W') {
      grid[`${y}#${x - 1}`] = '#';
    }
  } else {
    if (dir === 'N') {
      grid[`${y}#${x}`] = '.';
      y--;
      grid[`${y}#${x}`] = 'D';
    } else if (dir === 'S') {
      grid[`${y}#${x}`] = '.';
      y++;
      grid[`${y}#${x}`] = 'D';
    } else if (dir === 'E') {
      grid[`${y}#${x}`] = '.';
      x++;
      grid[`${y}#${x}`] = 'D';
    } else if (dir === 'W') {
      grid[`${y}#${x}`] = '.';
      x--;
      grid[`${y}#${x}`] = 'D';
    }
  }

  if (output === 2) {
    console.log('target found at', y, x);
    targetX = x;
    targetY = y;
  }
  return output;
}

const followWall = () => {
  dir = dirMap[dir]['R'];
  while (true) {
    const result = step(dir);
    if (result === 0) {
      dir = dirMap[dir]['L'];
    } else {
      break;
    }
  }
}

for (let i = 0; i === 0 || x !== 0 || y !== 0; i++) {
  followWall();
}

const print = () => {
  for (let y = Math.min(...Object.keys(grid).map(a => parseInt(a.split('#')[0], 10))); y <= Math.max(...Object.keys(grid).map(a => parseInt(a.split('#')[0], 10))); y++) {
    let line = '';
    for (let x = Math.min(...Object.keys(grid).map(a => parseInt(a.split('#')[1], 10))); x <= Math.max(...Object.keys(grid).map(a => parseInt(a.split('#')[1], 10))); x++) {
      line += `${y}#${x}` in grid ? grid[`${y}#${x}`] : '?';
    }
    console.log(line);
  }
};

print();

const dist = (p1, p2) => {
  const queue = [p1];
  const distances = {};
  distances[`${p1.y}#${p1.x}`] = 0;

  while (queue.length > 0) {
    const t = queue.shift();
    const d = distances[`${t.y}#${t.x}`];
    if (t.y === p2.y && t.x === p2.x) {
      return d;
    }

    [
      [t.y - 1, t.x],
      [t.y, t.x - 1],
      [t.y, t.x + 1],
      [t.y + 1, t.x],
    ]
      .filter(([y, x]) => !(`${y}#${x}` in distances) && ['D', '.'].includes(grid[`${y}#${x}`]))
      .forEach(([y, x]) => {
        distances[`${y}#${x}`] = d + 1;
        queue.push({ y, x });
      });
  }
};

console.log(dist({ x: 0, y: 0 }, { x: targetX, y: targetY }));

const fill = (p1) => {
  const queue = [p1];
  const distances = {};
  distances[`${p1.y}#${p1.x}`] = 0;

  while (queue.length > 0) {
    const t = queue.shift();
    const d = distances[`${t.y}#${t.x}`];

    [
      [t.y - 1, t.x],
      [t.y, t.x - 1],
      [t.y, t.x + 1],
      [t.y + 1, t.x],
    ]
      .filter(([y, x]) => !(`${y}#${x}` in distances) && ['D', '.'].includes(grid[`${y}#${x}`]))
      .forEach(([y, x]) => {
        distances[`${y}#${x}`] = d + 1;
        queue.push({ y, x });
      });
  }
  return Math.max(...Object.values(distances));
};

console.log(fill({ x: targetX, y: targetY }));

