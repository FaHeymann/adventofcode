const input = require("fs").readFileSync("inputs/2022/3.txt").toString();

const priority = (s) =>
  s.charCodeAt(0) > 96 ? s.charCodeAt(0) - 96 : s.charCodeAt(0) - 38;

let sums = [0, 0];
const collector = [];

input.split("\n").forEach((line, i) => {
  const [r1, r2] = [
    line.substring(0, line.length / 2).split(""),
    line.substring(line.length / 2).split(""),
  ];
  collector[i % 3] = line.split("");

  r1.some((s) => {
    if (r2.includes(s)) {
      sums[0] += priority(s);
      return true;
    }
  });

  if (i % 3 === 2) {
    collector[0].some((s) => {
      if (collector[1].includes(s) && collector[2].includes(s)) {
        sums[1] += priority(s);
        return true;
      }
    });
  }
});

console.log(sums);
