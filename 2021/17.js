const targetXMin = 119;
const targetXMax = 176;
const targetYMin = -141;
const targetYMax = -84;

let max = Number.NEGATIVE_INFINITY
let count = 0;

const test = (xVel, yVel) => {
  let maxY = 0
  let y = 0;
  let x = 0;
  while (true) {
    y += yVel;
    x += xVel;
    yVel--;
    if (xVel > 0) {
      xVel--;
    } else if (xVel < 0) {
      xVel++;
    }

    maxY = Math.max(y, maxY)

    if (
      targetYMin <= y &&
      y <= targetYMax &&
      targetXMin <= x &&
      x <= targetXMax
    ) {
      return maxY;
    }

    if (yVel > Math.abs(targetYMin)) {
      return 'break' // will overhoot with step after returning to y=0
    }
    if (xVel === 0 && x < targetXMin) {
      return 'break' // will never get there with this x
    }
    if (y < targetYMin) {
      return 'continue'; // undershot
    }
    if (x > targetXMax) {
      return 'break'; // overshot
    }
  }
};

for (let x = 1; x <= targetXMax; x++) {
  for (let y = targetYMin; true; y++) {
    const result = test(x, y);
    if (result === 'break') {
      break;
    }
    if (result === 'continue') {
      continue;
    }
    max = Math.max(result, max);
    count++;
  }
}

console.log(max)
console.log(count)
