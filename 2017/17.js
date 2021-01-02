const steps = 377;

let buffer = [0];
let pos = 0;

const step = (i) => {
  pos = (pos + steps) % buffer.length;
  buffer.splice(pos + 1, 0, i);
  pos++;
};

for (let i = 1; i < 2018; i++) {
  step(i);
}
console.log(buffer[buffer.findIndex(v => v === 2017) + 1]);


pos = 0;

let v1;

const step2 = (i) => {
  pos = (pos + steps) % i;
  if (pos === 0) {
    v1 = i;
  }
  pos++;
};

for (let i = 1; i < 50000001; i++) {
  step2(i);
}

console.log(v1);
