const input = require('fs').readFileSync('inputs/2020/2.txt').toString();

console.log(input.split('\n').reduce((count, line) => {
  const [restriction, charRaw, pw] = line.split(' ');
  const char = charRaw.substring(0, 1);
  const [min, max] = restriction.split('-');
  const occ = pw.split('').reduce((prev, cur) => cur === char ? prev + 1 : prev, 0);
  return min <= occ && occ <= max ? count + 1 : count;
}, 0));

console.log(input.split('\n').reduce((count, line) => {
  const [restriction, charRaw, pw] = line.split(' ');
  const char = charRaw.substring(0, 1);
  const [a, b] = restriction.split('-');
  return (pw[a - 1] === char) != (pw[b - 1] === char) ? count + 1 : count;
}, 0));
