const input = require('fs').readFileSync('inputs/2016/22.txt').toString();

const nodes = input.split('\n').map(line => {
  const [_, x, y, size, used, avail, percent] = line.match(/\/dev\/grid\/node-x([0-9]+)-y([0-9]+)\s+([0-9]+)T\s+([0-9]+)T\s+([0-9]+)T\s+([0-9]+)%/).map(x => parseInt(x, 10));

  return {x, y, size, used, avail, percent};
});

let count = 0;

for (let i = 0; i < nodes.length; i++) {
  for (let j = i + 1; j < nodes.length; j++) {
    if (nodes[i].used > 0 && nodes[i].used <= nodes[j].avail) {
      count++;
    }
    if (nodes[j].used > 0 && nodes[j].used <= nodes[i].avail) {
      count++;
    }
  }
}

console.log(count);

const grid = [];

let head;

nodes.forEach(node => {
  if (!(node.y in grid)) {
    grid[node.y] = [];
  }
  let type = '.';
  if (node.size > 100) {
    type = '#';
  }
  if (node.avail > 90) {
    type = '_';
    head = [node.y, node.x];
  }

  if (node.y === 0 && node.x === Math.max(...nodes.map(n => n.x))) {
    type = 'G';
  }

  grid[node.y][node.x] = type;
});

const paint = () => {
  grid.forEach(line => {
    console.log(line.join(''));
  });
  console.log('\n');
};

count = 0;

const moveUp = () => {
  const [y, x] = head;
  const temp = grid[y - 1][x];
  grid[y - 1][x] = grid[y][x];
  grid[y][x] = temp;
  head[0]--;
  count++;
  // paint();
}

const moveDown = () => {
  const [y, x] = head;
  const temp = grid[y + 1][x];
  grid[y + 1][x] = grid[y][x];
  grid[y][x] = temp;
  head[0]++;
  count++;
  // paint();
}

const moveLeft = () => {
  const [y, x] = head;
  const temp = grid[y][x - 1];
  grid[y][x - 1] = grid[y][x];
  grid[y][x] = temp;
  head[1]--;
  count++;
  // paint();
}

const moveRight = () => {
  const [y, x] = head;
  const temp = grid[y][x + 1];
  grid[y][x + 1] = grid[y][x];
  grid[y][x] = temp;
  head[1]++;
  count++;
  // paint();
}

// paint();
moveUp();
moveUp();

while(grid[head[0] - 1][head[1]] === '#') {
  moveLeft();
}

while(head[0] > 0) {
  moveUp();
}

while(head[0] > 0) {
  moveUp();
}

while (grid[head[0]][head[1] + 1] !== 'G') {
  moveRight();
}

count += 5 * (head[1]) + 1; // deduced from visual representation of grid

console.log(count);
