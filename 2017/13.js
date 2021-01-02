const input = require('fs').readFileSync('inputs/2017/13.txt').toString();

const walls = input.split('\n').map(line => line.split(': ').map(x => parseInt(x, 10)));

console.log(walls.reduce((sum, cur) => cur[0] % ((cur[1] - 1) * 2) === 0 ? sum + cur[0] * cur[1] : sum, 0));

for (let i = 0; true; i++) {
  if (walls.every(cur => (cur[0] + i) % ((cur[1] - 1) * 2) !== 0)) {
    console.log(i);
    break;
  }
}
