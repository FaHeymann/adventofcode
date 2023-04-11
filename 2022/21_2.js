const input = require("fs").readFileSync("inputs/2022/21.txt").toString();

const solved = {};
const todo = {};
let root;
let progress = -1;

input.split("\n").forEach((line) => {
  if (line.startsWith("root")) {
    console.log(line);
    const [_, key, v1, op, v2] = line.match(/^(.{4}): (.{4}) (.) (.{4})$/);
    root = {
      v1,
      v2,
    };
    return;
  }

  if (line.startsWith("humn")) {
    return;
  }

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
  if (progress === Object.keys(solved).length) {
    return true;
  }
  progress = Object.keys(solved).length;
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
  return false;
};

while (!resolve()) {}

let left = root.v1 in solved ? solved[root.v1] : solved[root.v2];
let right = root.v1 in solved ? root.v2 : root.v1;

const solve = () => {
  if (right === "humn") {
    console.log(left);
    return true;
  }

  const { v1, v2, op } = todo[right];
  if (v1 in solved) {
    if (op === "+") {
      left = left - solved[v1];
    }
    if (op === "-") {
      left = solved[v1] - left;
    }
    if (op === "*") {
      left = left / solved[v1];
    }
    if (op === "/") {
      left = solved[v1] / left;
    }
    right = v2;
  } else {
    if (op === "+") {
      left = left - solved[v2];
    }
    if (op === "-") {
      left = left + solved[v2];
    }
    if (op === "*") {
      left = left / solved[v2];
    }
    if (op === "/") {
      left = left * solved[v2];
    }
    right = v1;
  }
  return false;
};

while (!solve()) {}
