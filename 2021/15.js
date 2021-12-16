class SortedArray {
  constructor(array, compare) {
    this.array = [];
    this.compare = compare;
    let index = 0;
    while (index < array.length) {
      this.insert(array[index++]);
    }
  }
  insert(element) {
    let high = this.array.length - 1;
    let low = 0;
    let pos = -1;

    while (high >= low) {
      let index = ((high + low) / 2) >>> 0;
      let ordering = this.compare(this.array[index], element);
      if (ordering < 0) low = index + 1;
      else if (ordering > 0) high = index - 1;
      else {
        pos = index;
        break;
      }
    }

    if (pos === -1) {
      pos = high;
    }
    pos++;
    high = this.array.length - 1;
    while (pos < high && this.compare(element, this.array[pos]) === 0) {
      pos++;
    }
    let index = this.array.length;
    this.array.push(element);
    while (index > pos) {
      this.array[index] = this.array[--index];
    }
    this.array[pos] = element;
  }

  pop() {
    return this.array.pop();
  }
}

const input = require("fs")
  .readFileSync("inputs/2021/15.txt")
  .toString()
  .split("\n")
  .map((line) => line.split("").map((n) => parseInt(n, 10)));

let map = input;

let options = new SortedArray([{ x: 0, y: 0, d: 0 }], (a, b) =>
  a.d < b.d ? 1 : -1
);
let visited = new Map();
visited.set(`0#0`, 0);

const addOption = (y, x, d) => {
  if (y < 0 || x < 0 || y >= map.length || x >= map[0].length) {
    return;
  }
  if (visited.has(`${y}#${x}`) && visited.get(`${y}#${x}`) <= d + map[y][x]) {
    return;
  }

  visited.set(`${y}#${x}`, d + map[y][x]);
  options.insert({ y, x, d: d + map[y][x] });
};

const solve = () => {
  while (true) {
    const { y, x, d } = options.pop();

    if (y === map.length - 1 && x === map.length - 1) {
      console.log(d);
      break;
    }

    addOption(y + 1, x, d);
    addOption(y - 1, x, d);
    addOption(y, x + 1, d);
    addOption(y, x - 1, d);
  }
};

solve();

map = [];
options = new SortedArray([{ x: 0, y: 0, d: 0 }], (a, b) =>
  a.d < b.d ? 1 : -1
);
visited = new Map();
visited.set(`0#0`, 0);

for (let Y = 0; Y < 5; Y++) {
  for (let y = 0; y < input.length; y++) {
    const line = [];
    for (let X = 0; X < 5; X++) {
      for (let x = 0; x < input[0].length; x++) {
        const val = input[y][x] + Y + X;
        line.push(val > 9 ? val - 9 : val);
      }
    }
    map.push(line);
  }
}

solve();
