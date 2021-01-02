const input = `cpy a b
dec b
cpy a d
cpy 0 a
cpy b c
inc a
dec c
jnz c -2
dec d
jnz d -5
dec b
cpy b c
cpy c d
dec d
inc c
jnz d -2
tgl c
cpy -16 c
jnz 1 c
cpy 94 c
jnz 82 d
inc a
inc d
jnz d -2
inc c
jnz c -5`;

const register = {
  a: 7,
  b: 0,
  c: 0,
  d: 0,
};

let head = 0;

const instructions = input.split('\n');

const resolve = input => ['a', 'b', 'c', 'd'].includes(input) ? register[input] : parseInt(input, 10);

const step = () => {
  if (head < 0 || head >= instructions.length) {
    return true;
  }

  const line = instructions[head];

  if (line.startsWith('cpy')) {
    const [_, value, target] = line.match(/cpy (.*) (.*)/);
    if (['a', 'b', 'c', 'd'].includes(target)) {
      register[target] = resolve(value);
    }
    head++;
  }

  if (line.startsWith('inc')) {
    if (['a', 'b', 'c', 'd'].includes(line.charAt(4))) {
      register[line.charAt(4)]++;
    }
    head++;
  }

  if (line.startsWith('dec')) {
    if (['a', 'b', 'c', 'd'].includes(line.charAt(4))) {
      register[line.charAt(4)]--;
    }
    head++;
  }

  if (line.startsWith('jnz')) {
    const [_, check, target] = line.match(/jnz (.*) (.*)/);
    if (resolve(check) !== 0) {
      head += resolve(target);
    } else {
      head++;
    }
  }

  if (line.startsWith('tgl')) {
    const [_, target] = line.match(/tgl (.*)/);
    if (resolve(target) + head >= 0 && resolve(target) + head < instructions.length) {
      const targetLine = instructions[resolve(target) + head];
      if (targetLine.startsWith('inc')) {
        instructions[resolve(target) + head] = targetLine.replace('inc', 'dec');
      } else if (targetLine.startsWith('dec')) {
        instructions[resolve(target) + head] = targetLine.replace('dec', 'inc');
      } else if (targetLine.startsWith('tgl')) {
        instructions[resolve(target) + head] = targetLine.replace('tgl', 'inc');
      } else if (targetLine.startsWith('jnz')) {
        instructions[resolve(target) + head] = targetLine.replace('jnz', 'cpy');
      } else if (targetLine.startsWith('cpy')) {
        instructions[resolve(target) + head] = targetLine.replace('cpy', 'jnz');
      }
    }

    head++;
  }

  if (line.startsWith('mul')) {
    register['a'] = register['a'] * register['b'];
    head++;
  }

  if (line.startsWith('nil')) {
    head++;
  }

  return false;
}

while(!step());
console.log(register.a);
