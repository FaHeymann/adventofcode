// const input = `Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
// Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
// Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
// Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
// Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
// Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`;

const input = require("fs").readFileSync("inputs/2023/4.txt").toString();

let cards = input.split('\n').map(_ => 1)
console.log(cards)

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
