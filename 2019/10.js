const input = `#.....#...#.........###.#........#..
....#......###..#.#.###....#......##
......#..###.......#.#.#.#..#.......
......#......#.#....#.##....##.#.#.#
...###.#.#.......#..#...............
....##...#..#....##....#...#.#......
..##...#.###.....##....#.#..##.##...
..##....#.#......#.#...#.#...#.#....
.#.##..##......##..#...#.....##...##
.......##.....#.....##..#..#..#.....
..#..#...#......#..##...#.#...#...##
......##.##.#.#.###....#.#..#......#
#..#.#...#.....#...#...####.#..#...#
...##...##.#..#.....####.#....##....
.#....###.#...#....#..#......#......
.##.#.#...#....##......#.....##...##
.....#....###...#.....#....#........
...#...#....##..#.#......#.#.#......
.#..###............#.#..#...####.##.
.#.###..#.....#......#..###....##..#
#......#.#.#.#.#.#...#.#.#....##....
.#.....#.....#...##.#......#.#...#..
...##..###.........##.........#.....
..#.#..#.#...#.....#.....#...###.#..
.#..........#.......#....#..........
...##..#..#...#..#...#......####....
.#..#...##.##..##..###......#.......
.##.....#.......#..#...#..#.......#.
#.#.#..#..##..#..............#....##
..#....##......##.....#...#...##....
.##..##..#.#..#.................####
##.......#..#.#..##..#...#..........
#..##...#.##.#.#.........#..#..#....
.....#...#...#.#......#....#........
....#......###.#..#......##.....#..#
#..#...##.........#.....##.....#....`;

// const input = `.#..##.###...#######
// ##.############..##.
// .#.######.########.#
// .###.#######.####.#.
// #####.##.#.##.###.##
// ..#####..#.#########
// ####################
// #.####....###.#.#.##
// ##.#################
// #####.##.###..####..
// ..######..##.#######
// ####.##.####...##..#
// .#####..#.######.###
// ##...#.##########...
// #.##########.#######
// .####.#.###.###.#.##
// ....##.##.###..#####
// .#.#.###########.###
// #.#.#.#####.####.###
// ###.##.####.##.#..##`;

let asteroids = input.split('\n').map((l, y) => l.split('').map((c, x) => c === '#' ? { x, y, count: 0, } : null).filter(a => a !== null)).filter(a => a !== []).flat();

isBetween = (a1, a2, b) => (a1 < b && b < a2) || (a2 < b && b < a1);

const format = a => `[${a.x},${a.y}]`;

const blocks = (a1, a2, b) => {
  if (a1.x === a2.x) {
    return b.x === a1.x && isBetween(a1.y, a2.y, b.y);
  }

  if (a1.y === a2.y) {
    return b.y === a1.y && isBetween(a1.x, a2.x, b.x);
  }
  if (!isBetween(a1.x, a2.x, b.x) || !isBetween(a1.y, a2.y, b.y)) {
    return false;
  }

  const deltaX1 = Math.abs(b.x - a1.x);
  const deltaX2 = Math.abs(b.x - a2.x);
  const deltaY1 = Math.abs(b.y - a1.y);
  const deltaY2 = Math.abs(b.y - a2.y);

  return Math.abs(deltaY1 / deltaX1 - deltaY2 / deltaX2) < Number.EPSILON;
}

for (let i = 0; i < asteroids.length; i++) {
  for(let j = i + 1; j < asteroids.length; j++) {
    const blocked = asteroids.some((testee, k) => k !== i && k !== j && blocks(asteroids[i], asteroids[j], testee));
    if (!blocked) {
      asteroids[i].count++;
      asteroids[j].count++;
    }
  }
}

console.log(asteroids.reduce((max, cur) => Math.max(max, cur.count), 0));

let max = 0;
let station;

asteroids.forEach(a => {
  if (a.count > max) {
    max = a.count;
    station = a;
  }
});
console.log(station);

asteroids = asteroids.filter(a => a !== station);

let quadrant1 = [];
let quadrant2 = [];
let quadrant3 = [];
let quadrant4 = [];

asteroids.forEach(a => {
  const deltaX = a.x - station.x;
  const deltaY = a.y - station.y;

  a.m = deltaX === 0 ? (deltaY <= 0 ? -Number.MAX_VALUE : Number.MAX_VALUE) : deltaY / deltaX;
  a.distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

  if (deltaX >= 0 && deltaY <= 0) {
    const bucketIndex = quadrant1.findIndex(e => e.m === a.m);
    if (bucketIndex === -1) {
      quadrant1.push({
        m: a.m,
        entries: [a],
      })
    } else {
      quadrant1[bucketIndex].entries.push(a);
    }
  }
  if (deltaX >= 0 && deltaY > 0) {
    const bucketIndex = quadrant2.findIndex(e => e.m === a.m);
    if (bucketIndex === -1) {
      quadrant2.push({
        m: a.m,
        entries: [a],
      })
    } else {
      quadrant2[bucketIndex].entries.push(a);
    }
  }
  if (deltaX < 0 && deltaY > 0) {
    const bucketIndex = quadrant3.findIndex(e => e.m === a.m);
    if (bucketIndex === -1) {
      quadrant3.push({
        m: a.m,
        entries: [a],
      })
    } else {
      quadrant3[bucketIndex].entries.push(a);
    }
  }
  if (deltaX < 0 && deltaY <= 0) {
    const bucketIndex = quadrant4.findIndex(e => e.m === a.m);
    if (bucketIndex === -1) {
      quadrant4.push({
        m: a.m,
        entries: [a],
      })
    } else {
      quadrant4[bucketIndex].entries.push(a);
    }
  }
});

quadrant1.sort((a, b) => a.m > b.m ? 1 : -1);
quadrant2.sort((a, b) => a.m < b.m ? 1 : -1);
quadrant3.sort((a, b) => a.m < b.m ? 1 : -1);
quadrant4.sort((a, b) => a.m > b.m ? 1 : -1);

const circle = [].concat(quadrant1, quadrant2, quadrant3, quadrant4);

circle.forEach(bucket => {
  bucket.entries.sort((a, b) => a.distance > b.distance ? 1 : -1)
});

let index = 0;
for (let i = 1; i <= 200; i++) {
  const cur = circle[index].entries.shift();

  if (i === 200) {
    console.log(100 * cur.x + cur.y)
  }

  index++;
  if (index === circle.length) {
    index = 0;
  }
}
