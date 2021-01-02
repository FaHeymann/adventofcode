const input = require('fs').readFileSync('inputs/2017/20.txt').toString();

const particles = input.split('\n').map((line, i) => {
  const [_, posX, posY, posZ, velX, velY, velZ, accX, accY, accZ] = line.match(/^p=<([-0-9]+),([-0-9]+),([-0-9]+)>, v=<([-0-9]+),([-0-9]+),([-0-9]+)>, a=<([-0-9]+),([-0-9]+),([-0-9]+)>$/).map(a => parseInt(a, 10));
  return {
    number: i,
    pos: {x: posX, y: posY, z: posZ},
    vel: {x: velX, y: velY, z: velZ},
    acc: {x: accX, y: accY, z: accZ},
    totalAcc: Math.abs(accX) + Math.abs(accY) + Math.abs(accZ),
    totalVelStart: Math.abs(velX) + Math.abs(velY) + Math.abs(velZ),
    effectiveVelStart: (accX * velX >= 0 ? 1 : -1) * Math.abs(velX) + (accY * velY >= 0 ? 1 : -1) * Math.abs(velY) + (accZ * velZ >= 0 ? 1 : -1) * Math.abs(velZ),
    totalDistStart: Math.abs(posX) + Math.abs(posY) + Math.abs(posZ),
  };
});

const star1 = () => {
  const closest = [...particles].sort((a, b) => {
    if (a.totalAcc !== b.totalAcc) {
      return a.totalAcc - b.totalAcc;
    }
    if (a.effectiveVelStart !== b.effectiveVelStart) {
      return a.effectiveVelStart - b.effectiveVelStart;
    }
    return a.totalDistStart - b.totalDistStart;
  })[0];

  console.log(closest.number);
};

star1();

const star2WorksButSucks = () => {
  const colided = new Set();

  const simulate = () => {
    particles.forEach(p => {
      if (p === 'colided') {
        return;
      }
      p.vel.x += p.acc.x;
      p.vel.y += p.acc.y;
      p.vel.z += p.acc.z;
      p.pos.x += p.vel.x;
      p.pos.y += p.vel.y;
      p.pos.z += p.vel.z;
    });
  }

  const getCollisions = (t) => {
    particles.forEach((p1, i) => {
      if (p1 === 'colided') {
        return;
      }
      particles.forEach((p2, j) => {
        if (j <= i || p2 === 'colided') {
          return;
        }
        if (p1.pos.x === p2.pos.x && p1.pos.y === p2.pos.y && p1.pos.z === p2.pos.z) {
          colided.add(p1.number);
          colided.add(p2.number);
        }
      });
    });
  }

  for (let i = 0; i < 40; i++) { // arbitrary
    collisions = new Set();
    simulate();
    getCollisions();
    colided.forEach(c => {
      particles[c] = 'colided';
    });
  }

  console.log(particles.filter(p => p !== 'colided').length);
}

star2WorksButSucks();


// console.log(particles.join('\n'));

// const calcCollision = (pos1, vel1, acc1, pos2, vel2, acc2) => {
//   if (acc1 === acc2) {
//     return (-pos1 + pos2) / (vel1 - vel2);
//   }


//   const p = (acc1 - acc2 + 2 * vel1 - 2 * vel2) / (acc1 - acc2);
//   const q = (2 * (pos1 - pos2)) / (acc1 - acc2);

//   // console.log(p, q);

//   const sol1 = -1 * (p / 2) + Math.sqrt((p / 2) * (p / 2) - q);
//   const sol2 = -1 * (p / 2) - Math.sqrt((p / 2) * (p / 2) - q);

//   return sol1 > 0 && sol2 >0 ? Math.min(sol1, sol2) : Math.max(sol1, sol2);
// };

// const collisions = {};

// particles.forEach((p1, i) => {
//   particles.forEach((p2, j) => {
//     if (j <= i) {
//       return;
//     }
//     const xCollisionAt = calcCollision(p1.pos.x, p1.vel.x, p1.acc.x, p2.pos.x, p2.vel.x, p2.acc.x);
//     const yCollisionAt = calcCollision(p1.pos.y, p1.vel.y, p1.acc.y, p2.pos.y, p2.vel.y, p2.acc.y);
//     const zCollisionAt = calcCollision(p1.pos.z, p1.vel.z, p1.acc.z, p2.pos.z, p2.vel.z, p2.acc.z);

//     if (Number.isInteger(xCollisionAt) && Number.isInteger(yCollisionAt) && Number.isInteger(zCollisionAt) && xCollisionAt === yCollisionAt && xCollisionAt === zCollisionAt) {
//       if (!(xCollisionAt in collisions)) {
//         collisions[xCollisionAt] = [];
//       }
//       collisions[xCollisionAt].push([p1.number, p2.number]);
//     }

//   });
// });

// console.log(collisions);

// Object.keys(collisions).forEach(t => {
//   console.log(t);
//   const colided = new Set();
//   collisions[t].forEach(col => {
//     particles[col[0]] = 'colided';
//     particles[col[1]] = 'colided';
//     colided.add(col[0]);
//     colided.add(col[1]);
//   });
//   Object.keys(collisions).forEach(t => {
//     // console.log('before', collisions[t].length);
//     collisions[t] = collisions[t].filter(col => !colided.has(col[0]) && !colided.has(col[1]));
//     // console.log('after', collisions[t].length);
//   });
//   // console.log(collisions);
// });

// console.log(particles.filter(p => p !== 'colided').length);

// console.log(particles.map((p, i) => `${i}: ${p}`))

// const p1 = particles[71];
// const p2 = particles[73];

// const xCollisionAt = calcCollision(p1.pos.x, p1.vel.x, p1.acc.x, p2.pos.x, p2.vel.x, p2.acc.x);
// const yCollisionAt = calcCollision(p1.pos.y, p1.vel.y, p1.acc.y, p2.pos.y, p2.vel.y, p2.acc.y);
// const zCollisionAt = calcCollision(p1.pos.z, p1.vel.z, p1.acc.z, p2.pos.z, p2.vel.z, p2.acc.z);

// console.log(xCollisionAt, yCollisionAt, zCollisionAt)

// console.log(p1, p2);

// for (let i = 0; i < 18; i++) {
//   p1.vel.x += p1.acc.x;
//   p1.vel.y += p1.acc.y;
//   p1.vel.z += p1.acc.z;
//   p1.pos.x += p1.vel.x;
//   p1.pos.y += p1.vel.y;
//   p1.pos.z += p1.vel.z;

//   p2.vel.x += p2.acc.x;
//   p2.vel.y += p2.acc.y;
//   p2.vel.z += p2.acc.z;
//   p2.pos.x += p2.vel.x;
//   p2.pos.y += p2.vel.y;
//   p2.pos.z += p2.vel.z;
// }

// console.log(p1, p2);
