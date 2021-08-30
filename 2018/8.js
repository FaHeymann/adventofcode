const input = require('fs').readFileSync('inputs/2018/8.txt').toString();

const parsed = input.split(' ').map(x => parseInt(x, 10));

const nodes = {};
let id = 0;

const resolve = (input, parent) => {
  const node = {
    id: id++,
    childrenCount: input[0],
    metadataCount: input[1],
    parent,
    children: [],
  };

  nodes[node.id] = node;
  if (parent !== null) {
    nodes[parent].children.push(node.id);
  }
  input.splice(0, 2);
  for (let i = 0; i < node.childrenCount; i++) {
    input = resolve(input, node.id);
  }
  node.metadata = input.slice(0, node.metadataCount);
  input.splice(0, node.metadataCount);
  return input;
};

resolve(parsed, null);

console.log(Object.values(nodes).reduce((sum, node) => sum + node.metadata.reduce((mSum, cur) => mSum + cur, 0), 0));

const value = index => {
  const node = nodes[index];
  if (node.childrenCount === 0) {
    return node.metadata.reduce((sum, cur) => sum + cur, 0);
  }
  let sum = 0;

  node.metadata.forEach(m => {
    if (m <= node.childrenCount) {
      sum += value(node.children[m - 1]);
    }
  });
  return sum;
};

console.log(value('0'));
