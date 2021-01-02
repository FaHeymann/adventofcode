const input = require('fs').readFileSync('inputs/2017/11.txt').toString();

let coord = [0, 0, 0];

const moves = {
  n: () => { coord = [coord[0] + 1, coord[1] - 1, coord[2]] },
  s: () => { coord = [coord[0] - 1, coord[1] + 1, coord[2]] },
  nw: () => { coord = [coord[0], coord[1] - 1, coord[2] + 1] },
  se: () => { coord = [coord[0], coord[1] + 1, coord[2] - 1] },
  ne: () => { coord = [coord[0] + 1, coord[1], coord[2] - 1] },
  sw: () => { coord = [coord[0] - 1, coord[1], coord[2] + 1] },
}

let max = 0;

input.split(',').forEach(move => {
  moves[move]();
  max = Math.max(...coord.map(Math.abs), max);
});

console.log(Math.max(...coord.map(Math.abs)));
console.log(max);
