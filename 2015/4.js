const crypto = require('crypto');

let i = 0;

while(crypto.createHash('md5').update(`iwrupvqb${i}`).digest("hex").substr(0, 5) !== '00000') {
  i++;
}

console.log(i);

while(crypto.createHash('md5').update(`iwrupvqb${i}`).digest("hex").substr(0, 6) !== '000000') {
  i++;
}

console.log(i);
