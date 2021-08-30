const program = require('fs').readFileSync('inputs/2019/13.txt').toString().split(',').map(x => parseInt(x, 10));

program[0] = 2;

const machine = require('./intcomp')(program, () => Math.sign(ballX - paddleX));

const map = [];

let paddleX;
let ballX;

while (true) {
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

  if (tile === 4) {
    ballX = x;
  }

  if (tile === 3) {
    paddleX = x;
  }

  if (x === -1 && y === 0) {
    console.log('score', tile);
  }
}
