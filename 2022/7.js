const input = require("fs").readFileSync("inputs/2022/7.txt").toString();

const dirs = {};
let path = ["/"];
let includeDirs = new Set(["/"]);

input.split("\n").forEach((line) => {
  if (line === "$ cd /") {
    path = ["/"];
    includeDirs = new Set(["/"]);
  } else if (line === "$ cd ..") {
    const cur = path.join("");
    path.pop();
    includeDirs.delete(cur);
  } else if (line.startsWith("$ cd")) {
    const dir = line.substring(5);
    path.push(dir);
    includeDirs.add(path.join(""));
  } else if (line === "$ ls") {
    const cur = path.join("");
    dirs[cur] = {
      size: 0,
      totalSize: 0,
    };
  } else if (line.startsWith("dir ")) {
    // no
  } else {
    const size = parseInt(line.split(" ")[0], 10);
    const cur = path.join("");
    dirs[cur].size += size;
    includeDirs.forEach((includeDir) => {
      dirs[includeDir].totalSize += size;
    });
  }
});

let sum = 0;
const unused = 70000000 - dirs["/"].totalSize;
const needed = 30000000 - unused;
let min = Number.MAX_SAFE_INTEGER;

Object.values(dirs).forEach((dir) => {
  if (dir.totalSize <= 100000) {
    sum += dir.totalSize;
  }
  if (dir.totalSize >= needed) {
    min = Math.min(min, dir.totalSize);
  }
});

console.log(sum);
console.log(min);
