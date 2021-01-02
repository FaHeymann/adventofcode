const input = require('fs').readFileSync('inputs/2016/4.txt').toString();

console.log(input.split('\n').reduce((sum, line) => {
  const [_, code, nr, checksum] = line.match(/^([a-z-]+)([0-9]+)\[([a-z]+)\]$/);
  const charMap = {};
  code.split('').forEach(c => {
    if (c !== '-') {
      if (!charMap[c]) {
        charMap[c] = 0;
      }
      charMap[c]++;
    }
  });
  const check = Object.keys(charMap).sort((a, b) => charMap[a] === charMap[b] ? a.charCodeAt(0) - b.charCodeAt(0) : charMap[b] - charMap[a]).join('').substr(0, 5);

  if (check === checksum) {
    const decoded = code.split('').map(c => {
      if (c === '-') {
        return ' ';
      }
      let x = c.charCodeAt(0) + (nr % 26);
      if (x > 122) {
        x -= 26;
      }
      return String.fromCharCode(x);
    });
    if (decoded.join('').includes('northpole')) {
      console.log(nr, decoded.join(''));
    }
  }

  return check === checksum ? sum + parseInt(nr, 10) : sum;
}, 0));
