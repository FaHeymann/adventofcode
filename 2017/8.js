const input = require('fs').readFileSync('inputs/2017/8.txt').toString();

const register = {};

let maxOverall = -Number.MAX_VALUE;

const get = (address) => {
  if (!register[address]) {
    register[address] = 0;
  }
  return register[address];
}

const update = (address, op, value) => {
  if (!register[address]) {
    register[address] = 0;
  }
  if (op === 'dec') {
    register[address] -= value;
    maxOverall = Math.max(maxOverall, register[address]);
  } else {
    register[address] += value;
    maxOverall = Math.max(maxOverall, register[address]);
  }
}

input.split('\n').forEach(line => {
  const [_, target, op, value, ref, comp, compValue] = line.match(/^([a-z]+) ([inc|dec]+) ([-0-9]+) if ([a-z]+) ([!=<>]+) ([-0-9]+)$/);
  switch (comp) {
    case '<':
      if (get(ref) < parseInt(compValue, 10)) {
        update(target, op, parseInt(value, 10));
      }
      break;
    case '>':
      if (get(ref) > parseInt(compValue, 10)) {
        update(target, op, parseInt(value, 10));
      }
      break;
    case '!=':
      if (get(ref) != parseInt(compValue, 10)) {
        update(target, op, parseInt(value, 10));
      }
      break;
    case '==':
      if (get(ref) === parseInt(compValue, 10)) {
        update(target, op, parseInt(value, 10));
      }
      break;
    case '<=':
      if (get(ref) <= parseInt(compValue, 10)) {
        update(target, op, parseInt(value, 10));
      }
      break;
    case '>=':
      if (get(ref) >= parseInt(compValue, 10)) {
        update(target, op, parseInt(value, 10));
      }
      break;
  }
});

console.log(Object.values(register).reduce((max, cur) => Math.max(max, cur), -Number.MAX_VALUE));
console.log(maxOverall);
