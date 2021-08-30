const { promisify } = require('util');
const readline = require('readline');

const program = require('fs').readFileSync('inputs/2019/15.txt').toString().split(',').map(x => parseInt(x, 10));

const grid = { '0#0': 'D' };

let minY = 0;
let maxY = 0;
let minX = 0;
let maxX = 0;

let y = 0;
let x = 0;

// const moves = 'NNNNNNNENWNWNWNWNSWSWWNWNSW'.split('');

let input;

const moveMap = { N: 1, S: 2, W: 3, E: 4 };

const machine = require('./intcomp')(program, () => moveMap[input]);

const print = () => {
  for (let y = minY; y <= maxY; y++) {
    let line = '';
    for (let x = minX; x <= maxX; x++) {
      line += `${y}#${x}` in grid ? grid[`${y}#${x}`] : '?';
    }
    console.log(line);
  }
}




(async () => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  while (true) {
    input = await new Promise(resolve => {
      rl.question('', a => resolve(a));
    });

    while (!['N', 'S', 'W', 'E'].includes(input)) {
      console.log('invalid');
      input = await new Promise(resolve => {
        rl.question('', a => resolve(a));
      });
    }

    const output = machine.runTillOutput();
    console.log(output);

    if (output === 0) {
      if (input === 'N') {
        grid[`${y - 1}#${x}`] = '#';
        minY = Math.min(y - 1, minY);
      } else if (input === 'S') {
        grid[`${y + 1}#${x}`] = '#';
        maxY = Math.max(y + 1, maxY);
      } else if (input === 'E') {
        grid[`${y}#${x + 1}`] = '#';
        maxX = Math.max(x + 1, maxX);
      } else if (input === 'W') {
        grid[`${y}#${x - 1}`] = '#';
        minX = Math.min(x - 1, minX);
      }
    } else {
      if (input === 'N') {
        grid[`${y}#${x}`] = '.';
        y--;
        grid[`${y}#${x}`] = 'D';
        minY = Math.min(y, minY);
      } else if (input === 'S') {
        grid[`${y}#${x}`] = '.';
        y++;
        maxY = Math.max(y, maxY);
        grid[`${y}#${x}`] = 'D';
      } else if (input === 'E') {
        grid[`${y}#${x}`] = '.';
        x++;
        maxX = Math.max(x, maxX);
        grid[`${y}#${x}`] = 'D';
      } else if (input === 'W') {
        grid[`${y}#${x}`] = '.';
        x--;
        minX = Math.min(x, minX);
        grid[`${y}#${x}`] = 'D';
      }
    }

    if (output === 2) {
      console.log('target found at', y, x);
    }

    print();
  }
})();


