const input = require('fs').readFileSync('inputs/2016/24.txt').toString();

const grid = input.split('\n').map(line => line.split(''));

const points = {};

grid.forEach((line, y) => {
  line.forEach((c, x) => {
    if (!['.', '#'].includes(c)) {
      points[c] = { x, y };
      grid[y][x] = '.';
    }
  });
});

const distance = (p1, p2) => {
  const todo = [[p1.y, p1.x]];
  const distances = {};
  distances[`${p1.y}#${p1.x}`] = 0;

  const update = (y, x, d) => {
    if (y < 0 || x < 0) {
      return;
    }
    if (grid[y][x] === '#') {
      distances[`${y}#${x}`] = -1;
      return;
    }

    if (!(`${y}#${x}` in distances) || d < distances[`${y}#${x}`]) {
      distances[`${y}#${x}`] = d;
      todo.push([y, x]);
    }
  }

  const advance = (y, x) => {
    update(y - 1, x, distances[`${y}#${x}`] + 1);
    update(y + 1, x, distances[`${y}#${x}`] + 1);
    update(y, x - 1, distances[`${y}#${x}`] + 1);
    update(y, x + 1, distances[`${y}#${x}`] + 1);
  }

  while (!(`${p2.y}#${p2.x}` in distances)) {
    advance(...todo.shift());
  }

  return distances[`${p2.y}#${p2.x}`];
}

const distances = {};

Object.entries(points).forEach(([key1, point1]) => {
  Object.entries(points).forEach(([key2, point2]) => {
    if (parseInt(key1, 10) <= parseInt(key2, 10)) {
      return;
    }

    const dist = distance(point1, point2);
    distances[`${key1}#${key2}`] = dist;
    distances[`${key2}#${key1}`] = dist;
  });
});

let min = Number.MAX_VALUE;

const resolve = (sum, prev, points) => {
  if (sum > min) {
    return;
  }
  if (points.length === 1) {
    sum = sum + distances[`${prev}#${points[0]}`];
    if (sum < min) {
      min = sum;
    }
    return;
  }
  points.forEach((p, i) => {
    const nextSum = sum + distances[`${prev}#${p}`];
    const nextPoints = [...points];
    nextPoints.splice(i, 1);
    resolve(nextSum, p, nextPoints);
  });
}

const initialPoints = Object.keys(points);
initialPoints.splice(0, 1);

resolve(0, '0', initialPoints);

console.log(min);

min = Number.MAX_VALUE;

const resolve2 = (sum, prev, points) => {
  if (sum > min) {
    return;
  }
  if (points.length === 1) {
    sum = sum + distances[`${prev}#${points[0]}`] + distances[`${points[0]}#0`];
    if (sum < min) {
      min = sum;
    }
    return;
  }
  points.forEach((p, i) => {
    const nextSum = sum + distances[`${prev}#${p}`];
    const nextPoints = [...points];
    nextPoints.splice(i, 1);
    resolve2(nextSum, p, nextPoints);
  });
}

resolve2(0, '0', initialPoints);

console.log(min);

