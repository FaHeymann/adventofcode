const input = require('fs').readFileSync('inputs/2019/6.txt').toString();

const map = {};

input.split('\n').forEach(line => {
  const [parent, child] = line.split(')');
  map[child] = { parent };
})

const resolve = (star) => {
  if (star === 'COM') {
    return [];
  }
  if (map[star].tree) {
    return map[star].tree;
  }
  const result = resolve(map[star].parent).concat(star);
  map[star].tree = result;
  return result;
}

const san = resolve('SAN');
const you = resolve('YOU');

while(san[0] === you[0]) {
  san.shift();
  you.shift();
}

console.log(you.length + san.length - 2);
