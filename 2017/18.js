const input = require('fs').readFileSync('inputs/2017/18.txt').toString();

let register = {};
let pos = 0;
let sound;

const resolve = x => {
  if (Number.isInteger(parseInt(x, 10))) {
    return parseInt(x, 10);
  }
  if (!register[x]) {
    register[x] = 0;
  }
  return register[x];
}

const step = () => {
  const line = input.split('\n')[pos];

  if (line.startsWith('snd')) {
    sound = resolve(line.substr(4));
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
    if (resolve(line.substr(4)) > 0) {
      console.log(sound);
      process.exit(0);
    }
    pos++;
  }
  if (line.startsWith('jgz')) {
    const [check, offset] = line.substr(4).split(' ');
    pos += resolve(check) > 0 ? resolve(offset) : 1;
  }
}

while(true) {
  step();
}
