const input = require("fs").readFileSync("inputs/2023/21.txt").toString();

const threshold = 26501365;

const grid = input.split("\n").map((line) => line.split(""));
const gridLength = grid.length - 1

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

const countTilesCache = new Map()

const countTiles = (y, x, distance) => {
  if (distance > threshold) {
    return 0
  }

  const cacheKey = `${y}#${x}#${threshold - distance}`

  if (countTilesCache.has(cacheKey)) {
    return countTilesCache.get(cacheKey)
  }

  let count = 0
  const visited = new Set();
  const queue = [[y, x, distance]];

  while (queue.length > 0) {
    const [y, x, distance] = queue.pop();
    if (y < 0 || x < 0 || y > gridLength || x > gridLength) {
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
      continue;
    }

    if (distance % 2 === threshold % 2) {
      count += 1;
    }
    queue.unshift([y - 1, x, distance + 1]);
    queue.unshift([y + 1, x, distance + 1]);
    queue.unshift([y, x - 1, distance + 1]);
    queue.unshift([y, x + 1, distance + 1]);
  }

  countTilesCache.set(cacheKey, count)

  return count
};

const fullGridStartingWithOddDistance = countTiles(0, 0, 1)
const fullGridStartingWithEvenDistance = countTiles(0, 0, 0)

const getFullGridCount = (y, x, distance) => y + x + distance % 2 === 0 ? fullGridStartingWithEvenDistance : fullGridStartingWithOddDistance

const countLineCache = new Map()

const countLine = (y, x, distance) => {
  const cacheKey = `${y}#${x}#${distance}`

  if (countLineCache.has(cacheKey)) {
    return countLineCache.get(cacheKey)
  }

  let count = 0
  while (distance + 2 * gridLength < threshold) {
    count += getFullGridCount(y, x, distance)
    distance += gridLength + 1
  }

  const result = count + countTiles(y, x, distance) + countTiles(y, x, distance + gridLength + 1)

  countLineCache.set(cacheKey, result)
  return result
}

const countDiagonal = (y, x, distance) => {
  if (distance > threshold) {
    return 0
  }

  let count = 0

  while (distance + 2 * gridLength < threshold) {
    count += getFullGridCount(y, x, distance) + 2 * countLine(y, x, distance + gridLength + 1)
    distance += 2 * gridLength + 2
  }
  return count + countTiles(y, x, distance) + 2 * countLine(y, x, distance + gridLength + 1) + countDiagonal(y, x, distance + 2 * gridLength + 2)
}

let count = getFullGridCount(startPoint[0], startPoint[1], 0)

count += countLine(startPoint[0], 0, gridLength / 2 + 1)
count += countLine(startPoint[0], gridLength, gridLength / 2 + 1)
count += countLine(0, startPoint[1], gridLength / 2 + 1)
count += countLine(gridLength, startPoint[1], gridLength / 2 + 1)

count += countDiagonal(0, 0, gridLength + 2)
count += countDiagonal(0, gridLength, gridLength + 2)
count += countDiagonal(gridLength, 0, gridLength + 2)
count += countDiagonal(gridLength, gridLength, gridLength + 2)

console.log(count)
