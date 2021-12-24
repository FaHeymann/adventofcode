const splitCubeOnOverlap = (inner, cube) => {
  const result = [];
  [
    [cube.x[0], inner.x[0]],
    [inner.x[0], inner.x[1]],
    [inner.x[1], cube.x[1]],
  ].forEach((x) => {
    [
      [cube.y[0], inner.y[0]],
      [inner.y[0], inner.y[1]],
      [inner.y[1], cube.y[1]],
    ].forEach((y) => {
      [
        [cube.z[0], inner.z[0]],
        [inner.z[0], inner.z[1]],
        [inner.z[1], cube.z[1]],
      ].forEach((z) => {
        result.push({ x, y, z });
      });
    });
  });
  return result;
};

const cubeIsCovered = (testee, coveredBy) => {
  return (
    coveredBy.z[0] <= testee.z[0] &&
    testee.z[0] <= coveredBy.z[1] &&
    coveredBy.z[0] <= testee.z[1] &&
    testee.z[1] <= coveredBy.z[1] &&
    coveredBy.y[0] <= testee.y[0] &&
    testee.y[0] <= coveredBy.y[1] &&
    coveredBy.y[0] <= testee.y[1] &&
    testee.y[1] <= coveredBy.y[1] &&
    coveredBy.x[0] <= testee.x[0] &&
    testee.x[0] <= coveredBy.x[1] &&
    coveredBy.x[0] <= testee.x[1] &&
    testee.x[1] <= coveredBy.x[1]
  );
};

const size = (cube) =>
  (cube.z[1] - cube.z[0]) * (cube.y[1] - cube.y[0]) * (cube.x[1] - cube.x[0]);

const getOverlap = (cube1, cube2) => {
  if (
    Math.max(cube1.x[0], cube2.x[0]) < Math.min(cube1.x[1], cube2.x[1]) &&
    Math.max(cube1.y[0], cube2.y[0]) < Math.min(cube1.y[1], cube2.y[1]) &&
    Math.max(cube1.z[0], cube2.z[0]) < Math.min(cube1.z[1], cube2.z[1])
  ) {
    return {
      x: [Math.max(cube1.x[0], cube2.x[0]), Math.min(cube1.x[1], cube2.x[1])],
      y: [Math.max(cube1.y[0], cube2.y[0]), Math.min(cube1.y[1], cube2.y[1])],
      z: [Math.max(cube1.z[0], cube2.z[0]), Math.min(cube1.z[1], cube2.z[1])],
    };
  }
  return null;
};

const input = require("fs").readFileSync("inputs/2021/22.txt").toString();
let cubes = [];
let initDone = false;

input.split("\n").forEach((line) => {
  const [keyword, coordsRaw] = line.split(" ");
  const [x, y, z] = coordsRaw
    .split(",")
    .map((l) => l.substr(2))
    .map((l) => l.split("..").map((n, i) => parseInt(n, 10) + i));

  if (
    (x[0] < -50 ||
      y[0] < -50 ||
      z[0] < -50 ||
      x[1] > 50 ||
      y[1] > 50 ||
      z[1] > 50) &&
    !initDone
  ) {
    initDone = true;
    console.log(cubes.reduce((sum, c) => sum + size(c), 0));
  }

  const cur = { x, y, z };

  let nextCubes = [];
  cubes.forEach((existing) => {
    const overlap = getOverlap(cur, existing);
    if (!overlap) {
      nextCubes.push(existing);
      return;
    }

    const candidates = splitCubeOnOverlap(overlap, existing);
    nextCubes = [
      ...nextCubes,
      ...candidates.filter((c) => !cubeIsCovered(c, cur)),
    ];
  });

  cubes = nextCubes.filter(
    (c) => c.x[0] !== c.x[1] && c.y[0] !== c.y[1] && c.z[0] !== c.z[1]
  );

  if (keyword === "on") {
    cubes.push(cur);
  }
});

console.log(cubes.reduce((sum, c) => sum + size(c), 0));
