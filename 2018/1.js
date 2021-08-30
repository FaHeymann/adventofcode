const input = require('fs').readFileSync('inputs/2018/1.txt').toString();

const list = input.split('\n').map(x => parseInt(x, 10));

console.log(list.reduce((sum, cur) => sum + cur, 0));

const set = new Set();
let head = 0;
let current = 0;

while (true) {
  if (set.has(current)) {
    console.log(current);
    break;
  }
  set.add(current);
  current += list[head];
  head = (head + 1) % list.length;
}
