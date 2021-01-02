const input = require('fs').readFileSync('inputs/2017/22.txt').toString();

const star1 = () => {
  const map = {};

  input.split('\n').forEach((line, y) => {
    line.split('').forEach((c, x) => {
      if (c === '#') {
        map[`${y}#${x}`] = true;
      }
    });
  });

  let y = Math.floor(input.split('\n').length / 2);
  let x = Math.floor(input.split('\n')[0].length / 2);
  let dir = 'N';

  let infectionCount = 0;

  const isInfected = (y, x) => `${y}#${x}` in map ? map[`${y}#${x}`] : false;
  const toggle = (y, x) => {
    const newStatus = !isInfected(y, x);
    if (newStatus) {
      infectionCount++;
    }
    map[`${y}#${x}`] = newStatus;
  };

  const dirMap = {
    S: { L: 'E', R: 'W' },
    N: { L: 'W', R: 'E' },
    E: { L: 'N', R: 'S' },
    W: { L: 'S', R: 'N' },
  }

  const move = () => {
    if (dir === 'S') {
      y++;
    } else if (dir === 'N') {
      y--;
    } else if (dir === 'E') {
      x++;
    } else if (dir === 'W') {
      x--;
    }
  }

  const burst = () => {
    dir = dirMap[dir][isInfected(y, x,) ? 'R' : 'L'];
    toggle(y, x);
    move();
  }

  for (let i = 0; i < 10000; i++) {
    burst();
  }

  console.log(infectionCount);
};

star1();

const map = {};

input.split('\n').forEach((line, y) => {
  line.split('').forEach((c, x) => {
    if (c === '#') {
      map[`${y}#${x}`] = 'infected';
    }
  });
});

let y = Math.floor(input.split('\n').length / 2);
let x = Math.floor(input.split('\n')[0].length / 2);
let dir = 'N';

let infectionCount = 0;

const getState = (y, x) => `${y}#${x}` in map ? map[`${y}#${x}`] : 'clean';

const toggle = () => {
  const currentState = getState(y, x);
  if (currentState === 'clean') {
    map[`${y}#${x}`] = 'weakened';
  } else if (currentState === 'weakened') {
    infectionCount++;
    map[`${y}#${x}`] = 'infected';
  } else if (currentState === 'infected') {
    map[`${y}#${x}`] = 'flagged';
  } else if (currentState === 'flagged') {
    map[`${y}#${x}`] = 'clean';
  }

};

const dirMap = {
  S: { L: 'E', R: 'W', B: 'N' },
  N: { L: 'W', R: 'E', B: 'S' },
  E: { L: 'N', R: 'S', B: 'W' },
  W: { L: 'S', R: 'N', B: 'E' },
}

const move = () => {
  if (dir === 'S') {
    y++;
  } else if (dir === 'N') {
    y--;
  } else if (dir === 'E') {
    x++;
  } else if (dir === 'W') {
    x--;
  }
}

const turn = () => {
  const currentState = getState(y, x);
  if (currentState === 'clean') {
    dir = dirMap[dir]['L'];
  } else if (currentState === 'infected') {
    dir = dirMap[dir]['R'];
  } else if (currentState === 'flagged') {
    dir = dirMap[dir]['B'];
  }
}

const burst = () => {
  turn();
  toggle();
  move();
}

for (let i = 0; i < 10000000; i++) {
  burst();
}

console.log(infectionCount);
