const band = {};

let head = 0;
let state = 'A'

const get = () => head in band ? band[head] : 0;

const rules = {
  A: {
    0: () => {
      band[head] = 1;
      head++;
      state = 'B';
    },
    1: () => {
      band[head] = 0;
      head--;
      state = 'C';
    },
  },
  B: {
    0: () => {
      band[head] = 1;
      head--;
      state = 'A';
    },
    1: () => {
      band[head] = 1;
      head--;
      state = 'D';
    },
  },
  C: {
    0: () => {
      band[head] = 1;
      head++;
      state = 'D';
    },
    1: () => {
      band[head] = 0;
      head++;
      state = 'C';
    },
  },
  D: {
    0: () => {
      band[head] = 0;
      head--;
      state = 'B';
    },
    1: () => {
      band[head] = 0;
      head++;
      state = 'E';
    },
  },
  E: {
    0: () => {
      band[head] = 1;
      head++;
      state = 'C';
    },
    1: () => {
      band[head] = 1;
      head--;
      state = 'F';
    },
  },
  F: {
    0: () => {
      band[head] = 1;
      head--;
      state = 'E';
    },
    1: () => {
      band[head] = 1;
      head++;
      state = 'A';
    },
  },
}


for (let i = 0; i < 12656374; i++) {
  rules[state][get()]();
}

console.log(Object.values(band).filter(v => v === 1).length);
