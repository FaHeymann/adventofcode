const input = require('fs').readFileSync('inputs/2020/10.txt').toString();;

const chain = input.split('\n').concat([0]).map(x => parseInt(x, 10)).sort((a, b) => a - b);

const result = chain.reduce((res, v, i) => [
  i === chain.length - 1 || Math.abs(v - chain[i + 1]) === 3 ? res[0] + 1 : res[0],
  Math.abs(v - chain[i + 1]) === 1 ? res[1] + 1 : res[1],
], [0, 0]);

console.log(result[0] * result[1]);

const chain2 = input.split('\n').map(x => parseInt(x, 10)).sort((a, b) => a - b);

const map = {}

const resolve = (current, remaining) => {
  if (remaining.length === 0) {
    return 1;
  }
  if (map[current]) {
    return map[current];
  }

  const count = [...Array(3).keys()]
    .filter(i => i < remaining.length && Math.abs(remaining[i] - current) < 4)
    .reduce((count, i) => count + resolve(remaining[i], [...remaining].slice(i + 1)), 0);

  map[current] = count;
  return count;
}

console.log(resolve(0, chain2))
