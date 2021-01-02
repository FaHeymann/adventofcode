const input = require('fs').readFileSync('inputs/2017/7.txt').toString();

const tree = {};

input.split('\n').forEach(line => {
  if (line.includes('->')) {
    const [_, name, value, children] = line.match(/^([a-z]+) \(([0-9]+)\) -> (.*)$/);
    if (!tree[name]) {
      tree[name] = {};
    }
    tree[name].value = parseInt(value, 10);
    tree[name].children = children.split(', ');
    children.split(', ').forEach(child => {
      if (!tree[child]) {
        tree[child] = {};
      }
      tree[child].parent = name;
    });
  } else {
    const [_, name, value] = line.match(/^([a-z]+) \(([0-9]+)\)$/);
    if (!tree[name]) {
      tree[name] = {};
    }
    tree[name].value = parseInt(value, 10);
  }
});

const root = Object.entries(tree).filter(([key, value]) => !value.parent)[0][0];

console.log(root);

const resolve = nodeName => {
  const node = tree[nodeName];
  if (node.weight) {
    return node.weight;
  }
  if (!node.children || node.children.length === 0) {
    node.weight = node.value;
    node.balanced = true;
    return node.value;
  }

  node.weight = node.value + node.children.reduce((sum, child) => sum + resolve(child), 0);

  const childWeights = node.children.map(child => tree[child].weight);

  node.isBalanced = childWeights.reduce((res, cur) => res && cur === childWeights[0], true);

  if (!node.isBalanced) {
    const tooHeavyWeight = Math.max(...childWeights);
    const tooHeavyTower = node.children.find(child => tree[child].weight === tooHeavyWeight);
    const imbalance = Math.max(...childWeights) - Math.min(...childWeights);
    console.log(tree[tooHeavyTower].value - imbalance);

    process.exit(0);
  }

  return node.weight;
}

resolve(root);

// console.log(tree[root]);
