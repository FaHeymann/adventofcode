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

let lastActivity = 0;
let nat;

let lastDeliveredY = Infinity;

const step = i => {
  Object.values(rack).forEach(s => {
    const output = s.machine.tick();
    if (output.length === s.head + 3) {
      lastActivity = i;
      const addr = output[s.head];
      const X = output[s.head + 1];
      const Y = output[s.head + 2];
      s.head += 3;
      if (addr === 255) {
        nat = [X, Y];
      } else {
        rack[addr].inputQueue.push(X);
        rack[addr].inputQueue.push(Y);
      }
    }
  });
  if (i - 1000 > lastActivity) {
    if (lastDeliveredY === nat[1]) {
      console.log(nat[1]);
      process.exit(0);
    }
    rack[0].inputQueue.push(nat[0]);
    rack[0].inputQueue.push(nat[1]);
    lastDeliveredY = nat[1];
    lastActivity = i;
  }
}

let i = 0;

while (true) {
  step(i++);
}
