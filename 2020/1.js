const input = require('fs').readFileSync('inputs/2020/1.txt').toString().split('\n').map(x => parseInt(x, 10));

input.sort();

outer: for (let i = 0; i < input.length; i++) {
  if (input.includes(2020 - input[i])) {
    console.log(input[i] * (2020 - input[i]));
    break outer;
  }
}

outer2: for (let i = 0; i < input.length; i++) {
  for (let j = i + 1; j + i < 2020; j++) {
    if (input.slice(j).includes(2020 - input[i] - input[j])) {
      console.log(input[i] * input[j] * (2020 - input[i] - input[j]));
      break outer2;
    }
  }
}
