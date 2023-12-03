const input = require("fs").readFileSync("inputs/2023/4.txt").toString();

let sum = 0;

input.split("\n").forEach((line) => {
  const [_, numbers] = line.split(": ");
  const [winning, mine] = numbers.split(" | ").map((arr) =>
    arr
      .split(" ")
      .filter((c) => c !== "")
      .map((c) => parseInt(c, 10))
  );

  let score = 0
  mine.forEach(n => {
    if (winning.includes(n)) {
      if (score === 0) {
        score = 1
      } else {
        score *= 2
      }
    }
  })
  sum += score
});

console.log(sum)
