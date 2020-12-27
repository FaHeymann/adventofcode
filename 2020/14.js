const input = require('fs').readFileSync('inputs/2020/14.txt').toString();

const w = 2 ** 24;
const or = (a, b) => ((a / w) | (b / w)) * w + ((a % w) | (b % w)); // workaround for integer limitations
const and = (a, b) => ((a / w) & (b / w)) * w + ((a % w) & (b % w));

let helper1;
let helper2;

const mask = (input) => or(and(input, helper1), helper2);

let register = {};

input.split('\n').forEach(line => {
  if (line.startsWith('mask')) {
    helper1 = parseInt(line.substr(7).replace(/X/g, '1'), 2);
    helper2 = parseInt(line.substr(7).replace(/X/g, '0'), 2);
  } else {
    const [_, address, value] = line.match(/^mem\[([0-9]+)\] = ([0-9]+)$/).map(x => parseInt(x, 10));
    register[address] = mask(value);
  }
});

console.log(Object.values(register).reduce((sum, cur) => sum + cur, 0));

const apply = (mask, address) => {
  address = address.toString(2).padStart(36, '0');
  let out = '';
  for (let i = 0; i < 36; i++) {
    if (mask.charAt(i) === 'X') {
      out += 'X';
    } else if (mask.charAt(i) === '0') {
      out += address.charAt(i);
    } else {
      out += '1';
    }
  }
  return out;
}

const expand = (done, todo) => {
  if (todo === '') {
    return [done];
  }
  if (todo.charAt(0) === 'X') {
    return expand(done + '1', todo.substr(1)).concat(expand(done + '0', todo.substr(1)));
  }
  return expand(done + todo.substr(0, 1), todo.substr(1))
}

let curMask;
register = {};

input.split('\n').forEach(line => {
  if (line.startsWith('mask')) {
    curMask = line.substr(7);
  } else {
    const [_, address, value] = line.match(/^mem\[([0-9]+)\] = ([0-9]+)$/).map(x => parseInt(x, 10));
    expand('', apply(curMask, address)).map(x => parseInt(x, 2)).forEach(target => {
      register[target] = value;
    });
  }
});

console.log(Object.values(register).reduce((sum, cur) => sum + cur, 0));


