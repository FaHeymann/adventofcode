const input = '1321131112';

const process = input => {
  let curChar = '';
  let count = 0;
  let out = '';
  input.split('').forEach((c, i) => {
    if (c !== curChar) {
      if (i !== 0) {
        out += ('' + count) + ('' + curChar);
      }
      curChar = c;
      count = 1;
    } else {
      count++;
    }
  });
  out += ('' + count) + ('' + curChar);
  return out;
}

let running = input;

for (let i = 0; i < 40; i++) {
  running = process(running);
}
console.log(running.length);

running = input;

for (let i = 0; i < 50; i++) {
  running = process(running);
}
console.log(running.length);
