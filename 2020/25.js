const cardPublicKey = 14012298;
const doorPublicKey = 74241;

let doorLoopSize = 0;

let value = 1;

while (value !== doorPublicKey) {
  value = (value * 7) % 20201227;
  doorLoopSize++;
}

let key = 1;

for (let i = 0; i < doorLoopSize; i++) {
  key = (key * cardPublicKey) % 20201227;
}

console.log(key);
