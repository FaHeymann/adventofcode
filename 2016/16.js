let data = '11011110011011101';

const expand = input => `${input}0${input.split('').reverse().map(x => x === '1' ? '0' : '1').join('')}`;
const checksum = str => str.match(/.{1,2}/g).map(p => p.charAt(0) === p.charAt(1) ? '1' : '0').join('');

while(data.length < 272) {
  data = expand(data);
}

data = data.substr(0, 272);

while(data.length % 2 === 0) {
  data = checksum(data);
}

console.log(data);

// star2
data = '11011110011011101';

while(data.length < 35651584) {
  data = expand(data);
}

data = data.substr(0, 35651584);

while(data.length % 2 === 0) {
  data = checksum(data);
}

console.log(data);
