const input = require("fs").readFileSync("inputs/2022/16.txt").toString();

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

const unprocessedNodes = JSON.parse(JSON.stringify(nodes))

Object.entries(nodes).forEach(([key, curNode]) => {
  if (curNode.value !== 0) {
    return
  }

  console.log("removing", key);
  curNode.neighbors.forEach((neighbor) => {
    curNode.neighbors.forEach((insert) => {
      if (insert.name === neighbor.name) {
        return;
      }

      if (
        nodes[neighbor.name].neighbors
          .map((n) => n.name)
          .includes(insert.name)
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

const serialize = (state) => {
  let result = `${state.position}#`;
  const open = Array.from(state.open)
  open.sort()
  return result + open.join('');
};

const initialState = {
  position: "AA",
  time: 0,
  open: new Set(),
  release: 0,
  history: ["AA"],
};
const initializeQueue = [initialState];
const initialiseSeen = new Set()
const queues = []
for(let i = 0; i < 50; i++) {
  queues.push([])
}
const seen = new Map();
let max = 0;

const initializeTick = () => {
  const state = initializeQueue.pop();
  const curNode = unprocessedNodes[state.position];

  if (initialiseSeen.has(state.position)) {
    return
  }

  initialiseSeen.add(state.position)

  if (curNode.value !== 0) {
    queues[state.time].push(state)
    return
  }

  curNode.neighbors.forEach((n) => {
    initializeQueue.unshift({
      position: n.name,
      time: state.time + 1,
      open: new Set([...state.open]),
      release: state.release,
      history: [...state.history, n.name]
    });
  });
}

while(initializeQueue.length > 0) {
  initializeTick()
}

let time = 0

const tick = () => {
  if (queues[time].length === 0) {
    time++;
    return
  }

  const state = queues[time].pop();
  const curNode = nodes[state.position];

  if (time >= 30) {
    max = Math.max(max, state.release)
    return
  }

  if (seen.has(serialize(state))) {
    const best = seen.get(serialize(state));
    if (best >= state.release) {
      return;
    }
  }

  seen.set(serialize(state), state.release);

  if (curNode.value > 0 && !state.open.has(state.position)) {
    queues[time + 1].unshift({
      position: state.position,
      time: state.time + 1,
      open: new Set([...state.open, state.position]),
      release: state.release + (30 - time - 1) * curNode.value,
      history: [...state.history, state.position]
    });
  }

  curNode.neighbors.forEach((n) => {
    queues[time + n.dist].unshift({
      position: n.name,
      time: state.time + n.dist,
      open: new Set([...state.open]),
      release: state.release,
      history: [...state.history, n.name]
    });
  });
};

for (let i = 0; time < 50; i++) {
  tick();
}

console.log(max)
