const rulesInput = require('fs').readFileSync('inputs/2020/19_rules.txt').toString();;

const samplesInput = require('fs').readFileSync('inputs/2020/19_samples.txt').toString();;

const rules = [];

rulesInput.split('\n').forEach(line => {
  const id = line.split(': ')[0];
  const poss = line.split(': ')[1].split(' | ');
  if (poss[0].match(/"[ab]"/)) {
    rules[id] = poss[0].charAt(1);
    return;
  }
  const results = poss.map(x => {
    return x.split(' ');
  })
  rules[id] = results;
});

const expand = input => {
  let result = [''];
  input.forEach(e => {
    let nextResult = [];
    e.forEach(x => {
      result.forEach(r => {
        nextResult.push(r + x);
      });
    });
    result = nextResult;
  });
  return result;
}

const cache = {};

const resolve = id => {
  if (id in cache) {
    return cache[id];
  }

  if (!Array.isArray(rules[id])) {
    return [rules[id]];
  }
  let result = [];
  rules[id].forEach(rule => {
    result = result.concat(expand(rule.map(x => resolve(x))))
  });
  cache[id] = result;
  return result;
}

const class42 = resolve('42');
const class31 = resolve('31');
count = [0, 0];

samplesInput.split('\n').forEach(line => {
  count[0] += line.length === 3 * class42[0].length
    && class42.includes(line.substr(0, class42[0].length))
    && class42.includes(line.substr(class42[0].length, class42[0].length))
    && class31.includes(line.substr(2 * class42[0].length, class42[0].length));
  count[1] += line.match(new RegExp(`.{1,${class42[0].length}}`, 'g')).every((part, i, arr) => {
    if (i === arr.length - 1) {
      return class31.includes(part);
    }
    if (i <= arr.length / 2) {
      return class42.includes(part);
    }
    return class42.includes(part) || class31.includes(part);
  }) ? 1 : 0;
});

console.log(...count);
