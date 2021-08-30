const initialInput = '.##..#.#..##..##..##...#####.#.....#..#..##.###.#.####......#.......#..###.#.#.##.#.#.###...##.###.#';

const transformInput = `.##.# => #
##.#. => #
##... => #
#.... => .
.#..# => .
#.##. => .
.##.. => .
.#.## => .
###.. => .
..##. => #
##### => #
#...# => #
.#... => #
###.# => #
#.### => #
##..# => .
.###. => #
...## => .
..#.# => .
##.## => #
....# => .
#.#.# => #
#.#.. => .
.#### => .
...#. => #
..### => .
..#.. => #
..... => .
####. => .
#..## => #
.#.#. => .
#..#. => #`;

const fertile = transformInput.split('\n').filter(line => line.charAt(9) === '#').map(line => line.split(' => ')[0]);

console.log(fertile);

let state = new Set();

initialInput.split('').forEach((c, i) => {
  if (c === '#') {
    state.add(i);
  }
});

const step = () => {
  let next = new Set();
  for (let i = Math.min(...state.values()) - 2; i <= Math.max(...state.values()) + 2; i++) {
    const configuration = [-2, -1, 0, 1, 2].map(p => i + p).map(p => state.has(p) ? '#' : '.').join('');
    if (fertile.includes(configuration)) {
      next.add(i);
    }
  }
  state = next;
}

const print = () => {
  let output = '';

  for (let i = -10; i < 250; i++) {
    output += state.has(i) ? '#' : '.';
  }
  console.log(output);
}

for (let i = 0; i < 20; i++) {
  step();
}

console.log(Array.from(state).reduce((sum, val) => sum + val, 0));

// After 150 Steps there is a steady increase of 78 per step, 14167 is the value after 150 steps
console.log((50000000000 - 150) * 78 + 14167);
