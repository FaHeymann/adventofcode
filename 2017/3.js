let x = 0;
let y = 0;

let deltaX = 1;
let deltaY = 1;
let surplusX = 1;
let surplusY = 1;

let direction = 'R';

let map = {};

map['0#0'] = 1;
const get = (y, x) => map[`${y}#${x}`] || 0;

const step = () => {
  if (direction === 'R') {
    x += 1;
    surplusX -= 1;

    if (surplusX === 0) {
      deltaX++;
      surplusX = deltaX;
      direction = 'U';
    }
    return;
  }

  if (direction === 'U') {
    y += 1;
    surplusY -= 1;

    if (surplusY === 0) {
      deltaY++;
      surplusY = deltaY;
      direction = 'L';
    }
    return;
  }

  if (direction === 'L') {
    x -= 1;
    surplusX -= 1;

    if (surplusX === 0) {
      deltaX++;
      surplusX = deltaX;
      direction = 'D';
    }
    return;
  }

  if (direction === 'D') {
    y -= 1;
    surplusY -= 1;

    if (surplusY === 0) {
      deltaY++;
      surplusY = deltaY;
      direction = 'R';
    }
    return;
  }
};

let result2;

for (let i = 1; i < 347991; i++) {
  step();
  if (!result2) {
    map[`${y}#${x}`] =
      get(y - 1, x - 1)
    + get(y - 1, x)
    + get(y - 1, x + 1)
    + get(y, x - 1)
    + get(y, x + 1)
    + get(y + 1, x - 1)
    + get(y + 1, x, 1)
    + get(y + 1, x + 1);

    if (map[`${y}#${x}`] > 347991) {
      result2 = map[`${y}#${x}`];
    }
  }
}
console.log(Math.abs(x) + Math.abs(y));
console.log(result2);
