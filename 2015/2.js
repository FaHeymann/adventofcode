const input = require('fs').readFileSync('inputs/2015/2.txt').toString();

const paper = input => {
  const sides = input.split('x').map(x => parseInt(x, 10));
  return 2 * sides[0] * sides[1] + 2 * sides[0] * sides[2] + 2 * sides[1] * sides[2] + Math.min(sides[0] * sides[1], sides[0] * sides[2], sides[1] * sides[2]);
};

console.log(input.split('\n').reduce((sum, cur) => sum + paper(cur), 0));

const ribbon = input => {
  const sides = input.split('x').map(x => parseInt(x, 10)).sort((a, b) => a - b);
  return 2 * sides[0] + 2 * sides[1] + sides[0] * sides[1] * sides[2];
};

console.log(input.split('\n').reduce((sum, cur) => sum + ribbon(cur), 0));
