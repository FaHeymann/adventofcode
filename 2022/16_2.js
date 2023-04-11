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

input.split("\n").map((line) => {
  let [_, name, value, neighbors] = line.match(
    /Valve (.*) has flow rate=(.*); tunnels* leads* to valves* (.*)/
  );
  value = parseInt(value, 10);
  neighbors = neighbors.split(", ").map((n) => ({ name: n, dist: 1 }));

  nodes[name] = {
    name,
    value,
    neighbors,
  };
});

const unprocessedNodes = JSON.parse(JSON.stringify(nodes));

Object.entries(nodes).forEach(([key, curNode]) => {
  if (curNode.value !== 0) {
    return;
  }

  console.log("removing", key);
  curNode.neighbors.forEach((neighbor) => {
    curNode.neighbors.forEach((insert) => {
      if (insert.name === neighbor.name) {
        return;
      }

      if (
        nodes[neighbor.name].neighbors.map((n) => n.name).includes(insert.name)
      ) {
        const existing = nodes[neighbor.name].neighbors.find(
          (n) => n.name === insert.name
        );
        existing.dist = Math.min(existing.dist, insert.dist + neighbor.dist);
        return;
      }

      nodes[neighbor.name].neighbors.push({
        name: insert.name,
        dist: insert.dist + neighbor.dist,
      });
    });

    nodes[neighbor.name].neighbors = nodes[neighbor.name].neighbors.filter(
      (n) => n.name !== key
    );
  });
  delete nodes[key];
});

const serialize = (state) => `${state.position}#${state.openHistory}`;

const initialState = {
  position: "AA",
  time: 0,
  release: 0,
  openHistory: "",
  timings: {}
};
const initializeQueue = [initialState];
const initialiseSeen = new Set();
const queues = [];
for (let i = 0; i < 50; i++) {
  queues.push([]);
}
const seen = new Set();
let max = 0;

const initializeTick = () => {
  const state = initializeQueue.pop();
  const curNode = unprocessedNodes[state.position];

  if (initialiseSeen.has(state.position)) {
    return;
  }

  initialiseSeen.add(state.position);

  if (curNode.value !== 0) {
    queues[state.time].push(state);
    return;
  }

  curNode.neighbors.forEach((n) => {
    initializeQueue.unshift({
      position: n.name,
      time: state.time + 1,
      release: state.release,
      openHistory: state.openHistory,
      timings: state.timings,
    });
  });
};

while (initializeQueue.length > 0) {
  initializeTick();
}

let time = 0;

const branches = []

const tick = () => {
  if (queues[time].length === 0) {
    time++;
    return;
  }

  const state = queues[time].pop();
  const curNode = nodes[state.position];

  if (time >= 26) {
    // max = Math.max(max, state.release);
    branches.push(state.timings)
    return;
  }

  if (seen.has(serialize(state))) {
    return
  }

  seen.add(serialize(state));

  if (!state.openHistory.split('#').includes(state.position)) {
    queues[time + 1].unshift({
      position: state.position,
      time: state.time + 1,
      release: state.release + (30 - time - 1) * curNode.value,
      openHistory: state.openHistory + state.position + '#',
      timings: {...state.timings, [state.position]: time},
    });
  }
  curNode.neighbors.forEach((n) => {
    queues[time + n.dist].unshift({
      position: n.name,
      time: state.time + n.dist,
      release: state.release,
      openHistory: state.openHistory,
      timings: state.timings,
    });
  });
};

// tick();
// console.log(queues)
// console.log(seen)
// tick();
// console.log(queues)
// console.log(seen)
// tick();
// console.log(queues)
// console.log(seen)

for (let i = 0; time < 50; i++) {
  tick();
  // console.log(seen)
  // console.log(queue)
}

console.log(branches.length)

for (let i = 0; i < branches.length; i++) {
  for (let j = 0; j < i; j++) {
    b1 = branches[i]
    b2 = branches[j]
    let value = 0
    Object.values(nodes).forEach(node => {
      let start = Math.min(b1[node.name] || 30, b2[node.name] || 25)
      value += (26 - start - 1) * node.value
    })
    max = Math.max(value, max)
  }
}

console.log(max)

// while(queue.length > 0) {

// }
