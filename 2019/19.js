const program = require('fs').readFileSync('inputs/2019/19.txt').toString().split(',').map(x => parseInt(x, 10));

let sum = 0;

for (let y = 0; y < 50; y++) {
  for (let x = 0; x < 50; x++) {
    sum += require('./intcomp')(program, (index) => [x, y][index]).runTillTermination()[0];
  }
}

console.log(sum);

const map = {};
let y = 5;

while (true) {
  let x = y - 1 in map ? map[y - 1].start : 0;
  while (require('./intcomp')(program, (index) => [x, y][index]).runTillTermination()[0] === 0) {
    x++;
  }
  const e = { start: x };
  while (require('./intcomp')(program, (index) => [x, y][index]).runTillTermination()[0] === 1) {
    x++;
  }
  e.end = x - 1;
  map[y] = e;

  if (y - 99 in map && map[y - 99].end - e.start >= 99) {
    console.log(e.start * 10000 + (y - 99));
    break;
  }

  y++;
}
