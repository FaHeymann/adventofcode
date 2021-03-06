const map = require('fs').readFileSync('inputs/2020/3.txt').toString().split('\n').map(x => x.split(''));

const counts = [0, 0, 0, 0, 0];
const deltaX = [1, 3, 5, 7, 1];
const deltaY = [1, 1, 1, 1, 2];

for (let i = 0; i < 5; i++) {
  let x = 0;
  let y = 0;
  while (y < map.length) {
    counts[i] += map[y][x] === '#' ? 1 : 0;
    y += deltaY[i];
    x = (x + deltaX[i]) % map[0].length;
  }
}

console.log(counts[1], counts.reduce((a, b) => a * b, 1));
