const input = require('fs').readFileSync('inputs/2015/5.txt').toString();

const check = input => {
  let vowels = 0;
  let double = false;
  const forbidden = [
    ['a', 'b'],
    ['c', 'd'],
    ['p', 'q'],
    ['x', 'y'],
  ]

  const noForbidden = input.split('').every((c, i, s) => {
    if (['a', 'e', 'i', 'o', 'u'].includes(c)) {
      vowels++;
    }
    if (i > 0 && s[i - 1] === c) {
      double = true;
    }
    return !(i > 0 && forbidden.some(p => s[i - 1] === p[0] && c === p[1]));
  });
  return vowels >= 3 && double && noForbidden;
}

console.log(input.split('\n').reduce((count, cur) => check(cur) ? count + 1 : count, 0));


const check2 = input => {
  const candidates  = [];
  let repeated = false;
  let pair = false;

  input.split('').forEach((c, i, s) => {
    if (i > 1 && s[i - 2] === c) {
      repeated = true;
    }
    if (i > 2) {
      const x = [...candidates];
      x.pop();
      if (x.includes(`${s[i - 1]}${c}`)) {
        pair = true;
      }
    }
    if (i > 0) {
      candidates.push(`${s[i - 1]}${c}`);
    }
  });

  return repeated && pair;
}

console.log(input.split('\n').reduce((count, cur) => check2(cur) ? count + 1 : count, 0));
