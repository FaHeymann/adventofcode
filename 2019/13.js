const program = require('fs').readFileSync('inputs/2019/13.txt').toString().split(',').map(x => parseInt(x, 10));

const machine = require('./intcomp')(program, () => {});

const map = [];

for (let i = 0; i < 100000; i++) {
  const x = machine.runTillOutput();
  if (x === 'TERM') {
    break;
  }
  const y = machine.runTillOutput();
  const tile = machine.runTillOutput();
  if (!map[y]) {
    map[y] = [];
  }

  map[y][x] = tile;
}

let count = 0;

map.forEach(line => {
  count += line.reduce((sum, cur) => cur === 2 ? sum + 1 : sum, 0);
})

console.log(count);
