// const input = `19, 13, 30 @ -2,  1, -2
// 18, 19, 22 @ -1, -1, -2
// 20, 25, 34 @ -2, -2, -4
// 12, 31, 28 @ -1, -2, -1
// 20, 19, 15 @  1, -5, -3`

const input = require("fs").readFileSync("inputs/2023/24.txt").toString();

const particles = input.split("\n").map((line) => {
  const [pos, vel] = line
    .split(" @ ")
    .map((a) => a.split(", ").map((n) => parseInt(n, 10)));
  const m = vel[1] / vel[0];
  const y0 = pos[1] - pos[0] * m;
  return { pos, vel, m, y0 };
});

// console.log(p1, p2)

// y = 22.5 - 0.5x
// y = 1 + 1x
// => 22.5 + (-0.5)x = 1 + 1x
// => (22.5 - 1) = 1x - (-0.5)x
// => (22.5 - 1) = (1 - (-0.5))x
// => x = ((22.5 - 1) / (1 - (-0.5)))

const positionAfterTime = (particle, time) => {
  return [
    particle.pos[0] + particle.vel[0] * time,
    particle.pos[1] + particle.vel[1] * time,
    particle.pos[2] + particle.vel[2] * time,
  ];
};

const check = (p1, p2, t1, t2) => {
  const position1 = positionAfterTime(p1, t1);
  const position2 = positionAfterTime(p2, t2);

  const velocity = [
    (position2[0] - position1[0]) / (t2 - t1),
    (position2[1] - position1[1]) / (t2 - t1),
    (position2[2] - position1[2]) / (t2 - t1),
  ];
  const startPosition = [
    position1[0] - velocity[0] * t1,
    position1[1] - velocity[1] * t1,
    position1[2] - velocity[2] * t1,
  ];

  // console.log(startPosition)
  if (
    !Number.isInteger(velocity[0]) ||
    !Number.isInteger(velocity[1]) ||
    !Number.isInteger(velocity[2])
  ) {
    return;
  }
  if (
    !Number.isInteger(startPosition[0]) ||
    !Number.isInteger(startPosition[1]) ||
    !Number.isInteger(startPosition[2])
  ) {
    return;
  }

  // console.log(position1, position2, velocity, startPosition)

  // pos0 + t * vel0 = pos1 + t * vel1
  // pos0 - pos1 = (ve1 - vel0) * t

  const allMatch = particles.every((p) => {
    let xCollisionTime =
      (p.pos[0] - startPosition[0]) / (velocity[0] - p.vel[0]);
    if (p.pos[0] === startPosition[0] && velocity[0] === p.vel[0]) {
      xCollisionTime = "always";
    }
    let yCollisionTime =
      (p.pos[1] - startPosition[1]) / (velocity[1] - p.vel[1]);
    // console.log(p.pos[1],startPosition[1], velocity[1], p.vel[1])
    if (p.pos[1] === startPosition[1] && velocity[1] === p.vel[1]) {
      yCollisionTime = "always";
    }
    let zCollisionTime =
      (p.pos[2] - startPosition[2]) / (velocity[2] - p.vel[2]);
    if (p.pos[2] === startPosition[2] && velocity[2] === p.vel[2]) {
      zCollisionTime = "always";
    }

    console.log(xCollisionTime, yCollisionTime, zCollisionTime)

    // console.log(xCollisionTime, yCollisionTime, zCollisionTime)
    if (
      xCollisionTime === "always" &&
      yCollisionTime === "always" &&
      zCollisionTime === "always"
    ) {
      return true;
    }
    if (xCollisionTime === "always" && yCollisionTime === "always") {
      return true;
    }
    if (xCollisionTime === "always" && zCollisionTime === "always") {
      return true;
    }
    if (yCollisionTime === "always" && zCollisionTime === "always") {
      return true;
    }
    if (xCollisionTime === "always") {
      return Math.abs(yCollisionTime - zCollisionTime) < 0.1;
    }
    if (yCollisionTime === "always") {
      return Math.abs(xCollisionTime - zCollisionTime) < 0.1;
    }
    if (zCollisionTime === "always") {
      return Math.abs(xCollisionTime - yCollisionTime) < 0.1;
    }
    return (
      Math.abs(xCollisionTime - yCollisionTime) < 0.1 &&
      Math.abs(yCollisionTime - zCollisionTime) < 0.1
    );
  });

  if (allMatch) {
    console.log(
      startPosition,
      "done",
      startPosition[0] + startPosition[1] + startPosition[2]
    );
    process.exit(0);
  }
};

// for (let t2 = 1; t2 < 100000; t2++) {
//   for (let t1 = 1; t1 < t2; t1++) {
//     // console.log(t1, t2)
//     check(particles[0], particles[1], t1, t2)
//     check(particles[1], particles[0], t1, t2)
//   }
// }

for (let t2 = 1; t2 < 1000; t2++) {
  for (let t1 = 1; t1 < t2; t1++) {
    // console.log(t1, t2)

    for (let i = 0; i < particles.length; i++) {
      for (let j = 0; j < i; j++) {

        // console.log(i, j)
        check(particles[i], particles[j], t1, t2);
        check(particles[j], particles[i], t1, t2);
      }
    }
  }
}

// for (let i = 0)

// check(particles[1], particles[0], 3, 5)
