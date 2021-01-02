const input = require('fs').readFileSync('inputs/2017/18.txt').toString();

const machine = (id, inputQueue, outputQueue) => {
  let register = { p: id };
  let pos = 0;
  let state = 'RUN';
  let sendCount = 0;

  const resolve = x => {
    if (Number.isInteger(parseInt(x, 10))) {
      return parseInt(x, 10);
    }
    if (!register[x]) {
      register[x] = 0;
    }
    return register[x];
  }

  return {
    step: () => {
      if (state === 'TERM') {
        return;
      }

      const line = input.split('\n')[pos];

      if (!line) {
        state = 'TERM';
        return;
      }

      if (line.startsWith('snd')) {
        outputQueue.push(resolve(line.substr(4)));
        sendCount++;
        pos++;
      }
      if (line.startsWith('set')) {
        const [reg, val] = line.substr(4).split(' ');
        register[reg] = resolve(val);
        pos++;
      }
      if (line.startsWith('add')) {
        const [reg, val] = line.substr(4).split(' ');
        register[reg] = resolve(reg) + resolve(val);
        pos++;
      }
      if (line.startsWith('mul')) {
        const [reg, val] = line.substr(4).split(' ');
        register[reg] = resolve(reg) * resolve(val);
        pos++;
      }
      if (line.startsWith('mod')) {
        const [reg, val] = line.substr(4).split(' ');
        register[reg] = resolve(reg) % resolve(val);
        pos++;
      }
      if (line.startsWith('rcv')) {
        if (inputQueue.length === 0) {
          state = 'WAIT';
        } else {
          register[line.substr(4)] = inputQueue.shift();
          state = 'RUN';
          pos++;
        }
      }
      if (line.startsWith('jgz')) {
        const [check, offset] = line.substr(4).split(' ');
        pos += resolve(check) > 0 ? resolve(offset) : 1;
      }
    },
    getState: () => state,
    getSendCount: () => sendCount,
    register,
  }
}

const queue1 = [];
const queue2 = [];

const p0 = machine(0, queue1, queue2);
const p1 = machine(1, queue2, queue1);


for (let i = 0; true; i++) {
  if (p0.getState() !== 'RUN' && p1.getState() !== 'RUN') {
    console.log(p1.getSendCount());
    break;
  }

  p0.step();
  p1.step();
}
