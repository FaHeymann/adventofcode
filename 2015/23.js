const commands = require('fs').readFileSync('inputs/2015/23.txt').toString().split('\n');

let registers = { a: 0, b: 0 };

let pointer = 0;

const step = () => {
  if (pointer < 0 || pointer >= commands.length) {
    return true;
  }
  if (commands[pointer].startsWith('hlf')) {
    registers[commands[pointer].charAt(4)] = Math.ceil(registers[commands[pointer].charAt(4)] / 2);
    pointer++;
  } else if (commands[pointer].startsWith('tpl')) {
    registers[commands[pointer].charAt(4)] = registers[commands[pointer].charAt(4)] * 3;
    pointer++;
  } else if (commands[pointer].startsWith('inc')) {
    registers[commands[pointer].charAt(4)]++;
    pointer++;
  } else if (commands[pointer].startsWith('jmp')) {
    pointer = pointer + parseInt(commands[pointer].substr(4), 10);
  } else if (commands[pointer].startsWith('jie')) {
    if (registers[commands[pointer].charAt(4)] % 2 === 0) {
      pointer = pointer + parseInt(commands[pointer].substr(7), 10);
    } else {
      pointer++;
    }
  } else if (commands[pointer].startsWith('jio')) {
    if (registers[commands[pointer].charAt(4)] === 1) {
      pointer = pointer + parseInt(commands[pointer].substr(7), 10);
    } else {
      pointer++;
    }
  }
  return false;
}

while(!step());

console.log(registers.b);

registers = { a: 1, b: 0 };
pointer = 0;

while(!step());

console.log(registers.b);
