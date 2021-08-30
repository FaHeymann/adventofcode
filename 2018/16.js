const ops = {
  addr: (register, command) => {
    const [_, A, B, C] = command;
    register[C] = register[A] + register[B];
    return register;
  },
  addi: (register, command) => {
    const [_, A, B, C] = command;
    register[C] = register[A] + B;
    return register;
  },
  mulr: (register, command) => {
    const [_, A, B, C] = command;
    register[C] = register[A] * register[B];
    return register;
  },
  muli: (register, command) => {
    const [_, A, B, C] = command;
    register[C] = register[A] * B;
    return register;
  },
  band: (register, command) => {
    const [_, A, B, C] = command;
    register[C] = register[A] & register[B];
    return register;
  },
  bani: (register, command) => {
    const [_, A, B, C] = command;
    register[C] = register[A] & B;
    return register;
  },
  borr: (register, command) => {
    const [_, A, B, C] = command;
    register[C] = register[A] | register[B];
    return register;
  },
  bori: (register, command) => {
    const [_, A, B, C] = command;
    register[C] = register[A] | B;
    return register;
  },
  setr: (register, command) => {
    const [_, A, B, C] = command;
    register[C] = register[A];
    return register;
  },
  seti: (register, command) => {
    const [_, A, B, C] = command;
    register[C] = A;
    return register;
  },
  gtir: (register, command) => {
    const [_, A, B, C] = command;
    register[C] = A > register[B] ? 1 : 0;
    return register;
  },
  gtri: (register, command) => {
    const [_, A, B, C] = command;
    register[C] = register[A] > B ? 1 : 0;
    return register;
  },
  gtrr: (register, command) => {
    const [_, A, B, C] = command;
    register[C] = register[A] > register[B] ? 1 : 0;
    return register;
  },
  eqir: (register, command) => {
    const [_, A, B, C] = command;
    register[C] = A === register[B] ? 1 : 0;
    return register;
  },
  eqri: (register, command) => {
    const [_, A, B, C] = command;
    register[C] = register[A] === B ? 1 : 0;
    return register;
  },
  eqrr: (register, command) => {
    const [_, A, B, C] = command;
    register[C] = register[A] === register[B] ? 1 : 0;
    return register;
  },
};

const intersection = (a, b) => a.filter(e => b.includes(e));

let count = 0;

const samples = require('fs').readFileSync('inputs/2018/16.txt').toString().split('\n\n');

const options = {};

samples.forEach(sample => {
  let [before, command, after] = sample.split('\n');
  before = before.match(/Before: \[([0-9]+), ([0-9]+), ([0-9]+), ([0-9]+)\]/).slice(1).map(x => parseInt(x, 10));
  after = after.match(/After:  \[([0-9]+), ([0-9]+), ([0-9]+), ([0-9]+)\]/).slice(1).map(x => parseInt(x, 10));
  command = command.split(' ').map(x => parseInt(x, 10));
  const possibilities = [];

  Object.entries(ops).forEach(([opcode, op]) => {
    const result = op([...before], command);
    if (after.join('#') === result.join('#')) {
      possibilities.push(opcode);
    }
  });

  if (possibilities.length > 2) {
    count++;
  }

  options[command[0]] = command[0] in options ? intersection(options[command[0]], possibilities) : possibilities;
});

console.log(count);

const commandMap = {};

while(Object.keys(commandMap).length < 16) {
  Object.entries(options).forEach(([number, curOps]) => {
    if (curOps.length === 1) {
      commandMap[number] = curOps[0];
      Object.keys(options).forEach(id => {
        options[id] = options[id].filter(e => e !== curOps[0]);
      });
    }
  });
}

let register = [0, 0, 0, 0];

const commands = require('fs').readFileSync('inputs/2018/16_commands.txt').toString().split('\n').map(line => line.split(' ').map(x => parseInt(x, 10)));

commands.forEach(c => {
  register = ops[commandMap[c[0]]](register, c);
});

console.log(register[0]);
