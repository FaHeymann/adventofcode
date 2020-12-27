const commands = require('fs').readFileSync('inputs/2020/8.txt').toString().split('\n');

const star1 = () => {
  const visited = [];

  let accumulator = 0;
  let pointer = 0;

  const step = () => {
    if (visited.includes(pointer)) {
      console.log(accumulator);
      return 'loop';
    }

    if (pointer < 0 || pointer >= commands.length) {
      console.log(accumulator);
      return 'term';
    }

    visited.push(pointer);

    if (commands[pointer].startsWith('acc')) {
      accumulator += parseInt(commands[pointer].substr(4));
      pointer++;
    } else if (commands[pointer].startsWith('jmp')) {
      pointer = pointer + parseInt(commands[pointer].substr(4), 10);
    } else if (commands[pointer].startsWith('nop')) {
      pointer++;
    }

    return 'continue';
  }

  let result = 'continue';

  while(result === 'continue') {
    result = step();
  }
}

star1();

const test = commands => {
  const visited = [];

  let accumulator = 0;
  let pointer = 0;

  const step = () => {
    if (visited.includes(pointer)) {
      return 'loop';
    }

    if (pointer < 0 || pointer >= commands.length) {
      console.log(accumulator);
      return 'term';
    }

    visited.push(pointer);

    if (commands[pointer].startsWith('acc')) {
      accumulator += parseInt(commands[pointer].substr(4));
      pointer++;
    } else if (commands[pointer].startsWith('jmp')) {
      pointer = pointer + parseInt(commands[pointer].substr(4), 10);
    } else if (commands[pointer].startsWith('nop')) {
      pointer++;
    }

    return 'continue';
  }

  let result = 'continue';

  while(result === 'continue') {
    result = step();
  }

  return result;
}

for (let i = 0; i < commands.length; i++) {
  const testee = [...commands];
  if (testee[i].startsWith('nop')) {
    testee[i] = testee[i].replace(/nop/g, 'jmp');
  } else if (testee[i].startsWith('jmp')) {
    testee[i] = testee[i].replace(/jmp/g, 'nop');
  }

  const result = test(testee);
  if (result === 'term') {
    process.exit(0);
  }
}
