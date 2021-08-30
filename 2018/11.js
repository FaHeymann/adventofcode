const grid = [];
const serial = 3463;

for (let y = 1; y <= 300; y++) {
  grid[y] = [];
  for (let x = 1; x <= 300; x++) {
    const rackId = x + 10;
    let power = (rackId * y + serial) * rackId;
    grid[y][x] = parseInt(('' + power).padStart(3, '0').slice(-3).charAt(0), 10) - 5;
  }
}

let max = -1000;
let best = '';

for (let y = 1; y <= 300 - 2; y++) {
  for (let x = 1; x <= 300 - 2; x++) {
    let sum = 0;
    for (let subY = y; subY < y + 3; subY++) {
      for (let subX = x; subX < x + 3; subX++) {
        sum += grid[subY][subX];
      }
    }

    if (sum > max) {
      max = sum;
      best = `${x},${y}`;
    }
  }
}

console.log(best);

max = -1000;
best = '';

for (let length = 3; length <= 300; length++) {
  for (let y = 1; y <= 300 - (length - 1); y++) {
    let previous;
    for (let x = 1; x <= 300 - (length - 1); x++) {
      let sum = 0;
      if (!previous) {
        for (let subY = y; subY < y + length; subY++) {
          for (let subX = x; subX < x + length; subX++) {
            sum += grid[subY][subX];
          }
        }
      } else {
        sum = previous;
        for (let subY = y; subY < y + length; subY++) {
          sum -= grid[subY][x - 1];
          sum += grid[subY][x + length - 1];
        }
      }
      previous = sum;

      if (sum > max) {
        max = sum;
        best = `${x},${y},${length}`;
      }
    }
  }
}

console.log(best);
