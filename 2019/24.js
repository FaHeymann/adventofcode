const input = `..##.
..#..
##...
#....
...##`;

let state = input.split('\n').map(l => l.split(''));

const get = (y, x) => y < 0 || y >= state.length || x < 0 || x >= state[0].length ? '.' : state[y][x];
const neighborsCount = (y, x) => [[y - 1, x], [y + 1, x], [y, x - 1], [y, x + 1]].map(c => get(...c)).filter(t => t === '#').length;
const serializeState = () => state.map(l => l.join('')).join('');

const biodiversity = () => {
  let result = 0;
  for (let y = 0; y < state.length; y++) {
    for (let x = 0; x < state[0].length; x++) {
      if (get(y, x) === '#') {
        result += 2 ** (5 * y + x);
      }
    }
  }
  return result;
}

const encountered = new Set();

const step = () => {
  if (encountered.has(serializeState())) {
    return true;
  }
  encountered.add(serializeState());
  const next = [];
  for (let y = 0; y < state.length; y++) {
    next[y] = [];
    for (let x = 0; x < state[0].length; x++) {
      if (get(y, x) === '#') {
        next[y][x] = neighborsCount(y, x) === 1 ? '#' : '.';
      } else {
        next[y][x] = [1, 2].includes(neighborsCount(y, x)) ? '#' : '.';
      }
    }
  }
  state = next;
  return false;
}


while (!step());

console.log(biodiversity());
