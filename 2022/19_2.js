const input = require("fs").readFileSync("inputs/2022/19.txt").toString();

const instances = [];

input.split("\n").forEach((line, i) => {
  if (i > 2) {
    return;
  }
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
    couldHaveBuilt: [false, false, false],
  };

  instances.push(instance);
});

console.log(instances);

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
  couldHaveBuilt: [false, false, false]
});

const seen = new Map();

const calculateBest = (instance) => {
  const queue = [instance];
  let best = 0;

  const tick = () => {
    const cur = queue.pop();
    if (cur.time === 32) {
      best = Math.max(best, cur.resources[3]);
      return;
    }

    // if (seen.has(cur.robots.join("#"))) {
    //   const enc = seen.get(cur.robots.join("#"));
    //   if (
    //     enc[0] >= cur.resources[0] &&
    //     enc[1] >= cur.resources[1] &&
    //     enc[2] >= cur.resources[2] &&
    //     enc[3] >= cur.resources[3]
    //   ) {
    //     console.log('end branch')
    //     return;
    //   }
    // }
    // seen.set(cur.robots.join("#"), [...cur.resources]);

    if (
      cur.resources[2] >= cur.costs[3][2] &&
      cur.resources[0] >= cur.costs[3][0]
    ) {
      queue.unshift(build(cur, 3));
      return;
    }

    let couldHaveBuilt = [...cur.couldHaveBuilt]
    let didSomething = false

    if (
      cur.resources[1] >= cur.costs[2][1] &&
      cur.resources[0] >= cur.costs[2][0] &&
      cur.robots[2] < Math.max(...cur.costs.map((c) => c[2])) &&
      !cur.couldHaveBuilt[2]
    ) {
      queue.unshift(build(cur, 2));
      couldHaveBuilt[2] = true
      didSomething = true
    }
    if (
      cur.resources[0] >= cur.costs[1][0] &&
      cur.robots[1] < Math.max(...cur.costs.map((c) => c[1])) &&
      !cur.couldHaveBuilt[1]
    ) {
      queue.unshift(build(cur, 1));
      couldHaveBuilt[1] = true
      didSomething = true
    }
    if (
      cur.resources[0] >= cur.costs[0][0] &&
      cur.robots[0] < Math.max(cur.costs[1][0], cur.costs[2][0], cur.costs[3][0]) &&
      !cur.couldHaveBuilt[0]
    ) {
      queue.unshift(build(cur, 0));
      couldHaveBuilt[0] = true
      didSomething = true
    }

    if (cur.resources[0] < Math.max(cur.costs[1][0], cur.costs[2][0], cur.costs[3][0]) || !didSomething) {
      queue.unshift({
        ...cur,
        resources: [
          cur.resources[0] + cur.robots[0],
          cur.resources[1] + cur.robots[1],
          cur.resources[2] + cur.robots[2],
          cur.resources[3] + cur.robots[3],
        ],
        time: cur.time + 1,
        couldHaveBuilt,
      });
    }
  };

  while (queue.length > 0) {
    tick();
  }
  return best;
};

let prod = 1;

instances.forEach((instance) => {
  const result = calculateBest(instance);
  console.log(result);
  prod *= result;
});

console.log(prod);
