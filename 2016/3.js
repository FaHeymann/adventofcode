const input = require('fs').readFileSync('inputs/2016/3.txt').toString();

console.log(input.split('\n').reduce((count, line, i) => {
  const [_, a, b, c] = line.match(/^\s*([0-9]+)\s*([0-9]+)\s*([0-9]+)\s*$/).map(x => parseInt(x, 10));
  return a + b + c - Math.max(a, b, c) > Math.max(a, b, c) ? count + 1 : count;
}, 0));

const buffer = [[], [], []]

console.log(input.split('\n').reduce((count, line, i) => {
  const [_, a, b, c] = line.match(/^\s*([0-9]+)\s*([0-9]+)\s*([0-9]+)\s*$/).map(x => parseInt(x, 10));
  if ([0, 1].includes(i % 3)) {
    buffer[0][i % 3] = a;
    buffer[1][i % 3] = b;
    buffer[2][i % 3] = c;
    return count;
  }
  return count
    + (a + buffer[0][0] + buffer[0][1] - Math.max(a, buffer[0][0], buffer[0][1]) > Math.max(a, buffer[0][0], buffer[0][1]) ? 1 : 0)
    + (b + buffer[1][0] + buffer[1][1] - Math.max(b, buffer[1][0], buffer[1][1]) > Math.max(b, buffer[1][0], buffer[1][1]) ? 1 : 0)
    + (c + buffer[2][0] + buffer[2][1] - Math.max(c, buffer[2][0], buffer[2][1]) > Math.max(c, buffer[2][0], buffer[2][1]) ? 1 : 0)
}, 0));
