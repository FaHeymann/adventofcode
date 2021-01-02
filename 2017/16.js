const input = require('fs').readFileSync('inputs/2017/16.txt').toString();

let arr = 'abcdefghijklmnop'.split('');

const spin = (arr, len) => arr.slice(-1 * len).concat(arr.slice(0, arr.length - len));
const exchange = (arr, pos1, pos2) => arr.map((c, i) => {
  if (i === pos1) {
    return arr[pos2];
  } else if (i === pos2) {
    return arr[pos1];
  }
  return c;
});
const partner = (arr, part1, part2) => arr.map(c => {
  if (c === part1) {
    return part2;
  } else if (c === part2) {
    return part1;
  }
  return c;
});

const dance = () => {
  input.split(',').forEach(instr => {
    if (instr.charAt(0) === 's') {
      arr = spin(arr, parseInt(instr.substr(1), 10));
    } else if (instr.charAt(0) === 'x') {
      arr = exchange(arr, ...instr.substr(1).split('/').map(x => parseInt(x, 10)));
    } else if (instr.charAt(0) === 'p') {
      arr = partner(arr, ...instr.substr(1).split('/'));
    }
  });
};

const map = {};

for (let i = 0; i < 1000000000; i++) {
  if (i === 1) {
    console.log(arr.join(''));
  }
  if (arr.join('') in map) {
    const cycleLength = map[arr.join('')] - i;
    for (let j = 0; j < (1000000000 % cycleLength); j++) {
      dance();
    }
    console.log(arr.join(''));
    break;
  }
  map[arr.join('')] = i;
  dance();
}
