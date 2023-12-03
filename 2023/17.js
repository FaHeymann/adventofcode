const input = require("fs").readFileSync("inputs/2023/17.txt").toString();

const grid = input
  .split("\n")
  .map((l) => l.split("").map((n) => parseInt(n, 10)));

const key = (y, x, d) => `${y}#${x}#${d}`;

const solve = (moves) => {
  const distances = new Map();
  distances.set(key(0, 0, "_"), 0);

  const getDistance = (key) => {
    if (distances.has(key)) {
      return distances.get(key);
    }
    return Number.MAX_SAFE_INTEGER;
  };

  const visitable = new Set();
  visitable.add(key(0, 0, "_"));

  const done = new Set();

  const findNext = () => {
    let [minKey, minValue] = ["", Number.MAX_SAFE_INTEGER];
    visitable.forEach((key) => {
      if (getDistance(key) < minValue) {
        minKey = key;
        minValue = getDistance(key);
      }
    });

    return minKey;
  };

  const tryMove = (y, x, d, dy, dx) => {
    const distance = getDistance(key(y, x, d));
    const newY = y + dy;
    const newX = x + dx;
    if (newY < 0 || newX < 0 || newY >= grid.length || newX >= grid[0].length) {
      return;
    }
    let newD;
    if (dy !== 0) {
      newD = "vertical";
    }
    if (dx !== 0) {
      newD = "horizontal";
    }

    if (d === newD) {
      return;
    }

    if (done.has(key(newY, newX, newD))) {
      return;
    }

    let distanceDifference = 0;
    for (let i = y + 1; i <= y + dy; i++) {
      distanceDifference += grid[i][x];
    }
    for (let i = y + dy; i < y; i++) {
      distanceDifference += grid[i][x];
    }
    for (let i = x + 1; i <= x + dx; i++) {
      distanceDifference += grid[y][i];
    }
    for (let i = x + dx; i < x; i++) {
      distanceDifference += grid[y][i];
    }

    distances.set(
      key(newY, newX, newD),
      Math.min(
        getDistance(key(newY, newX, newD)),
        distance + distanceDifference
      )
    );
    visitable.add(key(newY, newX, newD));
  };

  while (true) {
    const cur = findNext();

    const [y, x, d] = cur
      .split("#")
      .map((n, i) => (i !== 2 ? parseInt(n, 10) : n));

    const distance = getDistance(key(y, x, d));

    if (y === grid.length - 1 && x === grid[0].length - 1) {
      return distance
    }

    moves.forEach((delta) => {
      tryMove(y, x, d, delta, 0);
      tryMove(y, x, d, 0, delta);
    });

    done.add(cur);
    visitable.delete(cur);
  }
};

console.log(solve([-3, -2, -1, 1, 2, 3]))
console.log(solve([-10, -9, -8, -7, -6, -5, -4, 4, 5, 6, 7, 8, 9, 10]))
