const program = require('fs').readFileSync('inputs/2019/23.txt').toString().split(',').map(x => parseInt(x, 10));

const rack = {};

for (let i = 0; i < 50; i++) {
  const inputQueue = [i];
  rack[i] = {
    inputQueue,
    machine: require('./intcomp')(program, () => inputQueue.length > 0 ? inputQueue.shift() : -1),
    head: 0,
  }
}

const step = () => {
  Object.values(rack).forEach(s => {
    const output = s.machine.tick();
    if (output.length === s.head + 3) {
      const addr = output[s.head];
      const X = output[s.head + 1];
      const Y = output[s.head + 2];
      if (addr === 255) {
        console.log(Y);
        process.exit(0);
      }
      s.head += 3;
      rack[addr].inputQueue.push(X);
      rack[addr].inputQueue.push(Y);
    }
  });
}

while (true) {
  step();
}
