const input = 1352;

const isOpen = (y, x) => (x * x + 3 * x + 2 * x * y + y + y * y + input).toString(2).split('').filter(b => b === '1').length % 2 === 0;

const todo = [[1, 1]];
const distances = { '1#1': 0 };

const update = (y, x, d) => {
  if (y < 0 || x < 0) {
    return;
  }
  if (!isOpen(y, x)) {
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

for (let i = 0; todo.length > 0; i++) {
  advance(...todo.shift());
}

console.log(distances['39#31']);
console.log(Object.values(distances).filter(v => v > -1 && v <= 50).length);
