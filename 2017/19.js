const input = require('fs').readFileSync('inputs/2017/19.txt').toString();

const grid = input.split('\n').map(l => l.split(''));

const get = (y, x) => {
  if (y < 0 || y >= grid.length) {
    return ' ';
  }
  if (x < 0 || x >= grid[y].length) {
    return ' ';
  }
  return grid[y][x];
};

let y = 0;
let x = grid[0].findIndex(c => c !== ' ');
let dir = 'S';
let out = '';
let stepCount = 0;

const dirMap = {
  S: { L: 'E', R: 'W' },
  N: { L: 'W', R: 'E' },
  E: { L: 'N', R: 'S' },
  W: { L: 'S', R: 'N' },
}

const move = () => {
  if (dir === 'S') {
    y++;
  } else if (dir === 'N') {
    y--;
  } else if (dir === 'E') {
    x++;
  } else if (dir === 'W') {
    x--;
  }
}

const step = () => {
  if ('ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').includes(get(y, x))) {
    out += get(y, x);
  }
  stepCount++;
  let straight;
  let left;
  let right;

  if (dir === 'S') {
    straight = get(y + 1, x);
    left = get(y, x + 1);
    right = get(y, x - 1);
  } else if (dir === 'N') {
    straight = get(y - 1, x);
    left = get(y, x - 1);
    right = get(y, x + 1);
  } else if (dir === 'E') {
    straight = get(y, x + 1);
    left = get(y - 1, x);
    right = get(y + 1, x);
  } else if (dir === 'W') {
    straight = get(y, x - 1);
    left = get(y + 1, x);
    right = get(y - 1, x);
  }

  if (straight !== ' ') {
    move();
    return false;
  } else if (left !== ' ') {
    dir = dirMap[dir]['L'];
    move();
    return false;
  } else if (right !== ' ') {
    dir = dirMap[dir]['R'];
    move();
    return false;
  } else {
    return true;
  }
}

while (!step()) {
}

console.log(out);
console.log(stepCount);
