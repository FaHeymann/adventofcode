// const moves = `>>><<><>><<<>><>>><<<>>><<<><<<>><>><<>>`;
const moves = require("fs").readFileSync("inputs/2022/17.txt").toString();

let moveIndex = 0;
const getNextMove = () => {
  const move = moves[moveIndex];
  moveIndex++;
  moveIndex %= moves.length;
  return move;
};

const rocks = [
  (height) => [
    [height + 4, 2],
    [height + 4, 3],
    [height + 4, 4],
    [height + 4, 5],
  ], // hor. line
  (height) => [
    [height + 4, 3],
    [height + 5, 2],
    [height + 5, 3],
    [height + 5, 4],
    [height + 6, 3],
  ], // plus
  (height) => [
    [height + 4, 2],
    [height + 4, 3],
    [height + 4, 4],
    [height + 5, 4],
    [height + 6, 4],
  ], // l
  (height) => [
    [height + 4, 2],
    [height + 5, 2],
    [height + 6, 2],
    [height + 7, 2],
  ], // vert. line
  (height) => [
    [height + 4, 2],
    [height + 4, 3],
    [height + 5, 2],
    [height + 5, 3],
  ], // block
];

let rockIndex = 0;
const positionNextRock = (height) => {
  const rock = rocks[rockIndex](height);
  rockIndex++;
  rockIndex %= rocks.length;
  return rock;
};

let height = 0;
let reduced = 0;
let occupied = new Set();
const isOccupied = (y, x) => {
  if (x < 0 || x > 6 || y <= 0) {
    return true;
  }
  return occupied.has(`${y}#${x}`);
};

const horizontalMove = (rock) => {
  const move = getNextMove();
  const add = move === "<" ? -1 : 1;

  for (let i = 0; i < rock.length; i++) {
    const point = rock[i];
    if (isOccupied(point[0], point[1] + add)) {
      return;
    }
  }
  for (let i = 0; i < rock.length; i++) {
    rock[i][1] = rock[i][1] + add;
  }
};

const fall = (rock) => {
  for (let i = 0; i < rock.length; i++) {
    const point = rock[i];
    if (isOccupied(point[0] - 1, point[1])) {
      return true;
    }
  }
  for (let i = 0; i < rock.length; i++) {
    rock[i][0] = rock[i][0] - 1;
  }
  return false;
};

const isReachable = (targetY, targetX) => {
  const queue = [{ y: height + 1, x: 0 }];
  let seen = new Set();
  const tick = () => {
    const { y, x } = queue.pop();

    if (y === targetY && x === targetX) {
      return true;
    }
    if (y < targetY) {
      return false;
    }
    if (x < 0 || x > 6) {
      return false;
    }
    if (occupied.has(`${y}#${x}`)) {
      return false;
    }
    if (seen.has(`${y}#${x}`)) {
      return false;
    }
    seen.add(`${y}#${x}`);

    queue.unshift({ y: y - 1, x });
    queue.unshift({ y, x: x + 1 });
    queue.unshift({ y, x: x - 1 });
  };

  while (queue.length > 0) {
    if (tick()) {
      return true;
    }
  }
  return false;
};

const reduceOccupied = () => {
  const next = new Set();
  let minY = Number.MAX_SAFE_INTEGER;
  occupied.forEach((o) => {
    const [y, x] = o.split("#").map((n) => parseInt(n, 10));
    if (isReachable(y, x)) {
      next.add(`${y}#${x}`);
      minY = Math.min(minY, y);
    }
  });

  const next2 = new Set();
  next.forEach((o) => {
    const [y, x] = o.split("#").map((n) => parseInt(n, 10));
    next2.add(`${y - minY + 1}#${x}`);
  });
  height -= minY - 1;
  reduced += minY - 1;

  occupied = next2;
};

let cycle = new Map();

const calculateKey = () => {
  let key = `${rockIndex}|${moveIndex}|`;
  const occ = [...occupied].map((s) =>
    s.split("#").map((n) => parseInt(n, 10))
  );
  occ.sort(([y1, x1], [y2, x2]) => {
    if (y1 === y2) {
      return x2 - x1;
    }
    return y2 - y1;
  });
  key += occ.join("|");
  return key;
};

let cycleHandled = false;

const target = 1000000000000

for (let i = 0; i < target; i++) {
  const rock = positionNextRock(height);
  let done = false;
  while (!done) {
    horizontalMove(rock);
    done = fall(rock);
  }
  rock.forEach((p) => {
    occupied.add(`${p[0]}#${p[1]}`);
    height = Math.max(height, p[0]);
  });
  reduceOccupied();
  const key = calculateKey();
  if (key in cycle && !cycleHandled) {
    cycleHandled = true;
    const jump = i - cycle[key][0];
    const add = reduced - cycle[key][1];
    const cycles = Math.floor((target - i - jump) / jump);
    i += cycles * jump;
    reduced += cycles * add;
  }
  cycle[key] = [i, reduced];
}

console.log(height + reduced);
