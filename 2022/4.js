const input = require("fs").readFileSync("inputs/2022/4.txt").toString();

let count = [0, 0]

const containsOneWay = (inner, outer) => inner[0] >= outer[0] && inner[1] <= outer[1]
const contains = (e1, e2) => containsOneWay(e1, e2) || containsOneWay(e2, e1)
const overlapsOneWay = (e1, e2) => e2[0] <= e1[1] && e2[1] >= e1[1]
const overlaps = (e1, e2) => overlapsOneWay(e1, e2) || overlapsOneWay(e2, e1)

input.split("\n").forEach((line, i) => {
  const [e1, e2] = line.split(',').map((e) => e.split('-').map(x => parseInt(x, 10)))

  if (contains(e1, e2)) {
    count[0]++
  }

  if (contains(e1, e2) || overlaps(e1, e2)) {
    count[1]++
  }
});

console.log(count);
