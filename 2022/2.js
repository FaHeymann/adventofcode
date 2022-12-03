const input = require("fs")
  .readFileSync("inputs/2022/2.txt")
  .toString()

let score = 0

input.split('\n').forEach(line => {
  const [you, me] = line.split(' ');

  if (me === 'X')  {
    score += 1;
    if (you === 'A') {
      score += 3
    } else if (you === 'C') {
      score += 6
    }
  }

  if (me === 'Y')  {
    score += 2;
    if (you === 'B') {
      score += 3
    } else if (you === 'A') {
      score += 6
    }
  }

  if (me === 'Z')  {
    score += 3;
    if (you === 'C') {
      score += 3
    } else if (you === 'B') {
      score += 6
    }
  }
})

console.log(score)

score = 0

input.split('\n').forEach(line => {
  const [you, desired] = line.split(' ');

  if (desired === 'X') { // loss
    if (you === 'A') {
      score += 3
    }
    if (you === 'B') {
      score += 1
    }
    if (you === 'C') {
      score += 2
    }
  }

  if (desired === 'Y') { // draw
    score += 3
    if (you === 'A') {
      score += 1
    }
    if (you === 'B') {
      score += 2
    }
    if (you === 'C') {
      score += 3
    }
  }

  if (desired === 'Z') { // win
    score += 6
    if (you === 'A') {
      score += 2
    }
    if (you === 'B') {
      score += 3
    }
    if (you === 'C') {
      score += 1
    }
  }
})

console.log(score)
