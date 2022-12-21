const input = require("fs").readFileSync("inputs/2022/20.txt").toString();

const solve = (multiplier, rounds) => {
  const numbers = input
    .split("\n")
    .map((n) => parseInt(n, 10))
    .map((n) => n * multiplier);

  const index = {};
  let prev;

  numbers.forEach((n, i) => {
    index[i] = {
      number: n,
    };
    if (prev) {
      index[i].prev = prev;
      prev.next = index[i];
    }
    prev = index[i];
  });

  index[0].prev = index[numbers.length - 1];
  index[numbers.length - 1].next = index[0];

  for (let i = 0; i < rounds; i++) {
    numbers.forEach((n, i) => {
      let cur = index[i];
      if (n === 0) {
        return;
      }
      index[i].prev.next = index[i].next;
      index[i].next.prev = index[i].prev;

      if (n > 0) {
        n = n % (numbers.length - 1);
        for (let i = 0; i < n; i++) {
          cur = cur.next;
        }
        index[i].prev = cur;
        index[i].next = cur.next;
        cur.next.prev = index[i];
        cur.next = index[i];
      }
      if (n < 0) {
        n = n % (numbers.length - 1);

        for (let i = 0; i > n; i--) {
          cur = cur.prev;
        }
        index[i].next = cur;
        index[i].prev = cur.prev;
        cur.prev.next = index[i];
        cur.prev = index[i];
      }
    });
  }

  let sum = 0;
  let cur = index[numbers.findIndex((x) => x === 0)];
  for (let i = 1; i <= 3000; i++) {
    cur = cur.next;
    if (i % 1000 === 0) {
      sum += cur.number;
    }
  }
  console.log(sum);
};

solve(1, 1)
solve(811589153, 10)
