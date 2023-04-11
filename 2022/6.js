const input = require("fs")
  .readFileSync("inputs/2022/6.txt")
  .toString()
  .split("");

const allDifferent = (a) => {
  for (let i = 0; i < a.length; i++) {
    for (j = 0; j < i; j++) {
      if (a[i] === a[j]) {
        return false;
      }
    }
  }
  return true;
};

for (let i = 3; i < input.length; i++) {
  if (allDifferent([input[i], input[i - 1], input[i - 2], input[i - 3]])) {
    console.log(i + 1);
    break;
  }
}

for (let i = 13; i < input.length; i++) {
  const collector = [];
  for (let j = 0; j < 14; j++) {
    collector.push(input[i - j]);
  }
  if (allDifferent(collector)) {
    console.log(i + 1);
    break;
  }
}
