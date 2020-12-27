const input = require('fs').readFileSync('inputs/2020/7.txt').toString();;

const bags = {}

input.split('\n').forEach(line => {
  const [_, container, inside] = line.match(/^([a-z]+ [a-z]+) bags contain ([a-z0-9 ,]+).$/);
  if (!bags[container]) {
    bags[container] = {
      inside: {},
      outside: {}
    }
  }
  if (inside === 'no other bags') {
    return;
  }

  inside.split(', ').forEach(item => {
    const [_, quantity, name] = item.match(/^([0-9]+) ([a-z]+ [a-z]+) bags?$/);
    if (!bags[name]) {
      bags[name] = {
        inside: {},
        outside: {}
      }
    }
    bags[container].inside[name] = parseInt(quantity, 10);
    bags[name].outside[container] = true;
  });
});

const set = new Set();

const resolve = bag => {
  set.add(bag);
  Object.keys(bags[bag].outside).forEach(next => {
    resolve(next);
  });
};

resolve('shiny gold');
console.log(set.size - 1);

const resolve2 = bag => Object.entries(bags[bag].inside).reduce((sum, [next, amount]) => sum + amount * resolve2(next), 1);

console.log(resolve2('shiny gold') - 1);


