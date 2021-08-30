let deck = [...Array(10007).keys()];

const dealIntoNewStack = () => {
  deck.reverse();
};

const cut = n => {
  deck = deck.slice(n).concat(deck.slice(0, n));
};

const dealWithIncrement = n => {
  const next = [];
  for (let i = 0; i < deck.length; i++) {
    next[(i * n) % deck.length] = deck[i];
  }
  deck = next;
};

const input = require('fs').readFileSync('inputs/2019/22.txt').toString();

input.split('\n').forEach(line => {
  if (line.startsWith('deal into')) {
    dealIntoNewStack();
  } else if (line.startsWith('deal with')) {
    const [_, n] = line.match(/deal with increment ([-0-9]+)/).map(x => parseInt(x, 10));
    dealWithIncrement(n);
  } else if (line.startsWith('cut')) {
    const [_, n] = line.match(/cut ([-0-9]+)/).map(x => parseInt(x, 10));
    cut(n);
  }
  console.log(deck.findIndex(x => x === 2019));
})

console.log(deck.findIndex(x => x === 2019));


