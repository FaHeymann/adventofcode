const input = `cpy 1 a
cpy 1 b
cpy 26 d
jnz c 2
jnz 1 5
cpy 7 c
inc d
dec c
jnz c -2
cpy a c
inc a
dec b
jnz b -2
cpy c b
dec d
jnz d -6
cpy 19 c
cpy 11 d
inc a
dec d
jnz d -2
dec c
jnz c -5`;

let register = {
  a: 0,
  b: 0,
  c: 0,
  d: 0,
};

let head = 0;

const resolve = input => ['a', 'b', 'c', 'd'].includes(input) ? register[input] : parseInt(input, 10);

const step = () => {
  if (head < 0 || head >= input.split('\n').length) {
    return true;
  }

  const line = input.split('\n')[head];

  if (line.startsWith('cpy')) {
    const [_, value, target] = line.match(/cpy (.*) ([a-d])/);
    register[target] = resolve(value);
    head++;
  }

  if (line.startsWith('inc')) {
    register[line.charAt(4)]++;
    head++;
  }

  if (line.startsWith('dec')) {
    register[line.charAt(4)]--;
    head++;
  }

  if (line.startsWith('jnz')) {
    const [_, check, target] = line.match(/jnz (.*) ([-0-9]+)/);
    if (resolve(check) !== 0) {
      head += resolve(target);
    } else {
      head++;
    }
  }
  return false;
}

while(!step());

console.log(register.a);

register = {
  a: 0,
  b: 0,
  c: 1,
  d: 0,
};

head = 0;

while(!step());

console.log(register.a);
