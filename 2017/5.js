const input = require('fs').readFileSync('inputs/2017/5.txt').toString();

let register = input.split('\n').map(x => parseInt(x, 10));
let head = 0;

for (let i = 0; i < 1000000; i++) {
  register[head]++;
  head += (register[head] - 1);

  if (head < 0 || head >= register.length) {
    console.log(i + 1);
    break;
  }
}

register = input.split('\n').map(x => parseInt(x, 10));
head = 0;

for (let i = 0; i < 100000000; i++) {
  const marker = head;
  head += register[head];
  register[marker] = register[marker] > 2 ? register[marker] - 1 : register[marker] + 1;

  if (head < 0 || head >= register.length) {
    console.log(i + 1);
    break;
  }
}
