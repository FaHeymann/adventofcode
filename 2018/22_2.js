const levels = [];

const depth = 10689;
const targetY = 722;
const targetX = 11;

const modulo = 20183;

const typeMap = { 0: '.', 1: '=', 2: '|' };

const getLevel = (y, x) => {
  if (levels[y] && levels[y][x] !== undefined) {
    return levels[y][x];
  }
  let value;
  if ((y === 0 && x === 0) || (y === targetY && x === targetX)) {
    value = 0;
  } else if (y === 0) {
    value = x * 16807;
  } else if (x === 0) {
    value = y * 48271;
  } else {
    value = getLevel(y - 1, x) * getLevel(y, x - 1);
  }
  value = (value + depth) % modulo;
  if (levels[y] === undefined) {
    levels[y] = [];
  }
  levels[y][x] = value;
  return value;
}

const queue = [{ time: 0, y: 0, x: 0, tool: 'T' }];

const sort = () => {
  queue.sort((a, b) => a.time - b.time);
}

const serialize = state => `${state.y}#${state.x}#${state.tool}`;

const done = new Set();

const step = () => {
  const state = queue.shift();
  if (state.y === targetY && state.x === targetX && state.tool === 'T') {
    console.log(state.time);
    return true;
  }
  if (state.x > 50) { // heuristic because targetY is much bigger than targetX
    return;
  }
  if (state.y < 0 || state.x < 0 || done.has(serialize(state))) {
    return;
  }
  done.add(serialize(state));
  const type = getLevel(state.y, state.x) % 3;
  if ((type === 0 && state.tool === 'N') || (type === 1 && state.tool === 'T') || (type === 2 && state.tool === 'C')) {
    return;
  }
  queue.push({ time: state.time + 1, y: state.y + 1, x: state.x, tool: state.tool });
  queue.push({ time: state.time + 1, y: state.y - 1, x: state.x, tool: state.tool });
  queue.push({ time: state.time + 1, y: state.y, x: state.x + 1, tool: state.tool });
  queue.push({ time: state.time + 1, y: state.y, x: state.x - 1, tool: state.tool });
  if (type === 0 && state.tool === 'T') {
    queue.push({ time: state.time + 7, y: state.y, x: state.x, tool: 'C' });
  }
  if (type === 0 && state.tool === 'C') {
    queue.push({ time: state.time + 7, y: state.y, x: state.x, tool: 'T' });
  }
  if (type === 1 && state.tool === 'C') {
    queue.push({ time: state.time + 7, y: state.y, x: state.x, tool: 'N' });
  }
  if (type === 1 && state.tool === 'N') {
    queue.push({ time: state.time + 7, y: state.y, x: state.x, tool: 'C' });
  }
  if (type === 2 && state.tool === 'T') {
    queue.push({ time: state.time + 7, y: state.y, x: state.x, tool: 'N' });
  }
  if (type === 2 && state.tool === 'N') {
    queue.push({ time: state.time + 7, y: state.y, x: state.x, tool: 'T' });
  }
  sort();
  return false;
}

while(!step());
