// const input = `#.######
// #>>.<^<#
// #.<..<<#
// #>v.><>#
// #<^v^^>#
// ######.#`;

// const input = `#.#####
// #.....#
// #.>...#
// #.....#
// #.....#
// #...v.#
// #####.#`;

const input = require("fs").readFileSync("inputs/2022/24.txt").toString();

const wallY = input.split("\n").length - 1;
const wallX = input.split("\n")[0].split("").length - 1;
const spaceY = wallY - 1;
const spaceX = wallX - 1;
const cycleLength = spaceX * spaceY;

console.log(spaceY, spaceX);

const bliz = [];

input.split("\n").forEach((line, y) => {
  line.split("").forEach((s, x) => {
    if (s === ">") {
      bliz.push({
        getY: () => y,
        getX: (turn) => ((x + turn - 1) % spaceX) + 1,
      });
    }
    if (s === "<") {
      bliz.push({
        getY: () => y,
        getX: (turn) => ((((x - turn - 1) % spaceX) + spaceX) % spaceX) + 1,
      });
    }
    if (s === "^") {
      bliz.push({
        getY: (turn) => ((((y - turn - 1) % spaceY) + spaceY) % spaceY) + 1,
        getX: () => x,
      });
    }
    if (s === "v") {
      bliz.push({
        getY: (turn) => ((y + turn - 1) % spaceY) + 1,
        getX: () => x,
      });
    }
  });
});

let occupied = [];

for (let i = 0; i < cycleLength; i++) {
  occupied[i] = new Set();
  bliz.forEach((b) => {
    occupied[i].add(`${b.getY(i)}#${b.getX(i)}`);
  });
}

// console.log(occupied[0]);
// console.log(occupied[1]);

let queue = [{ y: 0, x: 1, t: 0 }];
let seen = new Set();

const tick = (forward) => {
  const { y, x, t } = queue.pop();

  if (seen.has(`${y}#${x}#${t}`)) {
    return;
  }
  seen.add(`${y}#${x}#${t}`);

  if (forward && y === wallY - 1 && x === wallX - 1) {
    return t + 1;
  }

  if (!forward && y === 1 && x === 1) {
    return t + 1;
  }

  if (y === 0) {
    queue.unshift({ y, x, t: t + 1 });
    if (!occupied[(t + 1) % cycleLength].has(`${y + 1}#${x}`)) {
      queue.unshift({ y: y + 1, x, t: t + 1 });
    }
    return false;
  }

  if (y === wallY) {
    queue.unshift({ y, x, t: t + 1 });
    if (!occupied[(t - 1) % cycleLength].has(`${y - 1}#${x}`)) {
      queue.unshift({ y: y - 1, x, t: t + 1 });
    }
    return false;
  }

  if (!occupied[(t + 1) % cycleLength].has(`${y}#${x}`)) {
    queue.unshift({ y, x, t: t + 1 });
  }
  if (y > 1 && !occupied[(t + 1) % cycleLength].has(`${y - 1}#${x}`)) {
    queue.unshift({ y: y - 1, x, t: t + 1 });
  }
  if (y < wallY - 1 && !occupied[(t + 1) % cycleLength].has(`${y + 1}#${x}`)) {
    queue.unshift({ y: y + 1, x, t: t + 1 });
  }
  if (x > 1 && !occupied[(t + 1) % cycleLength].has(`${y}#${x - 1}`)) {
    queue.unshift({ y, x: x - 1, t: t + 1 });
  }
  if (x < wallX - 1 && !occupied[(t + 1) % cycleLength].has(`${y}#${x + 1}`)) {
    queue.unshift({ y, x: x + 1, t: t + 1 });
  }
  return false;
};

let timeAfterTrip;

[true, false, true].forEach(forward => {
  while (true) {
  const result = tick(true);
  if (result) {
    timeAfterTrip = result;
    break;
  }
}

console.log(timeAfterTrip);

queue = [{ y: wallY, x: wallX - 1, t: timeAfterTrip }];
seen = new Set();
})

while (true) {
  const result = tick(true);
  if (result) {
    timeAfterTrip = result;
    break;
  }
}

console.log(timeAfterTrip);

queue = [{ y: wallY, x: wallX - 1, t: timeAfterTrip }];
seen = new Set();

while (true) {
  const result = tick(false);
  if (result) {
    timeAfterTrip = result;
    break;
  }
}

console.log(timeAfterTrip);

queue = [{ y: 0, x: 1, t: timeAfterTrip }];
seen = new Set();

while (true) {
  const result = tick(true);
  if (result) {
    timeAfterTrip = result;
    break;
  }
}

console.log(timeAfterTrip);
