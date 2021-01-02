const input = require('fs').readFileSync('inputs/2015/3.txt').toString();

const star1 = () => {
  const map = { 0: { 0: true } };

  let x = 0;
  let y = 0;

  input.split('').forEach((c, i) => {
    if (c === '^') {
      y++;
    } else if (c === '>') {
      x++;
    } else if (c === 'v') {
      y--;
    } else if (c === '<') {
      x--;
    }
    if (!map[y]) {
      map[y] = {};
    }
    map[y][x] = true;
  });

  console.log(Object.values(map).reduce((sum, cur) => sum + Object.values(cur).length, 0));
}

star1();

const map = { 0: { 0: true } };

let x = [0, 0];
let y = [0, 0];

input.split('').forEach((c, i) => {
  if (c === '^') {
    y[i % 2]++;
  } else if (c === '>') {
    x[i % 2]++;
  } else if (c === 'v') {
    y[i % 2]--;
  } else if (c === '<') {
    x[i % 2]--;
  }
  if (!map[y[i % 2]]) {
    map[y[i % 2]] = {};
  }
  map[y[i % 2]][x[i % 2]] = true;
});

console.log(Object.values(map).reduce((sum, cur) => sum + Object.values(cur).length, 0));
