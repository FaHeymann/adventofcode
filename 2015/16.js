const input = require('fs').readFileSync('inputs/2015/16.txt').toString();

const match = {
  children: 3,
  cats: 7,
  samoyeds: 2,
  pomeranians: 3,
  akitas: 0,
  vizslas: 0,
  goldfish: 5,
  trees: 3,
  cars: 2,
  perfumes: 1,
}

const compare = (feat, amount) => {
  return amount === match[feat];
}

const compare2 = (feat, amount) => {
  if (['cats', 'trees'].includes(feat)) {
    return amount > match[feat];
  }
  if (['pomeranians', 'goldfish'].includes(feat)) {
    return amount < match[feat];
  }
  return amount === match[feat];
}

input.split('\n').forEach(line => {
  const [_, nr, feat1, amount1, feat2, amount2, feat3, amount3] = line.match(/^Sue ([0-9]+): ([a-z]+): ([0-9]+), ([a-z]+): ([0-9]+), ([a-z]+): ([0-9]+)$/);
  if (compare(feat1, parseInt(amount1, 10)) && compare(feat2, parseInt(amount2, 10)) && compare(feat3, parseInt(amount3, 10))) {
    console.log(nr);
  }
});

input.split('\n').forEach(line => {
  const [_, nr, feat1, amount1, feat2, amount2, feat3, amount3] = line.match(/^Sue ([0-9]+): ([a-z]+): ([0-9]+), ([a-z]+): ([0-9]+), ([a-z]+): ([0-9]+)$/);
  if (compare2(feat1, parseInt(amount1, 10)) && compare2(feat2, parseInt(amount2, 10)) && compare2(feat3, parseInt(amount3, 10))) {
    console.log(nr);
  }
});
