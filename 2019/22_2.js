const input = require('fs').readFileSync('inputs/2019/22.txt').toString();

const deckSize = 119315717514047;
const shuffleCount = 101741582076661;
let number = 2020;

// const deckSize = 10007;
// const shuffleCount = 1;
// let number = 2496;

const modInverse = (a, m) => {
  const s = []
  let b = m
  while(b) {
    [a, b] = [b, a % b]
    s.push({a, b})
  }
  let x = 1
  let y = 0
  for(let i = s.length - 2; i >= 0; --i) {
    [x, y] = [y,  x - y * Math.floor(s[i].a / s[i].b)]
  }
  return (y % m + m) % m
};

const reverseDealIntoNewStack = () => {
  number = deckSize - number - 1;
};

const reverseCut = n => {
  number = number + n;
  if (number < deckSize) {
    number += deckSize;
  }
  number %= deckSize;
};

const reverseDealWithIncrement = n => {
  const inv = modInverse(n, deckSize);
  number = Number((BigInt(number) * BigInt(inv)) % BigInt(deckSize));
};

const shuffle = () => {
  input.split('\n').reverse().forEach(line => {
    if (line.startsWith('deal into')) {
      reverseDealIntoNewStack();
    } else if (line.startsWith('deal with')) {
      const [_, n] = line.match(/deal with increment ([-0-9]+)/).map(x => parseInt(x, 10));
      reverseDealWithIncrement(n);
    } else if (line.startsWith('cut')) {
      const [_, n] = line.match(/cut ([-0-9]+)/).map(x => parseInt(x, 10));
      reverseCut(n);
    }
  });
}

const recorded = new Map();

let last;

for (let i = 0; i < 30; i++) {
  console.log(i, recorded.size, number);
  if (recorded.has(number)) {
    const period = i - recorded.get(number);
    console.log('found period');
    while (i + period < shuffleCount) {
      i += period;
    }
  }
  recorded.set(number, i);
  shuffle();
}

console.log(number);
