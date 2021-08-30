let register = [0, 0, 0, 0, 0, 0];

const ops = {
  addr: (command) => {
    const [_, A, B, C] = command;
    register[C] = register[A] + register[B];
  },
  addi: (command) => {
    const [_, A, B, C] = command;
    register[C] = register[A] + B;
  },
  mulr: (command) => {
    const [_, A, B, C] = command;
    register[C] = register[A] * register[B];
  },
  muli: (command) => {
    const [_, A, B, C] = command;
    register[C] = register[A] * B;
  },
  band: (command) => {
    const [_, A, B, C] = command;
    register[C] = register[A] & register[B];
  },
  bani: (command) => {
    const [_, A, B, C] = command;
    register[C] = register[A] & B;
  },
  borr: (command) => {
    const [_, A, B, C] = command;
    register[C] = register[A] | register[B];
  },
  bori: (command) => {
    const [_, A, B, C] = command;
    register[C] = register[A] | B;
  },
  setr: (command) => {
    const [_, A, B, C] = command;
    register[C] = register[A];
  },
  seti: (command) => {
    const [_, A, B, C] = command;
    register[C] = A;
  },
  gtir: (command) => {
    const [_, A, B, C] = command;
    register[C] = A > register[B] ? 1 : 0;
  },
  gtri: (command) => {
    const [_, A, B, C] = command;
    register[C] = register[A] > B ? 1 : 0;
  },
  gtrr: (command) => {
    const [_, A, B, C] = command;
    register[C] = register[A] > register[B] ? 1 : 0;
  },
  eqir: (command) => {
    const [_, A, B, C] = command;
    register[C] = A === register[B] ? 1 : 0;
  },
  eqri: (command) => {
    const [_, A, B, C] = command;
    register[C] = register[A] === B ? 1 : 0;
  },
  eqrr: (command) => {
    const [_, A, B, C] = command;
    register[C] = register[A] === register[B] ? 1 : 0;
  },
};

const ip = 3;

const input = `addi 3 16 3
seti 1 8 5
seti 1 0 4
mulr 5 4 2
eqrr 2 1 2
addr 2 3 3
addi 3 1 3
addr 5 0 0
addi 4 1 4
gtrr 4 1 2
addr 3 2 3
seti 2 3 3
addi 5 1 5
gtrr 5 1 2
addr 2 3 3
seti 1 4 3
mulr 3 3 3
addi 1 2 1
mulr 1 1 1
mulr 3 1 1
muli 1 11 1
addi 2 4 2
mulr 2 3 2
addi 2 19 2
addr 1 2 1
addr 3 0 3
seti 0 7 3
setr 3 2 2
mulr 2 3 2
addr 3 2 2
mulr 3 2 2
muli 2 14 2
mulr 2 3 2
addr 1 2 1
seti 0 1 0
seti 0 5 3`;

const instructions = input.split('\n').map(line => line.split(' ').map((e, i) => i > 0 ? parseInt(e, 10) : e));

step = () => {
  if (register[ip] < 0 || register[ip] >= instructions.length) {
    return true;
  }
  const line = instructions[register[ip]];
  ops[line[0]](line);
  register[ip]++;
  return false;
}

while(!step());

console.log(register[0]);

// The program calcules the sum of the divisors of a number that is determined at the beginning of execution. In this case this number is 10551343

const target = 10551343;

let sum = 0;
for (let i = 1; i <= Math.sqrt(target); i++) {
  if (target % i === 0) {
    sum += i;
    if (target / i !== i) {
      sum += target / i;
    }
  }
}

console.log(sum);
