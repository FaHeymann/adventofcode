const main = highest => {
  const score = {};
  const playerCount = 413;

  let ring = {
    value: 0,
  }

  ring.next = ring;
  ring.prev = ring;

  const addElement = value => {
    ring = ring.next;
    const el = {
      value,
      prev: ring,
      next: ring.next,
    };
    ring.next.prev = el;
    ring.next = el;

    ring = el;
  }

  const removeElement = value => {
    const currentPlayer = ((value - 1) % playerCount) + 1;
    for (let i = 0; i < 6; i++) {
      ring = ring.prev;
    }

    if (!score[currentPlayer]) {
      score[currentPlayer] = 0;
    }

    score[currentPlayer] += value + ring.prev.value;

    ring.prev.prev.next = ring;
    ring.prev = ring.prev.prev;
  }

  for (let i = 1; i <= highest; i++) {
    if (i % 23 === 0) {
      removeElement(i)
    } else {
      addElement(i);
    }
  }

  console.log(Object.values(score).reduce((max, cur) => Math.max(max, cur), 0));
};

main(71082);
main(7108200);
