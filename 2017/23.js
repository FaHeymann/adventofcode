const input = `set b 81
set c b
jnz a 2
jnz 1 5
mul b 100
sub b -100000
set c b
sub c -17000
set f 1
set d 2
set e 2
set g d
mul g e
sub g b
jnz g 2
set f 0
sub e -1
set g e
sub g b
jnz g -8
sub d -1
set g d
sub g b
jnz g -13
jnz f 2
sub h -1
set g b
sub g c
jnz g 2
jnz 1 3
sub b -17
jnz 1 -23`;

let register = {};
let pos = 0;
let mulCounter = 0;

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
  if (!line) {
    return true;
  }

  if (line.startsWith('set')) {
    const [reg, val] = line.substr(4).split(' ');
    register[reg] = resolve(val);
    pos++;
  }
  if (line.startsWith('sub')) {
    const [reg, val] = line.substr(4).split(' ');
    register[reg] = resolve(reg) - resolve(val);
    pos++;
  }
  if (line.startsWith('mul')) {
    const [reg, val] = line.substr(4).split(' ');
    register[reg] = resolve(reg) * resolve(val);
    pos++;
    mulCounter++;
  }
  if (line.startsWith('jnz')) {
    const [check, offset] = line.substr(4).split(' ');
    pos += resolve(check) !== 0 ? resolve(offset) : 1;
  }
  return false;
}

while(!step()) {
}
console.log(mulCounter);
