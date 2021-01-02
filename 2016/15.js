let input = `Disc #1 has 13 positions; at time=0, it is at position 11.
Disc #2 has 5 positions; at time=0, it is at position 0.
Disc #3 has 17 positions; at time=0, it is at position 11.
Disc #4 has 3 positions; at time=0, it is at position 0.
Disc #5 has 7 positions; at time=0, it is at position 2.
Disc #6 has 19 positions; at time=0, it is at position 17.`;

let disks = input.split('\n').map(line => {
  const [_, index, modulo, start] = line.match(/Disc #([0-9]+) has ([0-9]+) positions; at time=0, it is at position ([0-9]+)./).map(x => parseInt(x, 10));
  return { index, modulo, start };
});

for (let i = 0; true; i++) {
  if (disks.every(disk => (i + disk.index + disk.start) % disk.modulo === 0)) {
    console.log(i);
    break;
  }
}

input += '\nDisc #7 has 11 positions; at time=0, it is at position 0.';

disks = input.split('\n').map(line => {
  const [_, index, modulo, start] = line.match(/Disc #([0-9]+) has ([0-9]+) positions; at time=0, it is at position ([0-9]+)./).map(x => parseInt(x, 10));
  return { index, modulo, start };
});

for (let i = 0; true; i++) {
  if (disks.every(disk => (i + disk.index + disk.start) % disk.modulo === 0)) {
    console.log(i);
    break;
  }
}
