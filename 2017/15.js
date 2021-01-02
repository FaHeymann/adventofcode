const star1 = () => {
  let a = 634;
  let b = 301;

  const step = () => {
    a = (a * 16807) % 2147483647;
    b = (b * 48271) % 2147483647;
  }

  let count = 0;

  for (let i = 0; i < 40000000; i++) {
    step();
    if (a % (2 ** 16) === b % (2 ** 16)) {
      count++;
    }
  }

  console.log(count);
}

star1();

let a = 634;
let b = 301;

const step = () => {
  do {
    a = (a * 16807) % 2147483647;
  } while (a % 4 !== 0);

  do {
    b = (b * 48271) % 2147483647;
  } while (b % 8 !== 0);
}

let count = 0;

for (let i = 0; i < 5000000; i++) {
  step();
  if (a % (2 ** 16) === b % (2 ** 16)) {
    count++;
  }
}

console.log(count);
