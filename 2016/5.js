const crypto = require('crypto');

let pw = '';
let i = 0;

while (pw.length < 8) {
  const hash = crypto.createHash('md5').update(`cxdnnyjw${i}`).digest("hex");
  if (hash.substr(0, 5) === '00000') {
    pw += hash.substr(5, 1);
    console.log(pw);
  }
  i++;
}

console.log(pw);

pw = [];
i = 0;

const isDone = () => [...Array(8).keys()].every(i => !!pw[i]);

while (true) {
  const hash = crypto.createHash('md5').update(`cxdnnyjw${i}`).digest("hex");
  if (hash.substr(0, 5) === '00000' && parseInt(hash.substr(5, 1), 10) < 8 && !pw[hash.substr(5, 1)]) {
    pw[hash.substr(5, 1)] = hash.substr(6, 1);
    console.log(pw);
    if (isDone()) {
      break;
    }
  }
  i++;
}

console.log(pw.join(''));
