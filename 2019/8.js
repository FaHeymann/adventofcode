const input = require('fs').readFileSync('inputs/2019/8.txt').toString();
let min0 = Number.MAX_VALUE;
let product = 0;

input.match(/.{1,150}/g).forEach(layer => {
  const count0 = layer.split('').filter(d => d === '0').length;
  if (count0 < min0) {
    min0 = count0;
    product = layer.split('').filter(d => d === '1').length * layer.split('').filter(d => d === '2').length;
  }
});

console.log(product);

const result = [];

input.match(/.{1,150}/g).forEach(layer => {
  layer.split('').forEach((value, i) => {
    if (value !== '2' && result[i] === undefined) {
      result[i] = value;
    }
  })
});

result.join('').match(/.{1,25}/g).forEach((a) => {
  console.log(a.replace(/0/g, ' '))
});
