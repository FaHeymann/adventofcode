const input = require('fs').readFileSync('inputs/2015/17.txt').toString();

const powerSet = array => array.reduce(
  (subsets, value) => subsets.concat(
    subsets.map(set => [value, ...set])
  ),
  [[]]
);

console.log(powerSet(input.split('\n').map(x => parseInt(x, 10))).filter(curSet => 150 === curSet.reduce((sum, cur) => sum + cur, 0)).length);

const map = {};

powerSet(input.split('\n').map(x => parseInt(x, 10)))
  .filter(curSet => 150 === curSet.reduce((sum, cur) => sum + cur, 0))
  .forEach(curSet => {
    map[curSet.length] = !map[curSet.length] ? 1 : map[curSet.length] + 1;
});

console.log(map[Math.min(...Object.keys(map))]);
