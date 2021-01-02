const input = require('fs').readFileSync('inputs/2015/1.txt').toString();
console.log(input.split('').reduce((floor, char) => char === '(' ? floor + 1 : floor - 1, 0));
input.split('').reduce((floor, char, i) => {
  if (floor === -1) {
    console.log(i);
    process.exit(0);
  }
  return char === '(' ? floor + 1 : floor - 1;
}, 0);
