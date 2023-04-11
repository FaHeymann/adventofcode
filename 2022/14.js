const input = require("fs").readFileSync("inputs/2022/14.txt").toString();

const run = (hasFloor) => {
  const map = {};
  let maxY = 0;

  const get = (y, x) => {
    if (`${y}#${x}` in map) {
      return map[`${y}#${x}`];
    }
    if (hasFloor && (y === maxY + 2)) {
      return "#";
    }
    return ".";
  };

  input.split("\n").forEach((line) => {
    const segments = line
      .split(" -> ")
      .map((s) => s.split(",").map((n) => parseInt(n, 10)));

    for (let i = 0; i < segments.length - 1; i++) {
      const p1 = segments[i];
      const p2 = segments[i + 1];

      maxY = Math.max(maxY, p1[1], p2[1]);

      if (p1[0] === p2[0]) {
        for (let y = Math.min(p1[1], p2[1]); y <= Math.max(p1[1], p2[1]); y++) {
          map[`${y}#${p1[0]}`] = "#";
        }
      } else {
        for (let x = Math.min(p1[0], p2[0]); x <= Math.max(p1[0], p2[0]); x++) {
          map[`${p1[1]}#${x}`] = "#";
        }
      }
    }
  });

  let count = 0;

  const simulate = () => {
    let y = 0;
    let x = 500;

    const tick = () => {
      if (get(0, 500) === "s") {
        return true;
      }
      if (get(y + 1, x) === ".") {
        y++;
        return false;
      }
      if (get(y + 1, x - 1) === ".") {
        y++;
        x--;
        return false;
      }
      if (get(y + 1, x + 1) === ".") {
        y++;
        x++;
        return false;
      }
      map[`${y}#${x}`] = "s";
      return true;
    };

    while (!tick()) {
      if (y > 1000) {
        return true;
      }
    }

    count++;
    return get(0, 500) === "s";
  };

  while (!simulate()) {}
  console.log(count);
};

run(false)
run(true)
