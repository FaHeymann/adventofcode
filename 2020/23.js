const input = '315679824';

const max = 1000000;

const star1 = () => {
  let prev = { number: parseInt(input.charAt(0), 10) };

  let head = prev;

  input.split('').forEach((n, i) => {
    if (i !== 0) {
      let next = { number: parseInt(n, 10) };
      prev.next = next;
      prev = next;
    }
  })

  prev.next = head;

  for(let i = 0; i < 100; i++) {
    const one = head.next;
    const two = head.next.next;
    const three = head.next.next.next;

    head.next = head.next.next.next.next;

    let dest = head.number - 1;
    if (dest === 0) {
      dest = 9;
    }
    while([one.number, two.number, three.number].includes(dest)) {
      dest -= 1;
      if (dest === 0) {
        dest = 9;
      }
    }

    let destCup = head;

    while(destCup.number !== dest) {
      destCup = destCup.next;
    }

    three.next = destCup.next;
    destCup.next = one;

    head = head.next;
  }

  while (head.number !== 1) {
    head = head.next;
  }

  head = head.next;

  let output = '';

  while (head.number !== 1) {
    output += head.number;
    head = head.next;
  }

  console.log(output);
}

star1();

const register = {};

let builder = { number: 1 };
register[1] = builder;

for (let i = 2; i <= max; i++) {
  let next = { number: i };
  builder.next = next;
  next.before = builder;
  builder = next;
  register[i] = next;
}

input.split('').forEach((c, i, arr) => {
  if (i === 8) {
    register[c].next = register[10];
  } else {
    register[c].next = register[arr[i + 1]]
  }
});

register[max].next = register[input.charAt(0)];
register[1].before = register[max];

let head = register[input.charAt(0)];

for(let i = 0; i < 10000000; i++) {
  const one = head.next;
  const two = head.next.next;
  const three = head.next.next.next;

  head.next = head.next.next.next.next;

  dest = head.before;

  while([one.number, two.number, three.number].includes(dest.number)) {
    dest = dest.before;
  }

  three.next = dest.next;
  dest.next = one;

  head = head.next;
}

console.log(register[1].next.number * register[1].next.next.number);
