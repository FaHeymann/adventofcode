const input = require("fs")
  .readFileSync("inputs/2021/12.txt")
  .toString()
  .split("\n");

const nodes = new Map();

input.forEach((line) => {
  const [a, b] = line.split("-");
  if (!nodes.has(a)) {
    nodes.set(a, []);
  }
  if (!nodes.has(b)) {
    nodes.set(b, []);
  }
  nodes.get(a).push(b);
  nodes.get(b).push(a);
});

let count = 0;

const rec = (node, visited, repeats) => {
  if (node === "end") {
    count++;
    return;
  }
  if (node === "start" && visited.has("start")) {
    return;
  }
  if (node.toLowerCase() === node && visited.has(node)) {
    if (repeats <= 0) {
      return;
    }
    repeats--;
  }
  visited.add(node);
  nodes.get(node).forEach((next) => {
    rec(next, new Set(visited), repeats);
  });
};

rec("start", new Set(), 0);
console.log(count);
count = 0;
rec("start", new Set(), 1);
console.log(count);
