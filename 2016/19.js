const star1 = () => {
  let prev = { number: 1 };

  let start = prev;

  for (let i = 2; i <= 3014603; i++) {
    let next = { number: i };
    prev.next = next;
    prev = next;
  }

  prev.next = start;

  while(start.next.number !== start.number) {
    let temp = start.next.next;
    start.next = start.next.next;
    start = temp;
  }

  console.log(start.number);
}

star1();

let numElfs = 3014603;

let builder = { number: 1 };

let start = builder;
let opp;

for (let i = 2; i <= numElfs; i++) {
  let next = { number: i, prev: builder };
  if (Math.floor(numElfs / 2) === i - 1) {
    opp = next;
  }
  builder.next = next;
  builder = next;
}

builder.next = start;
start.prev = builder;

while(opp.number !== start.number) {
  const temp = opp.next;
  opp.prev.next = opp.next;
  opp.next.prev = opp.prev;

  opp = opp.next;

  numElfs--;
  if (numElfs % 2 === 0) {
    opp = opp.next;
  }

  start = start.next;
}

console.log(start.number);
