const input = require('fs').readFileSync('inputs/2018/5.txt').toString();

const reduce = str => {
  let prev = '';
  let cur = str;
  while (prev !== cur) {
    prev = cur;
    cur = '';
    for (let i = 0; i < prev.length; i++) {
      if (i < prev.length - 1 && (prev.charCodeAt(i) === prev.charCodeAt(i + 1) + 32 || prev.charCodeAt(i) + 32 === prev.charCodeAt(i + 1))) {
        i++;
      } else {
        cur += prev.charAt(i);
      }
    }
  }
  return cur;
};

console.log(reduce(input).length);

let min = Number.MAX_VALUE;

'abcdefghijklmnopqrstuvwxyz'.split('').forEach(char => {
  const current = input.replace(new RegExp(`[${char}${String.fromCharCode(char.charCodeAt(0) - 32)}]`, 'g'), '');
  min = Math.min(reduce(current).length, min);
});

console.log(min);
