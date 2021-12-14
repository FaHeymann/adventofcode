const input = require("fs").readFileSync("inputs/2021/13.txt").toString();

const [coords, instr] = input.split("\n\n");
let paper = new Set(coords.split("\n"));

const toPair = (s) => s.split(",").map((n) => parseInt(n, 10));

const foldY = (f, paper) => {
  const out = new Set();
  paper.forEach((e) => {
    const [x, y] = toPair(e);
    if (y > f) {
      out.add(`${x},${f - (y - f)}`);
    } else if (y < f) {
      out.add(e);
    }
  });
  return out;
};

const foldX = (f, paper) => {
  const out = new Set();
  paper.forEach((e) => {
    const [x, y] = toPair(e);
    if (x > f) {
      out.add(`${f - (x - f)},${y}`);
    }
    if (x < f) {
      out.add(e);
    }
  });
  return out;
};

const print = (paper) => {
  for (let y = 0; y <= Math.max(...[...paper].map((e) => toPair(e)[1])); y++) {
    let line = "";
    for (
      let x = 0;
      x <= Math.max(...[...paper].map((e) => toPair(e)[0]));
      x++
    ) {
      line += paper.has(`${x},${y}`) ? "#" : ".";
    }
    console.log(line);
  }
};

instr.split("\n").forEach((inst, i) => {
  const [s, n] = inst.split("=");
  paper = s.includes("y")
    ? foldY(parseInt(n, 10), paper)
    : foldX(parseInt(n, 10), paper);
  if (i === 0) {
    console.log(paper.size);
  }
});

print(paper);
