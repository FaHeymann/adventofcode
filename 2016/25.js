const input = `cpy a d
cpy 14 c
cpy 182 b
inc d
dec b
jnz b -2
dec c
jnz c -5
cpy d a
jnz 0 0
cpy a b
cpy 0 a
cpy 2 c
jnz b 2
jnz 1 6
dec b
dec c
jnz c -4
inc a
jnz 1 -7
cpy 2 b
jnz c 2
jnz 1 4
dec b
dec c
jnz 1 -4
jnz 0 0
out b
jnz a -19
jnz 1 -21`;

const computer = initial => {
  const register = {
    a: initial,
    b: 0,
    c: 0,
    d: 0,
  };

  let head = 0;

  let output = '';

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

    if (line.startsWith('out')) {
      output += resolve(line.substr(4));
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

  while(output.length < 30) {
    step();
  }
  return output === '01'.repeat(15);
}

let i = 0;

while (true) {
  const result = computer(i);
  if (result) {
    console.log(i);
    break;
  }
  i++;
}
