const input = require("fs").readFileSync("inputs/2023/4.txt").toString();

let cards = input.split('\n').map(_ => 1)

input.split("\n").forEach((line, index) => {
  const [_, numbers] = line.split(": ");
  const [winning, mine] = numbers.split(" | ").map((arr) =>
    arr
      .split(" ")
      .filter((c) => c !== "")
      .map((c) => parseInt(c, 10))
  );

  let i = index + 1
  mine.forEach(n => {
    if (winning.includes(n)) {
      cards[i++] += cards[index]
    }
  })
});

console.log(cards.reduce((a, b) => a + b, 0))
