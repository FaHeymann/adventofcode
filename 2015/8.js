const input = require('fs').readFileSync('inputs/2015/8.txt').toString();

console.log(input.split('\n').reduce((sum, line) => {
  let reduction = 2;
  for (let i = 1; i < line.length - 1; i++) {
    if (line.charAt(i) !== '\\') {
      continue;
    }
    if (['\\', '"'].includes(line.charAt(i + 1))) {
      reduction += 1;
      i += 1;
      continue;
    }
    reduction += 3;
    i += 3;
  }
  return sum + reduction;
}, 0));

console.log(input.split('\n').reduce((sum, line) => sum + 2 + line.split('').reduce((count, cur) => ['\\', '"'].includes(cur) ? count + 1 : count, 0), 0));
