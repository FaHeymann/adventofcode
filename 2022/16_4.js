const input = `Valve AA has flow rate=0; tunnels lead to valves DD, II, BB
Valve BB has flow rate=13; tunnels lead to valves CC, AA
Valve CC has flow rate=2; tunnels lead to valves DD, BB
Valve DD has flow rate=20; tunnels lead to valves CC, AA, EE
Valve EE has flow rate=3; tunnels lead to valves FF, DD
Valve FF has flow rate=0; tunnels lead to valves EE, GG
Valve GG has flow rate=0; tunnels lead to valves FF, HH
Valve HH has flow rate=22; tunnel leads to valve GG
Valve II has flow rate=0; tunnels lead to valves AA, JJ
Valve JJ has flow rate=21; tunnel leads to valve II`;

// const input = require("fs").readFileSync("inputs/2022/16.txt").toString();

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

console.log(distances);

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
  if (state.time >= 30) {
    results.push(state);
    return;
  }

  let done = true;
  Object.keys(distances[state.pos])
    // .filter((p) => distances[state.pos][p] <= 5)
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

console.log(results.length);

let max = 0;

results.forEach((result) => {
  let score = 0;
  Object.entries(result.timings).forEach(([key, time]) => {
    score += (30 - time) * nodes[key].value;
  });
  max = Math.max(max, score);
});

console.log(max);

