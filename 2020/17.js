const input = `#.#..#.#
#.......
####..#.
.#.#.##.
..#..#..
###..##.
.#..##.#
.....#..`;

const star1 = () => {
  let map = {};

  input.split('\n').forEach((line, y) => {
    line.split('').forEach((c, x) => {
      if (c === '#') {
        map[`0#${y}#${x}`] = true;
      }
    })
  })

  const get = (z, y, x) => `${z}#${y}#${x}` in map ? map[`${z}#${y}#${x}`] : false;

  const getNeighbors = (Z, Y, X) => {
    const output = [];
    for (let z = Z - 1; z <= Z + 1; z++) {
      for (let y = Y - 1; y <= Y + 1; y++) {
        for (let x = X - 1; x <= X + 1; x++) {
          if (x !== X || y !== Y || z !== Z) {
            output.push([z, y, x]);
          }
        }
      }
    }
    return output;
  }

  const getActiveNeighborCount = (z, y, x) => {
    return getNeighbors(z, y, x,).reduce((count, cur) => get(...cur) ? count + 1: count, 0);
  }

  const stepCoord = (z, y, x, next) => {
    const result = getActiveNeighborCount(z, y, x);
    const currentState = get(z, y, x);

    if (currentState && (result === 2 || result === 3)) {
      next[`${z}#${y}#${x}`] = true;
    } else if (!currentState && result === 3) {
      next[`${z}#${y}#${x}`] = true;
    }
  }

  const step = () => {
    const next = {};

    Object.entries(map).forEach(([key, value]) => {
      if (value) {
        stepCoord(...key.split('#').map(a => parseInt(a, 10)), next);
        getNeighbors(...key.split('#').map(a => parseInt(a, 10))).forEach(neighbor => {
          stepCoord(...neighbor, next);
        });
      }
    });

    map = next;
  }

  for (let i = 0; i < 6; i++) {
    step();
  }

  console.log(Object.values(map).length);
}

star1();

let map = {};

input.split('\n').forEach((line, y) => {
  line.split('').forEach((c, x) => {
    if (c === '#') {
      map[`0#0#${y}#${x}`] = true;
    }
  })
})

const get = (w, z, y, x) => `${w}#${z}#${y}#${x}` in map ? map[`${w}#${z}#${y}#${x}`] : false;

const getNeighbors = (W, Z, Y, X) => {
  const output = [];
  for (let w = W - 1; w <= W + 1; w++) {
    for (let z = Z - 1; z <= Z + 1; z++) {
      for (let y = Y - 1; y <= Y + 1; y++) {
        for (let x = X - 1; x <= X + 1; x++) {
          if (x !== X || y !== Y || z !== Z || w !== W) {
            output.push([w, z, y, x]);
          }
        }
      }
    }
  }

  return output;
}

const getActiveNeighborCount = (w, z, y, x) => getNeighbors(w, z, y, x,).reduce((count, cur) => get(...cur) ? count + 1: count, 0);

const stepCoord = (w, z, y, x, next, done) => {
  if (done.has(`${w}#${z}#${y}#${x}`)) {
    return;
  }
  done.add(`${w}#${z}#${y}#${x}`);
  const result = getActiveNeighborCount(w, z, y, x);
  const currentState = get(w, z, y, x);

  if (currentState && (result === 2 || result === 3)) {
    next[`${w}#${z}#${y}#${x}`] = true;
  } else if (!currentState && result === 3) {
    next[`${w}#${z}#${y}#${x}`] = true;
  }
}

const step = () => {
  const next = {};
  const done = new Set();

  Object.entries(map).forEach(([key, value]) => {
    if (value) {
      stepCoord(...key.split('#').map(a => parseInt(a, 10)), next, done);
      getNeighbors(...key.split('#').map(a => parseInt(a, 10))).forEach(neighbor => {
        stepCoord(...neighbor, next, done);
      });
    }
  });

  map = next;
}

for (let i = 0; i < 6; i++) {
  step();
}

console.log(Object.values(map).length);
