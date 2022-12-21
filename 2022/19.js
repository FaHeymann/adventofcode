const input = require("fs").readFileSync("inputs/2022/19.txt").toString();

const instances = [];

input.split("\n").forEach((line) => {
  const [_, id, ore1, ore2, ore3, clay3, ore4, obs4] = line
    .match(
      /Blueprint (.*): Each ore robot costs (.*) ore. Each clay robot costs (.*) ore. Each obsidian robot costs (.*) ore and (.*) clay. Each geode robot costs (.*) ore and (.*) obsidian\./
    )
    .map((n) => parseInt(n, 10));

  const instance = {
    id,
    resources: [0, 0, 0, 0],
    robots: [1, 0, 0, 0],
    costs: [
      [ore1, 0, 0, 0],
      [ore2, 0, 0, 0],
      [ore3, clay3, 0, 0],
      [ore4, 0, obs4, 0],
    ],
    time: 0,
  };

  instances.push(instance);
});

const build = (instance, index) => ({
  id: instance.id,
  resources: [
    instance.resources[0] - instance.costs[index][0] + instance.robots[0],
    instance.resources[1] - instance.costs[index][1] + instance.robots[1],
    instance.resources[2] - instance.costs[index][2] + instance.robots[2],
    instance.resources[3] - instance.costs[index][3] + instance.robots[3],
  ],
  robots: [
    instance.robots[0] + (index === 0 ? 1 : 0),
    instance.robots[1] + (index === 1 ? 1 : 0),
    instance.robots[2] + (index === 2 ? 1 : 0),
    instance.robots[3] + (index === 3 ? 1 : 0),
  ],
  costs: instance.costs,
  time: instance.time + 1,
});

const calculateBest = (instance) => {
  const queue = [instance];
  let best = 0;

  const tick = () => {
    const cur = queue.pop();
    if (cur.time === 24) {
      best = Math.max(best, cur.resources[3]);
      return;
    }
    if (
      cur.resources[2] >= cur.costs[3][2] &&
      cur.resources[0] >= cur.costs[3][0]
    ) {
      queue.unshift(build(cur, 3));
      return;
    }
    if (
      cur.resources[1] >= cur.costs[2][1] &&
      cur.resources[0] >= cur.costs[2][0] &&
      cur.robots[2] < Math.max(...cur.costs.map((c) => c[2]))
    ) {
      queue.unshift(build(cur, 2));
    }
    if (
      cur.resources[0] >= cur.costs[1][0] &&
      cur.robots[1] < Math.max(...cur.costs.map((c) => c[1]))
    ) {
      queue.unshift(build(cur, 1));
    }
    if (
      cur.resources[0] >= cur.costs[0][0] &&
      cur.robots[0] < Math.max(...cur.costs.map((c) => c[0]))
    ) {
      queue.unshift(build(cur, 0));
    }
    if (cur.resources[0] < Math.max(...cur.costs.map((c) => c[0]))) {
      queue.unshift({
        ...cur,
        resources: [
          cur.resources[0] + cur.robots[0],
          cur.resources[1] + cur.robots[1],
          cur.resources[2] + cur.robots[2],
          cur.resources[3] + cur.robots[3],
        ],
        time: cur.time + 1,
      });
    }
  };

  while (queue.length > 0) {
    tick();
  }
  return best;
};

let sum = 0;

instances.forEach((instance) => {
  const result = calculateBest(instance);
  sum += instance.id * result;
});

console.log(sum);
