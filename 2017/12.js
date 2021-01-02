const input = require('fs').readFileSync('inputs/2017/12.txt').toString();

const nodes = {};

input.split('\n').forEach(line => {
  const [_, node, neighbors] = line.match(/^([0-9]+) <-> (.*)$/);
  if (!nodes[node]) {
    nodes[node] = {
      neighbors: {},
      self: false,
    };
  }
  neighbors.split(', ').forEach(neighbor => {
    if (neighbor === node) {
      nodes[node].self = true;
    } else {
      nodes[node].neighbors[neighbor] = true;
    }
  });
});

const resolve = node => {
  if (nodes[node].resolved1 === true) {
    return 0;
  }
  nodes[node].resolved1 = true;
  return 1 + Object.keys(nodes[node].neighbors).reduce((sum, neighbor) => sum + resolve(neighbor), 0);
};

console.log(resolve(0));

let groupId = 1;
let visited = [];

const resolve2 = node => {
  if (visited.includes(node)) {
    return;
  }
  visited.push(node);
  if (nodes[node].groupId) {
    return nodes[node].groupId;
  }
  let id;
  Object.keys(nodes[node].neighbors).some(neighbor => {
    const result = resolve2(neighbor);
    if (result) {
      id = result;
      return true;
    }
  });
  return id;
}

Object.keys(nodes).forEach(node => {
  const id = resolve2(node);
  if (!id) {
    nodes[node].groupId = groupId++;
  }
  visited = [];
});

console.log(groupId - 1);
