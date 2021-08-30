const input = require('fs').readFileSync('inputs/2018/25.txt').toString();

const points = input.split('\n').map(l => l.split(',').map(x => parseInt(x, 10)));

const distance = (p1, p2) => Math.abs(p1[0] - p2[0]) + Math.abs(p1[1] - p2[1]) + Math.abs(p1[2] - p2[2]) + Math.abs(p1[3] - p2[3]);
const partOf = (c, p) => c.some(e => distance(p, e) < 4);

let constellations = [];

points.forEach(p => {
  const next = [];
  let newConst = [p];
  constellations.forEach(c => {
    if (partOf(c, p)) {
      newConst = newConst.concat(c);
    } else {
      next.push(c);
    }
  });
  next.push(newConst);
  constellations = next;
});

console.log(constellations.length);
