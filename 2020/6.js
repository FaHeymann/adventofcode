const input = require('fs').readFileSync('inputs/2020/6.txt').toString();;

const groups = input.split('\n\n').map(g => g.split('\n').map(l => l.split('')).flat());
console.log(groups.reduce((sum, cur) => sum + cur.filter((v, i, arr) => arr.indexOf(v) === i).length, 0));

const groups2 = input.split('\n\n').map(g => g.split('\n').map(l => l.split('')));
console.log(groups2.reduce((sum, group) => sum + group.reduce((arr, cur, i) => i === 0 ? cur : arr.filter(v => cur.includes(v), 0)).length, 0));
