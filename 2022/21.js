const input = require("fs").readFileSync("inputs/2022/21.txt").toString();

const solved = {};
const todo = {};

input.split("\n").forEach((line) => {
  if (line.match(/^(.{4}): ([0-9]*)$/)) {
    solved[line.split(": ")[0]] = parseInt(line.split(": ")[1], 10);
  } else {
    const [_, key, v1, op, v2] = line.match(/^(.{4}): (.{4}) (.) (.{4})$/);
    todo[key] = {
      v1,
      v2,
      op,
    };
  }
});

const resolve = () => {
  Object.entries(todo).forEach(([key, { v1, v2, op }]) => {
    if (v1 in solved && v2 in solved) {
      let result;
      if (op === "+") {
        result = solved[v1] + solved[v2];
      }
      if (op === "-") {
        result = solved[v1] - solved[v2];
      }
      if (op === "*") {
        result = solved[v1] * solved[v2];
      }
      if (op === "/") {
        result = solved[v1] / solved[v2];
      }
      solved[key] = result;
      delete todo[key];
    }
  });
};

while (!("root" in solved)) {
  resolve();
}
console.log(solved['root'])
