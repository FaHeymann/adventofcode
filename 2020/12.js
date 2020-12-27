const input = require('fs').readFileSync('inputs/2020/12.txt').toString();;

const star1 = () => {
  let y = 0;
  let x = 0;
  let dir = 'E';

  const directionMap = {
    E: {
      R: {
        0: 'E',
        90: 'S',
        180: 'W',
        270: 'N',
      },
      L: {
        0: 'E',
        90: 'N',
        180: 'W',
        270: 'S',
      }
    },
    S: {
      R: {
        0: 'S',
        90: 'W',
        180: 'N',
        270: 'E',
      },
      L: {
        0: 'S',
        90: 'E',
        180: 'N',
        270: 'W',
      }
    },
    W: {
      R: {
        0: 'W',
        90: 'N',
        180: 'E',
        270: 'S',
      },
      L: {
        0: 'W',
        90: 'S',
        180: 'E',
        270: 'N',
      }
    },
    N: {
      R: {
        0: 'N',
        90: 'E',
        180: 'S',
        270: 'W',
      },
      L: {
        0: 'N',
        90: 'W',
        180: 'S',
        270: 'E',
      }
    },
  };

  const move = (instruction, distance) => {
    if (instruction === 'N') {
      y += distance;
    } else if (instruction === 'E') {
      x += distance;
    } else if (instruction === 'S') {
      y -= distance;
    } else if (instruction === 'W') {
      x -= distance;
    }
  }

  input.split('\n').forEach(line => {
    const instruction = line.substr(0, 1);
    const distance = parseInt(line.substr(1), 10);

    if (['N', 'E', 'W', 'S'].includes(instruction)) {
      move(instruction, distance)
    } else if (['L', 'R'].includes(instruction)) {
      dir = directionMap[dir][instruction][distance];
    } else if (instruction === 'F') {
      move(dir, distance);
    }
  });

  console.log(Math.abs(x) + Math.abs(y));
}

star1();

let yShip = 0;
let xShip = 0;
let yWaypoint = 1;
let xWaypoint = 10;

const move = (instruction, distance) => {
  if (instruction === 'N') {
    yWaypoint += distance;
  } else if (instruction === 'E') {
    xWaypoint += distance;
  } else if (instruction === 'S') {
    yWaypoint -= distance;
  } else if (instruction === 'W') {
    xWaypoint -= distance;
  }
}

input.split('\n').forEach(line => {
  const instruction = line.substr(0, 1);
  const distance = parseInt(line.substr(1), 10);

  if (['N', 'E', 'W', 'S'].includes(instruction)) {
    move(instruction, distance)
  } else if (['L', 'R'].includes(instruction)) {
    if (distance === 180) {
      yWaypoint = -yWaypoint;
      xWaypoint = -xWaypoint;
    } else if (distance === 90) {
      if (instruction === 'R') {
        let b = xWaypoint;
        xWaypoint = yWaypoint;
        yWaypoint = -b;
      } else {
        let b = yWaypoint;
        yWaypoint = xWaypoint;
        xWaypoint = -b;
      }
    } else if (distance === 270) {
      if (instruction === 'R') {
        let b = yWaypoint;
        yWaypoint = xWaypoint;
        xWaypoint = -b;
      } else {
        let b = xWaypoint;
        xWaypoint = yWaypoint;
        yWaypoint = -b;
      }
    }
  } else if (instruction === 'F') {
    yShip += distance * yWaypoint;
    xShip += distance * xWaypoint;
  }
});

console.log(Math.abs(xShip) + Math.abs(yShip));
