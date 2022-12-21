const input = require("fs").readFileSync("inputs/2022/16.txt").toString();

let nodes = {};
const relevantNodes = [];

input.split("\n").map((line) => {
  let [_, name, value, neighbors] = line.match(
    /Valve (.*) has flow rate=(.*); tunnels* leads* to valves* (.*)/
  );
  value = parseInt(value, 10);
  neighbors = neighbors.split(", ");

  if (value > 0) {
    relevantNodes.push(name);
  }

  nodes[name] = {
    name,
    value,
    neighbors,
  };
});

const distances = {};

["AA", ...relevantNodes].forEach((source) => {
  distances[source] = {};
  const visited = new Set();

  const queue = [{ node: source, dist: 0 }];
  const tick = () => {
    const { node, dist } = queue.pop();
    if (visited.has(node)) {
      return;
    }
    visited.add(node);

    if (relevantNodes.includes(node) && node !== source) {
      distances[source][node] = dist;
    }

    nodes[node].neighbors.forEach((n) => {
      queue.unshift({ node: n, dist: dist + 1 });
    });
  };

  while (queue.length > 0) {
    tick();
  }
});

const initialState = {
  pos: "AA",
  time: 0,
  path: ["AA"],
  timings: {},
};
const queue = [initialState];

const results = [];

const tick = () => {
  const state = queue.pop();
  if (state.time >= 26) {
    results.push(state);
    return;
  }

  let done = true;
  Object.keys(distances[state.pos])
    .filter((p) => distances[state.pos][p] < 4)
    .filter((p) => !state.path.includes(p))
    .forEach((next) => {
      done = false;
      queue.unshift({
        pos: next,
        time: state.time + distances[state.pos][next] + 1,
        path: [...state.path, next],
        timings: {
          ...state.timings,
          [next]: state.time + distances[state.pos][next] + 1,
        },
      });
    });
  if (done) {
    results.push(state);
  }
};

while (queue.length > 0) {
  tick();
}

let max2 = 0;

results.forEach((r1) => {
  results.forEach((r2) => {
    let score = 0
    Object.values(nodes).forEach(node => {
      let start = Math.min(r1.timings[node.name] || 26, r2.timings[node.name] || 26)
      score += (26 - start) * node.value
    })
    max2 = Math.max(score, max2)
  });
});

console.log(max2);

