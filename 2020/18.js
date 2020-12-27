const input = require('fs').readFileSync('inputs/2020/18.txt').toString();

const tokenize = input => {
  const out = [];
  let numberBuffer = '';
  let depth = 0;
  let depthStarts = {};

  for (let i = 0; i < input.length; i++) {
    if (input.charAt(i).match(/[0-9]/)) {
      numberBuffer += input.charAt(i);
    } else {
      if (numberBuffer !== '') {
        out.push({ type: 'number', value: parseInt(numberBuffer, 10) });
        numberBuffer = '';
      }
      if (input.charAt(i) === '(') {
        out.push({ type: 'open' });
        depthStarts[depth++] = out.length - 1;
      }
      if (input.charAt(i) === ')') {
        depth--;
        out.push({ type: 'close' });
        out[depthStarts[depth]].endAt = out.length - 1 - depthStarts[depth];
      }
      if (['+', '*'].includes(input.charAt(i))) {
        out.push({ type: 'operand', value: input.charAt(i) });
      }
    }
  }
  if (numberBuffer !== '') {
    out.push({ type: 'number', value: parseInt(numberBuffer, 10) });
  }
  return out;
}

const add = (a, b) => ({ type: 'number', value: a.value + b.value });

const mul = (a, b) => ({ type: 'number', value: a.value * b.value });

const resolve = input => {
  while(input.length > 1) {
    if (input[0].type === 'open') {
      input = resolve(input.slice(1, input[0].endAt)).concat(input.slice(input[0].endAt + 1));
    } else if (input[0].type === 'number' && input[2].type === 'number') {
      input = [input[1].value === '+' ? add(input[0], input[2]) : mul(input[0], input[2])].concat(input.slice(3))
    } else {
      const value2 = resolve(input.slice(3, input[2].endAt + 2));
      input = [input[1].value === '+' ? add(input[0], value2[0]) : mul(input[0], value2[0])].concat(input.slice(input[2].endAt + 3));
    }
  }
  return input;
}

const resolve2 = input => {
  let i = 0;
  while(i < input.length - 2) {
    if (input[i].type === 'open') {
      input = input.slice(0, i).concat(resolve2(input.slice(i + 1, input[i].endAt))).concat(input.slice(input[i].endAt + i + 1));
    } else if (input[i].type === 'number' && input[i + 2].type === 'number') {
      if (input[i + 1].value === '+') {
        input = input.slice(0, i).concat([add(input[i], input[i + 2])]).concat(input.slice(i + 3))
      } else {
        i += 2;
      }
    } else {
      const value2 = resolve2(input.slice(i + 3, input[i + 2].endAt + i + 2));
      if (input[i + 1].value === '+') {
        input = input.slice(0, i).concat([add(input[i + 0], value2[0])]).concat(input.slice(input[i + 2].endAt + i + 3));
      } else {
        input = input.slice(0, i).concat([input[i + 0], input[i + 1], value2[0]]).concat(input.slice(input[i + 2].endAt + i + 3));
      }
    }
  }
  while(input.length > 1) {
    input = [mul(input[0], input[2])].concat(input.slice(3))
  }
  return input;
}

let sum = 0;
let sum2 = 0;

input.split('\n').forEach(line => {
  sum += resolve(tokenize(line))[0].value;
  sum2 += resolve2(tokenize(line))[0].value;
});

console.log(sum);
console.log(sum2);
