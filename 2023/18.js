const input = require("fs").readFileSync("inputs/2023/18.txt").toString();

const directionMap = {
  0: "R",
  1: "D",
  2: "L",
  3: "U",
};

const parser1 = (line) => {
  let [d, l, _] = line.split(" ");
  return [parseInt(l, 10), d];
};

const parser2 = (line) => {
  let [_, __, code] = line.split(" ");

  return [
    parseInt(code.substring(2, 7), 16),
    directionMap[code.substring(7, 8)],
  ];
};

const solve = (parser) => {
  let [y, x] = [0, 0];

  let corners = [];
  let previousDirection = null;
  let lenBefore = null;

  const parseCorners = (line) => {
    const [len, d] = parser(line);
    if (d === "R") {
      if (previousDirection) {
        corners.push({
          before: previousDirection,
          after: "R",
          turn: previousDirection === "U" ? "R" : "L",
          x,
          y,
          lenAfter: len + 1,
          lenBefore,
        });
      }
      x += len;
    }
    if (d === "L") {
      if (previousDirection) {
        corners.push({
          before: previousDirection,
          after: "L",
          turn: previousDirection === "U" ? "L" : "R",
          x,
          y,
          lenAfter: len + 1,
          lenBefore,
        });
      }
      x -= len;
    }
    if (d === "U") {
      if (previousDirection) {
        corners.push({
          before: previousDirection,
          after: "U",
          turn: previousDirection === "R" ? "L" : "R",
          x,
          y,
          lenAfter: len + 1,
          lenBefore,
        });
      }
      y -= len;
    }
    if (d === "D") {
      if (previousDirection) {
        corners.push({
          before: previousDirection,
          after: "D",
          turn: previousDirection === "R" ? "R" : "L",
          x,
          y,
          lenAfter: len + 1,
          lenBefore,
        });
      }
      y += len;
    }
    previousDirection = d;
    lenBefore = len + 1;
  };

  input.split("\n").forEach(parseCorners);
  parseCorners(input.split("\n")[0]);

  for (let i = 0; i < corners.length; i++) {
    corners[i].prev = i === 0 ? corners.at(-1) : corners[i - 1];
    corners[i].next = i === corners.length - 1 ? corners[0] : corners[i + 1];
  }

  let count = 0;

  const containsCorner = (minY, maxY, minX, maxX) => {
    return corners.some((c) => {
      if ([minY, maxY].includes(c.y) && [minX, maxX].includes(c.x)) {
        return false;
      }
      return minY <= c.y && maxY >= c.y && minX <= c.x && maxX >= c.x;
    });
  };

  const step = () => {
    for (let i = 0; i < corners.length; i++) {
      const cur = corners[i];
      if (
        cur.turn === "R" &&
        cur.next.turn === "R" &&
        cur.next.next.turn === "L" &&
        cur.lenBefore > cur.next.lenAfter &&
        !containsCorner(
          Math.min(cur.y, cur.next.next.y),
          Math.max(cur.y, cur.next.next.y),
          Math.min(cur.x, cur.next.next.x),
          Math.max(cur.x, cur.next.next.x)
        )
      ) {
        count += cur.lenAfter * (cur.next.lenAfter - 1);

        if (cur.before === "R") {
          cur.x = cur.next.next.x;
        }
        if (cur.before === "L") {
          cur.x = cur.next.next.x;
        }
        if (cur.before === "U") {
          cur.y = cur.next.next.y;
        }
        if (cur.before === "D") {
          cur.y = cur.next.next.y;
        }

        cur.lenBefore -= cur.next.lenAfter - 1;
        cur.prev.lenAfter -= cur.next.lenAfter - 1;

        cur.lenAfter += cur.next.next.lenAfter - 1;
        cur.next.next.next.lenBefore = cur.lenAfter;

        cur.next = cur.next.next.next;
        cur.next.prev = cur;

        corners[(i + 1) % corners.length] = null;
        corners[(i + 2) % corners.length] = null;
        corners = corners.filter((e) => e !== null);
        return;
      }

      if (
        cur.turn === "L" &&
        cur.next.turn === "R" &&
        cur.next.next.turn === "R" &&
        cur.lenAfter < cur.next.next.lenAfter &&
        !containsCorner(
          Math.min(cur.y, cur.next.next.y),
          Math.max(cur.y, cur.next.next.y),
          Math.min(cur.x, cur.next.next.x),
          Math.max(cur.x, cur.next.next.x)
        )
      ) {
        count += (cur.lenAfter - 1) * cur.next.lenAfter;

        if (cur.before === "D") {
          cur.next.next.x = cur.x;
        }
        if (cur.before === "U") {
          cur.next.next.x = cur.x;
        }
        if (cur.before === "R") {
          cur.next.next.y = cur.y;
        }
        if (cur.before === "L") {
          cur.next.next.y = cur.y;
        }

        cur.prev.lenAfter += cur.next.lenAfter - 1;
        cur.next.next.lenBefore = cur.prev.lenAfter;

        cur.next.next.lenAfter -= cur.lenAfter - 1;
        cur.next.next.next.lenBefore = cur.next.next.lenAfter;

        cur.prev.next = cur.next.next;
        cur.next.next.prev = cur.prev;

        corners[i] = null;
        corners[(i + 1) % corners.length] = null;

        corners = corners.filter((e) => e !== null);
        return;
      }

      if (
        cur.turn === "L" &&
        cur.next.turn === "R" &&
        cur.next.next.turn === "R" &&
        cur.next.next.next.turn === "L" &&
        cur.lenAfter === cur.next.next.lenAfter &&
        !containsCorner(
          Math.min(cur.y, cur.next.next.y),
          Math.max(cur.y, cur.next.next.y),
          Math.min(cur.x, cur.next.next.x),
          Math.max(cur.x, cur.next.next.x)
        )
      ) {
        count += (cur.lenAfter - 1) * cur.next.lenAfter;

        cur.prev.lenAfter +=
          cur.next.lenAfter + cur.next.next.next.lenAfter - 2;
        cur.next.next.next.next.lenBefore = cur.prev.lenAfter;

        cur.prev.next = cur.next.next.next.next;
        cur.next.next.next.next.prev = cur.prev;

        corners[i] = null;
        corners[(i + 1) % corners.length] = null;
        corners[(i + 2) % corners.length] = null;
        corners[(i + 3) % corners.length] = null;
        corners = corners.filter((e) => e !== null);
        return;
      }
    }
    throw new Error("no candidate found");
  };

  while (corners.length > 4) {
    step();
  }

  count += corners[0].lenAfter * corners[0].lenBefore;
  console.log(count);
};

solve(parser1);
solve(parser2);
