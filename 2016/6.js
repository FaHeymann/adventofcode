const input = require('fs').readFileSync('inputs/2016/6.txt').toString();

const data = [];

input.split('\n').forEach(line => {
  line.split('').forEach((c, i) => {
    if (!data[i]) {
      data[i] = {};
    }
    if (!data[i][c]) {
      data[i][c] = 0;
    }
    data[i][c]++;
  });
});

console.log(data.map(charMap => Object.entries(charMap).reduce(([_, max], [char, count]) => count > max ? [char, count] :[_, max], ['_', 0])[0]).join(''));
console.log(data.map(charMap => Object.entries(charMap).reduce(([_, min], [char, count]) => count < min ? [char, count] :[_, min], ['_', Number.MAX_VALUE])[0]).join(''));
