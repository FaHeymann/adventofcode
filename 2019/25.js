const readline = require('readline');

const program = require('fs').readFileSync('inputs/2019/25.txt').toString().split(',').map(x => parseInt(x, 10));

let index = 0;
let input = '';

const getInput = () => {
  return input.split('').map(c => c.charCodeAt(0))[index++];
};

const machine = require('./intcomp')(program, getInput);

let buffer = '';

(async () => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  let preventInfinite = 0;

  while (true) {
    preventInfinite += 1;
    if (preventInfinite > 1000) {
      break;
    }
    const result = machine.runTillOutput();
    if (result === 10) {
      index = 0;
      console.log(buffer);
      if (buffer === 'Command?') {
        preventInfinite = 0;
        input = (await new Promise(resolve => {
          rl.question('', a => resolve(a));
        })) + '\n';
      }
      buffer = '';
    } else {
      buffer += String.fromCharCode(result);
    }
  }
  rl.close();
})();

// 269520896
// Mutex, mug, prime number, asterisk
