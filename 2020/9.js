const input = require('fs').readFileSync('inputs/2020/9.txt').toString().split('\n').map(x => parseInt(x, 10));

const len = 25;

let target;

for (let i = 0; i < input.length; i++) {
  if (i < len) {
    continue;
  } else {
    let valid = false;
    outer: for (let j = i - len; j < i; j++) {
      for (let k = j + 1; k < i; k++) {
        if (input[j] + input[k] === input[i]) {
          valid = true;
          break outer;
        }
      }
    }
    if (!valid) {
      target = input[i];
      break;
    }
  }
}

console.log(target);

outer2: for (let i = 0; i < input.length; i++) {
  let sum = 0;
  let min = Number.MAX_VALUE;
  let max = 0;
  for (let k = i; k < input.length && sum <= target; k++) {
    if (sum === target) {
      console.log(min + max);
      break outer2;
    }
    sum += input[k];
    min = Math.min(min, input[k]);
    max = Math.max(max, input[k]);
  }
}
