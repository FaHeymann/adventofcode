const input = require("fs").readFileSync("inputs/2022/9.txt").toString();

const move = (head, tail) => {
  const checkSecondaryMove = (dirX) => {
    if (head[dirX ? 1 : 0] - 1 >= tail[dirX ? 1 : 0]) {
      tail[dirX ? 1 : 0] = tail[dirX ? 1 : 0] + 1;
    }
    if (head[dirX ? 1 : 0] + 1 <= tail[dirX ? 1 : 0]) {
      tail[dirX ? 1 : 0] = tail[dirX ? 1 : 0] - 1;
    }
  }

  if (head[0] - 2 >= tail[0]) {
    tail[0] = tail[0] + 1;
    checkSecondaryMove(true)
  }
  if (head[0] + 2 <= tail[0]) {
    tail[0] = tail[0] - 1;
    checkSecondaryMove(true)
  }
  if (head[1] - 2 >= tail[1]) {
    tail[1] = tail[1] + 1;
    checkSecondaryMove(false)
  }
  if (head[1] + 2 <= tail[1]) {
    tail[1] = tail[1] - 1;
    checkSecondaryMove(false)
  }

  return { newHead: head, newTail: tail };
};

const run = (parts) => {
  const visited = new Set(["0,0"]);

  input.split("\n").forEach((line) => {
    const [dir, steps] = line.split(" ");
    for (let i = 0; i < parseInt(steps, 10); i++) {
      if (dir === "U") {
        parts[0][0] = parts[0][0] + 1;
      }
      if (dir === "D") {
        parts[0][0] = parts[0][0] - 1;
      }
      if (dir === "R") {
        parts[0][1] = parts[0][1] + 1;
      }
      if (dir === "L") {
        parts[0][1] = parts[0][1] - 1;
      }

      for (let j = 0; j < parts.length - 1; j++) {
        const { newHead, newTail } = move([...parts[j]], [...parts[j + 1]]);
        parts[j] = newHead;
        parts[j + 1] = newTail;
      }

      visited.add(parts[parts.length - 1].join(","));
    }
  });

  console.log(visited.size);
};

run([
  [0, 0],
  [0, 0],
]);

run([
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
]);
