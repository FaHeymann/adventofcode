const initialize = (x, y, z) => ({ pos: { x, y, z }, vel: {x: 0, y: 0, z: 0} });

const applyGravity = (a, b) => {
  ['x', 'y', 'z'].forEach(coord => {
    if (a.pos[coord] > b.pos[coord]) {
      a.vel[coord] -= 1;
      b.vel[coord] += 1;
    } else if (a.pos[coord] < b.pos[coord]) {
      a.vel[coord] += 1;
      b.vel[coord] -= 1;
    }
  });
};

const applyVelocity = (a) => {
  a.pos.x += a.vel.x;
  a.pos.y += a.vel.y;
  a.pos.z += a.vel.z;
};

const moons = [
  initialize(7, 10, 17),
  initialize(-2, 7, 0),
  initialize(12, 5, 12),
  initialize(5, -8, 6),
];

// const moons = [
//   initialize(-1, 0, 2),
//   initialize(2, -10, -7),
//   initialize(4, -8, 8),
//   initialize(3, 5, -1),
// ];

// const moons = [
//   initialize(-8, -10, 0),
//   initialize(5, 5, 10),
//   initialize(2, -7, 3),
//   initialize(9, -8, -3),
// ];

const step = () => {
  for(let i = 0; i < moons.length; i++) {
    for (let j = i + 1; j < moons.length; j++) {
      applyGravity(moons[i], moons[j]);
    }
  }
  moons.forEach(moon => {
    applyVelocity(moon)
  });
};

// for (let i = 0; i < 1000; i++) {
//   step();
// }
// const getEnergy = moon => (Math.abs(moon.pos.x) + Math.abs(moon.pos.y) + Math.abs(moon.pos.z)) * (Math.abs(moon.vel.x) + Math.abs(moon.vel.y) + Math.abs(moon.vel.z));
// console.log(moons);
// console.log(getEnergy(moons[0]) + getEnergy(moons[1]) + getEnergy(moons[2]) + getEnergy(moons[3]));

const factors = ['x', 'y', 'z'].map(c => {
  const reachedStates = {};

  const persist = (coord) => {
    reachedStates[`${moons[0].pos[coord]}#${moons[0].vel[coord]}#${moons[1].pos[coord]}#${moons[1].vel[coord]}#${moons[2].pos[coord]}#${moons[2].vel[coord]}#${moons[3].pos[coord]}#${moons[3].vel[coord]}`] = true;
  }

  const seenBefore = (coord) => `${moons[0].pos[coord]}#${moons[0].vel[coord]}#${moons[1].pos[coord]}#${moons[1].vel[coord]}#${moons[2].pos[coord]}#${moons[2].vel[coord]}#${moons[3].pos[coord]}#${moons[3].vel[coord]}` in reachedStates;

  let count = 0;

  while(!seenBefore(c)) {
    persist(c);
    step();
    count++;
  }
  return count;
});

console.log('factors done');
console.log(factors);

let running = factors[1];

while(running % factors[0] !== 0 || running % factors[2] !== 0) {
  running += factors[1];
}

console.log(running);
