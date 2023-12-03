const input = require("fs").readFileSync("inputs/2023/1.txt").toString();

let sum = 0;

input.split("\n").forEach((line) => {
  const first = line.split("").find((c) => c.match(/[0-9]/));
  const last = line
    .split('')
    .reverse()
    .find((c) => c.match(/[0-9]/));

  sum += parseInt(`${first}${last}`, 10);
});

console.log(sum);
sum = 0

const findNumber = (input) => {
  if (input.split('')[0].match(/[0-9]/)) {
    return parseInt(input.split('')[0], 10);
  }
  const map = {
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
  }

  const match = Object.keys(map).find((key) => input.startsWith(key))
  return match ? map[match] : false;
}

input.split("\n").forEach((line) => {
  let first;
  let last;
  for (let i = 0; i < line.length; i++) {
    if (findNumber(line.slice(i)) !== false) {
      first = findNumber(line.slice(i));
      break;
    }
  }

  for (let i = line.length - 1; i >= 0; i--) {
    if (findNumber(line.slice(i))) {
      last = findNumber(line.slice(i));
      break;
    }
  }

  sum += parseInt(`${first}${last}`, 10);
});

console.log(sum);
