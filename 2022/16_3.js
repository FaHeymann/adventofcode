// const input = `Valve AA has flow rate=0; tunnels lead to valves DD, II, BB
// Valve BB has flow rate=13; tunnels lead to valves CC, AA
// Valve CC has flow rate=2; tunnels lead to valves DD, BB
// Valve DD has flow rate=20; tunnels lead to valves CC, AA, EE
// Valve EE has flow rate=3; tunnels lead to valves FF, DD
// Valve FF has flow rate=0; tunnels lead to valves EE, GG
// Valve GG has flow rate=0; tunnels lead to valves FF, HH
// Valve HH has flow rate=22; tunnel leads to valve GG
// Valve II has flow rate=0; tunnels lead to valves AA, JJ
// Valve JJ has flow rate=21; tunnel leads to valve II`;

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

console.log(Object.values(nodes).length)
