// const input = `...........
// .....###.#.
// .###.##..#.
// ..#.#...#..
// ....#.#....
// .##..S####.
// .##..#...#.
// .......##..
// .##.#.####.
// .##..##.##.
// ...........`;

const input = require("fs").readFileSync("inputs/2023/21.txt").toString();

// const done = new Set()

const threshold = 26501365;

const grid = input.split("\n").map((line) => line.split(""));

// const distances = {}

let startPoint;

outer: for (let y = 0; y < grid.length; y++) {
  for (let x = 0; x < grid[0].length; x++) {
    if (grid[y][x] === "S") {
      grid[y][x] = ".";
      startPoint = [y, x];
      break outer;
    }
  }
}

const maxY = grid.length - 1;
const maxX = grid[0].length - 1;

let count = 0;

const cache = {};

const mapQueue = [[0, 0, [[startPoint[0], startPoint[1], 0]]]];

const solve = (yMap, xMap, startPoints) => {
  // console.log(yMap, xMap, startPoints)
  const distanceUntilStart = startPoints[0][2];

  const cacheKey = `${Math.sign(yMap)}#${Math.sign(xMap)}#${Math.sign(
    yMap - xMap
  )}#${Math.sign(Math.abs(yMap) - Math.abs(xMap))}#${distanceUntilStart % 2}#${startPoints
    .map((p) => p.filter((n, i) => i !== 2).join("|"))
    .join("#")}`;
  // console.log(cacheKey);

  if (cacheKey in cache) {
    console.log('hit')
    const cacheEntry = cache[cacheKey];

    // console.log(JSON.stringify(cacheEntry))

    if (cacheEntry.maxDistance + distanceUntilStart < threshold) {
      count += cacheEntry.count;

      cacheEntry.furtherCalls.forEach((furtherCall) => {
        const mappedFurtherCall = [
          yMap + furtherCall[0],
          xMap + furtherCall[1],
          furtherCall[2].map((startPoint) => {
            return [
              startPoint[0],
              startPoint[1],
              startPoint[2] + distanceUntilStart,
            ];
          }),
        ];
        // console.log('further', mappedFurtherCall)
        mapQueue.unshift(mappedFurtherCall);
      });
      return;
    }
  }

  console.log('miss')

  const cacheEntry = { count: 0, furtherCalls: [], maxDistance: 0 };
  const furtherCalls = [];

  const visited = new Set();
  const queue = startPoints;

  let wentUp = ["never", null];
  let wentRight = ["never", null];
  let wentDown = ["never", null];
  let wentLeft = ["never", null];

  let wentAboveThreshold = false;

  while (queue.length > 0) {
    const [y, x, distance] = queue.pop();
    if (y < 0 || x < 0 || y > maxY || x > maxX) {
      continue;
    }
    if (visited.has(`${y}#${x}`)) {
      continue;
    }
    visited.add(`${y}#${x}`);

    if (grid[y][x] === "#") {
      continue;
    }

    if (distance > threshold) {
      wentAboveThreshold = true;
      continue;
    }

    cacheEntry.maxDistance = Math.max(
      cacheEntry.maxDistance,
      distance - distanceUntilStart
    );

    if (y === 0 && yMap <= 0 && Math.abs(yMap) >= Math.abs(xMap)) {
      if (wentUp[0] === "never") {
        wentUp[0] = distance;
        wentUp[1] = [[maxY, x, distance + 1 - distanceUntilStart]];
        furtherCalls.push([-1, 0, wentUp[1]]);
      } else if (
        wentUp[1].every(([_, priorX, priorDistance]) => {
          return (
            Math.abs(distance - (priorDistance - 1 + distanceUntilStart)) <
            Math.abs(x - priorX)
          );
        })
      ) {
        wentUp[1].push([maxY, x, distance + 1 - distanceUntilStart]);
      }
    }
    if (y === maxY && yMap >= 0 && Math.abs(yMap) >= Math.abs(xMap)) {
      if (wentDown[0] === "never") {
        wentDown[0] = distance;
        wentDown[1] = [[0, x, distance + 1 - distanceUntilStart]];
        furtherCalls.push([1, 0, wentDown[1]]);
      } else if (
        wentDown[1].every(([_, priorX, priorDistance]) => {
          return (
            Math.abs(distance - (priorDistance - 1 + distanceUntilStart)) <
            Math.abs(x - priorX)
          );
        })
      ) {
        wentDown[1].push([0, x, distance + 1 - distanceUntilStart]);
      }
    }

    if (x === 0 && xMap <= 0 && Math.abs(yMap) <= Math.abs(xMap)) {
      if (wentLeft[0] === "never") {
        wentLeft[0] = distance;
        wentLeft[1] = [[y, maxX, distance + 1 - distanceUntilStart]];
        furtherCalls.push([0, -1, wentLeft[1]]);
      } else if (
        wentLeft[1].every(([priorY, _, priorDistance]) => {
          return (
            Math.abs(distance - (priorDistance - 1 + distanceUntilStart)) <
            Math.abs(y - priorY)
          );
        })
      ) {
        wentLeft[1].push([y, maxX, distance + 1 - distanceUntilStart]);
      }
    }
    if (x === maxX && xMap >= 0 && Math.abs(yMap) <= Math.abs(xMap)) {
      if (wentRight[0] === "never") {
        wentRight[0] = distance;
        wentRight[1] = [[y, 0, distance + 1 - distanceUntilStart]];
        furtherCalls.push([0, 1, wentRight[1]]);
      } else if (
        wentRight[1].every(([priorY, _, priorDistance]) => {
          return (
            Math.abs(distance - (priorDistance - 1 + distanceUntilStart)) <
            Math.abs(y - priorY)
          );
        })
      ) {
        wentRight[1].push([y, 0, distance + 1 - distanceUntilStart]);
      }
    }

    if (
      y === 0 &&
      x === 0 &&
      yMap <= 0 &&
      xMap <= 0 &&
      Math.abs(xMap) === Math.abs(yMap)
    ) {
      // top left
      furtherCalls.push([
        -1,
        -1,
        [[maxY, maxX, distance + 2 - distanceUntilStart]],
      ]);
    }
    if (
      y === 0 &&
      x === maxX &&
      yMap <= 0 &&
      xMap >= 0 &&
      Math.abs(xMap) === Math.abs(yMap)
    ) {
      // top right
      furtherCalls.push([
        -1,
        1,
        [[maxY, 0, distance + 2 - distanceUntilStart]],
      ]);
    }
    if (
      y === maxY &&
      x === 0 &&
      yMap >= 0 &&
      xMap <= 0 &&
      Math.abs(xMap) === Math.abs(yMap)
    ) {
      // bottom left
      furtherCalls.push([
        1,
        -1,
        [[0, maxX, distance + 2 - distanceUntilStart]],
      ]);
    }
    if (
      y === maxY &&
      x === maxX &&
      yMap >= 0 &&
      xMap >= 0 &&
      Math.abs(xMap) === Math.abs(yMap)
    ) {
      // bottom right
      furtherCalls.push([1, 1, [[0, 0, distance + 2 - distanceUntilStart]]]);
    }

    if (distance % 2 === threshold % 2) {
      count += 1;
      cacheEntry.count += 1;
    }
    queue.unshift([y - 1, x, distance + 1]);
    queue.unshift([y + 1, x, distance + 1]);
    queue.unshift([y, x - 1, distance + 1]);
    queue.unshift([y, x + 1, distance + 1]);
  }

  furtherCalls.forEach((furtherCall) => {
    const mappedFurtherCall = [
      yMap + furtherCall[0],
      xMap + furtherCall[1],
      furtherCall[2].map((startPoint) => {
        return [
          startPoint[0],
          startPoint[1],
          startPoint[2] + distanceUntilStart,
        ];
      }),
    ];
    mapQueue.unshift(mappedFurtherCall);
    cacheEntry.furtherCalls.push(furtherCall);
  });

  // console.log(cacheEntry.count, wentAboveThreshold)

  if (!wentAboveThreshold) {
    cache[cacheKey] = cacheEntry;
  }
};

while (mapQueue.length > 0) {
  solve(...mapQueue.pop());
}

console.log(count);
