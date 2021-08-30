const input = require('fs').readFileSync('inputs/2019/1.txt').toString();

const getFuel = x => Math.max(0, Math.floor(parseInt(x, 10) / 3) - 2);
const getFuelRec = x => getFuel(x) > 0 ? getFuel(x) + getFuelRec(getFuel(x)) : getFuel(x);

console.log(input.split('\n').reduce((sum, cur) => sum + getFuel(cur), 0));
console.log(input.split('\n').reduce((sum, cur) => sum + getFuelRec(cur), 0));
