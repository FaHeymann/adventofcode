const input = require('fs').readFileSync('inputs/2016/20.txt').toString();

const rules = input.split('\n').map(line => line.split('-').map(x => parseInt(x, 10)));

let i = 0;

while (true) {
  const matchingRules = rules.filter(rule => rule[0] <= i && i <= rule[1]);
  if (matchingRules.length > 0) {
    i = Math.max(...matchingRules.map(rule => rule[1])) + 1;
  } else {
    break;
  }
}

console.log(i);

i = 0;

let count = 0;

while (true) {
  if (i > 4294967295) {
    break;
  }
  const matchingRules = rules.filter(rule => rule[0] <= i && i <= rule[1]);
  if (matchingRules.length > 0) {
    i = Math.max(...matchingRules.map(rule => rule[1])) + 1;
  } else {
    const startAfter = rules.filter(rule => rule[0] > i);
    const nextStart = startAfter.length > 0 ? Math.min(...startAfter.map(rule => rule[0])) : 4294967296;
    count += nextStart - i;
    i = nextStart;
  }
}

console.log(count);
