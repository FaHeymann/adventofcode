// const input = `#.#####################
// #.......#########...###
// #######.#########.#.###
// ###.....#.>.>.###.#.###
// ###v#####.#v#.###.#.###
// ###.>...#.#.#.....#...#
// ###v###.#.#.#########.#
// ###...#.#.#.......#...#
// #####.#.#.#######.#.###
// #.....#.#.#.......#...#
// #.#####.#.#.#########v#
// #.#...#...#...###...>.#
// #.#.#v#######v###.###v#
// #...#.>.#...>.>.#.###.#
// #####v#.#.###v#.#.###.#
// #.....#...#...#.#.#...#
// #.#########.###.#.#.###
// #...###...#...#...#.###
// ###.###.#.###v#####v###
// #...#...#.#.>.>.#.>.###
// #.###.###.#.###.#.#v###
// #.....###...###...#...#
// #####################.#`;

const input = require("fs").readFileSync("inputs/2023/23.txt").toString();

const grid = input.split("\n").map((line) => line.split(""));

const isWall = (y, x) => {
  if (y < 0 || y >= grid.length || x < 0 || x >= grid[0].length) {
    return true;
  }
  return grid[y][x] === "#";
};

const isNode = (y, x) => {
  if (y === 0 || y === grid.length - 1) {
    return true;
  }
  let connectorCount = 0;
  [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ].forEach(([dy, dx]) => {
    if (!isWall(y + dy, x + dx)) {
      connectorCount += 1;
    }
  });

  return connectorCount > 2;
};

const START = "0#1"
const FINISH = `${grid.length - 1}#${grid[0].length - 2}`

const nodes = {
  "0#1": { y: 0, x: 1, neighbors: new Set() },
};

const distances = {};

const followPath = ([y, x], [lastY, lastX], distance) => {
  if (isNode(y, x)) {
    return [[y, x], distance];
  }

  let result;
  [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ].forEach(([dy, dx]) => {
    if (!isWall(y + dy, x + dx) && (y + dy !== lastY || x + dx !== lastX)) {
      result = followPath([y + dy, x + dx], [y, x], distance + 1);
    }
  });
  return result;
};

const nodeQueue = [[0, 1]];
const visitedNodes = new Set();
let maxDistance = 0

while (nodeQueue.length > 0) {
  const [y, x] = nodeQueue.pop();
  if (visitedNodes.has(`${y}#${x}`)) {
    continue;
  }

  visitedNodes.add(`${y}#${x}`);
  [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ].forEach(([dy, dx]) => {
    if (!isWall(y + dy, x + dx)) {
      const [nextNode, distance] = followPath([y + dy, x + dx], [y, x], 1);
      if (!(`${nextNode[0]}#${nextNode[1]}` in nodes)) {
        nodes[`${nextNode[0]}#${nextNode[1]}`] = {
          y: nextNode[0],
          x: nextNode[1],
          neighbors: new Set(),
        };
      }

      nodes[`${y}#${x}`].neighbors.add(`${nextNode[0]}#${nextNode[1]}`);
      nodes[`${nextNode[0]}#${nextNode[1]}`].neighbors.add(`${y}#${x}`);

      if (!(`${y}#${x}` in distances)) {
        distances[`${y}#${x}`] = {};
      }
      if (!(`${nextNode[0]}#${nextNode[1]}` in distances)) {
        distances[`${nextNode[0]}#${nextNode[1]}`] = {};
      }

      distances[`${y}#${x}`][`${nextNode[0]}#${nextNode[1]}`] = distance;
      distances[`${nextNode[0]}#${nextNode[1]}`][`${y}#${x}`] = distance;
      maxDistance = Math.max(maxDistance, distance)

      nodeQueue.push([...nextNode]);
    }
  });
}

const queue = [[[START], 0]];
let max = 0

while (queue.length > 0) {
  const [history, distance] = queue.pop();
  const curNode = nodes[history[0]];


  const bestPossible = distance + Object.values(distances[FINISH])[0] + (Object.keys(nodes).length - history.length - 1) * maxDistance
  if (bestPossible < max) {
    continue
  }

  if (history[0] === FINISH) {
    max = Math.max(max, distance)
  }

  curNode.neighbors.forEach((neighbor) => {
    if (!history.includes(neighbor)) {
      queue.push([
        [neighbor, ...history],
        distance + distances[history[0]][neighbor],
      ]);
    }
  });
}

console.log('max', max)
