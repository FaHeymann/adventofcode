const input = require('fs').readFileSync('inputs/2018/17.txt').toString();

const grid = [];

let minX = Number.MAX_VALUE;
let maxX = 0;
let minY = Number.MAX_VALUE;
let maxY = 0;

const get = (y, x) => grid[y] && grid[y][x] ? grid[y][x] : '.';
const set = (y, x, c) => {
  if (!grid[y]) {
    grid[y] = [];
  }
  grid[y][x] = c;
};

input.split('\n').forEach(line => {
  if (line.startsWith('x')) {
    const [_, x, yMin, yMax] = line.match(/x=([0-9]+), y=([0-9]+)\.\.([0-9]+)/).map(a => parseInt(a, 10));
    for (let y = yMin; y <= yMax; y++) {
      set(y, x, '#');
    }
    minX = Math.min(x, minX);
    maxX = Math.max(x, maxX);
    minY = Math.min(yMin, minY);
    maxY = Math.max(yMax, maxY);
  } else {
    const [_, y, xMin, xMax] = line.match(/y=([0-9]+), x=([0-9]+)\.\.([0-9]+)/).map(a => parseInt(a, 10));
    for (let x = xMin; x <= xMax; x++) {
      set(y, x, '#');
    }
    minX = Math.min(xMin, minX);
    maxX = Math.max(xMax, maxX);
    minY = Math.min(y, minY);
    maxY = Math.max(y, maxY);
  }
});

const print = () => {
  for (let y = minY; y <= maxY; y++) {
    let line = '';
    for (let x = minX; x <= maxX; x++) {
      line += get(y, x);
    }
    console.log(line);
  }
};

let sink;

const isBoundedRight = (y, x) => {
  while(true) {
    if (!['#', '~'].includes(get(y + 1, x))) {
      return false;
    }
    if (get(y, x + 1) === '#') {
      return true;
    }
    x++;
  }
};

const isBoundedLeft = (y, x) => {
  while(true) {
    if (!['#', '~'].includes(get(y + 1, x))) {
      return false;
    }
    if (get(y, x - 1) === '#') {
      return true;
    }
    x--;
  }
};

const fillRight = (y, x) => {
  while (!['#'].includes(get(y, x))) {
    set(y, x, '~');
    x++;
  }
}

const fillLeft = (y, x) => {
  while (!['#'].includes(get(y, x))) {
    set(y, x, '~');
    x--;
  }
}

const flowRight = (y, x) => {
  while (!['#', '~'].includes(get(y, x))) {
    set(y, x, '|');
    if (!['#', '~'].includes(get(y + 1, x))) {
      sink(y + 1, x);
      break;
    }
    x++;
  }
}

const flowLeft = (y, x) => {
  while (!['#', '~'].includes(get(y, x))) {
    set(y, x, '|');
    if (!['#', '~'].includes(get(y + 1, x))) {
      sink(y + 1, x);
      break;
    }
    x--;
  }
}

const spread = (y, x,) => {
  if (isBoundedRight(y, x) && isBoundedLeft(y, x)) {
    fillRight(y, x);
    fillLeft(y, x);
    spread(y - 1, x);
  } else {
    flowLeft(y, x);
    flowRight(y, x);
  }
};

sink = (y, x) => {
  if (get(y + 1, x) === '|') {
    return;
  }
  while(!['#', '~'].includes(get(y + 1, x))) {
    set(y, x, '|');
    y++;
    if (y > maxY) {
      return;
    }
  }
  spread(y, x);
};

sink(0, 500);

// print();

let count = 0;
let count2 = 0;

for (let y = minY; y <= maxY; y++) {
  for (let x = minX - 100; x <= maxX + 100; x++) {
    if (['|', '~'].includes(get(y, x))) {
      count++;
    }
    if (get(y, x) === '~') {
      count2++;
    }
  }
}

console.log(count, count2);
