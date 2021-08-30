const program = require('fs').readFileSync('inputs/2019/21.txt').toString().split(',').map(x => parseInt(x, 10));

const star1 = () => {
  const input = `NOT A J
NOT B T
OR T J
NOT C T
OR T J
AND D J
WALK
`;

  const getInput = (index) => input.split('').map(c => c.charCodeAt(0))[index];

  const machine = require('./intcomp')(program, getInput);

  const result = machine.runTillTermination();
  console.log(result[result.length - 1]);
}

star1();

const input = `NOT A J
NOT B T
OR T J
NOT C T
OR T J
AND D J
NOT E T
NOT T T
OR H T
AND T J
RUN
`;

const getInput = (index) => {
  return input.split('').map(c => c.charCodeAt(0))[index];
};

const machine = require('./intcomp')(program, getInput);

const result = machine.runTillTermination();

console.log(result[result.length - 1]);
