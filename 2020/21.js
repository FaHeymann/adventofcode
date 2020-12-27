const input = require('fs').readFileSync('inputs/2020/21.txt').toString();

const intersection = (x, y) => x.filter(e => y.includes(e));

const allergens = {};
const allIngs = new Set();

input.split('\n').forEach(line => {
  const [_, ingRaw, allRaw] = line.match(/(.*) \(contains (.*)\)/);
  const ings = ingRaw.split(' ');
  const alls = allRaw.split(', ');

  alls.forEach(all => {
    allergens[all] = all in allergens ? intersection(allergens[all], ings) : ings;
  });
  ings.forEach(ing => {
    allIngs.add(ing);
  });
});

const safe = new Set();

allIngs.forEach(ing => {
  if (Object.values(allergens).every(all => !all.includes(ing))) {
    safe.add(ing);
  }
});

let count = 0;

input.split('\n').forEach(line => {
  const [_, ingRaw] = line.match(/(.*) \(contains .*\)/);
  count += ingRaw.split(' ').filter(e => safe.has(e)).length;
});

console.log(count);

const finals = new Map();

while (Object.values(allergens).length > 0) {
  const next = Object.entries(allergens).find(([_, value]) => value.length === 1);
  finals.set(next[0], next[1][0]);
  delete allergens[next[0]];
  Object.entries(allergens).forEach(([key, value]) => {
    allergens[key] = value.filter(e => e !== next[1][0]);
  });
}

console.log([...finals.entries()].sort().map(e => e[1]).join(','));
