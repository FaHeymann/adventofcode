const program = require('fs').readFileSync('inputs/2019/9.txt').toString().split(',').map(x => parseInt(x, 10));

console.log(require('./intcomp')(program, () => 1).runTillTermination()[0]);
console.log(require('./intcomp')(program, () => 2).runTillTermination()[0]);
