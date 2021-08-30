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

const ip = 2;

const input = `seti 123 0 3
bani 3 456 3
eqri 3 72 3
addr 3 2 2
seti 0 0 2
seti 0 0 3
bori 3 65536 1
seti 4921097 0 3
bani 1 255 4
addr 3 4 3
bani 3 16777215 3
muli 3 65899 3
bani 3 16777215 3
gtir 256 1 4
addr 4 2 2
addi 2 1 2
seti 27 8 2
seti 0 5 4
addi 4 1 5
muli 5 256 5
gtrr 5 1 5
addr 5 2 2
addi 2 1 2
seti 25 1 2
addi 4 1 4
seti 17 8 2
setr 4 3 1
seti 7 9 2
eqrr 3 0 4
addr 4 2 2
seti 5 4 2`;

const instructions = input.split('\n').map(line => line.split(' ').map((e, i) => i > 0 ? parseInt(e, 10) : e));

star1 = () => {
  step = () => {
    const line = instructions[register[ip]];

    if (register[ip] === 28) {
      return true;
    }

    ops[line[0]](line);
    register[ip]++;
    return false;
  }

  while(!step());
  console.log(register[3]);
  register = [0, 0, 0, 0, 0, 0];
}

star1();

const found = new Set();

step = () => {
  const line = instructions[register[ip]];

  if (register[ip] === 28) {
    if (found.has(register[3])) {
      return true;
    }
    found.add(register[3]);
  }

  ops[line[0]](line);
  register[ip]++;
  return false;
}

while(!step());

console.log(Array.from(found)[found.size - 1]);
