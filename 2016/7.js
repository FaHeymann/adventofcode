const input = require('fs').readFileSync('inputs/2016/7.txt').toString();

console.log(input.split('\n').reduce((count, line) => {
  let openBrackets = 0;
  let valid = false;
  line.split('').some((c, i, arr) => {
    if (c === '[') {
      openBrackets++;
    }
    if (c === ']') {
      openBrackets = Math.max(0, openBrackets - 1);
    }
    if (i > 2 && arr[i] === arr[i - 3] && arr[i - 1] === arr[i - 2] && arr[i] !== arr[i - 1]) {
      if (openBrackets > 0) {
        valid = false;
        return true;
      }
      valid = true;
    }
    return false;
  });
  return valid ? count + 1 : count;
}, 0));

console.log(input.split('\n').reduce((count, line) => {
  let openBrackets = 0;
  let abas = [];
  let babs = [];
  line.split('').forEach((c, i, arr) => {
    if (c === '[') {
      openBrackets++;
    }
    if (c === ']') {
      openBrackets = Math.max(0, openBrackets - 1);
    }
    if (i > 1 && arr[i] === arr[i - 2] && arr[i] !== arr[i - 1]) {
      if (openBrackets > 0) {
        babs.push([arr[i], arr[i - 1]]);
      } else {
        abas.push([arr[i], arr[i - 1]]);
      }
    }
  });
  return abas.some(aba => babs.some(bab => aba[0] === bab[1] && aba[1] === bab[0])) ? count + 1 : count;
}, 0));
