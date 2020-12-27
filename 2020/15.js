const input = [7,14,0,17,11,1,2];

const star1 = () => {
  let last;

  let map = new Map();
  let first = new Map();

  for (let i = 0; i < 2020; i++) {
    let previous = last;
    if (i < input.length) {
      last = input[i];
    } else {
      if (first.get(last) === i - 1) {
        last = 0;
      } else {
        last = i - 1 - map.get(last);
      }
    }
    if (Number.isInteger(previous)) {
      map.set(previous, i - 1);
    }
    if (!(first.has(last))) {
      first.set(last, i);
    }
  }

  console.log(last);
}

star1();

let last;

let map = new Map();
let first = new Map();

for (let i = 0; i < 30000000; i++) {
  let previous = last;
  if (i < input.length) {
    last = input[i];
  } else {
    if (first.get(last) === i - 1) {
      last = 0;
    } else {
      last = i - 1 - map.get(last);
    }
  }
  if (Number.isInteger(previous)) {
    map.set(previous, i - 1);
  }
  if (!(first.has(last))) {
    first.set(last, i);
  }
}

console.log(last);
