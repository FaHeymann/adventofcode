const input = require('fs').readFileSync('inputs/2018/6.txt').toString();

const points = input.split('\n').map(line => line.split(', ').map(x => parseInt(x, 10)).concat([false]).concat([0]));

points.forEach(current => {
  let checks = [false, false, false, false];
  points.forEach(reference => {
    if (current[0] === reference[0] && current[1] === reference[1]) {
      return;
    }
    if (current[0] - reference[0] >= Math.abs(current[1] - reference[1])) {
      checks[0] = true;
    }
    if (reference[0] - current[0] >= Math.abs(current[1] - reference[1])) {
      checks[1] = true;
    }
    if (current[1] - reference[1] >= Math.abs(current[0] - reference[0])) {
      checks[2] = true;
    }
    if (reference[1] - current[1] >= Math.abs(current[0] - reference[0])) {
      checks[3] = true;
    }
  });
  current[2] = checks.every(c => c);
});

for (let y = Math.min(...points.map(p => p[0])); y <= Math.max(...points.map(p => p[0])); y++) {
  for (let x = Math.min(...points.map(p => p[0])); x <= Math.max(...points.map(p => p[0])); x++) {
    let min = Number.MAX_VALUE;
    let closest = [];
    points.forEach((p, i) => {
      if (Math.abs(y - p[0]) + Math.abs(x - p[1]) < min) {
        closest = [i]
        min = Math.abs(y - p[0]) + Math.abs(x - p[1]);
      } else if (Math.abs(y - p[0]) + Math.abs(x - p[1]) === min) {
        closest.push(i);
      }
    });
    if (closest.length === 1) {
      points[closest[0]][3]++;
    }
  }
}

console.log(points.filter(p => p[2]).reduce((max, cur) => Math.max(max, cur[3]), 0));

const threshold = 10000;

let regionSize = 0;

for (let y = Math.min(...points.map(p => p[0])) - Math.ceil(threshold / points.length); y <= Math.max(...points.map(p => p[0])) + Math.floor(threshold / points.length); y++) {
  for (let x = Math.min(...points.map(p => p[0])) - Math.ceil(threshold / points.length); x <= Math.max(...points.map(p => p[0])) + Math.floor(threshold / points.length); x++) {
    let totalDistance = 0;
    points.forEach((p, i) => {
      totalDistance += Math.abs(y - p[0]) + Math.abs(x - p[1]);
    });
    if (totalDistance < threshold) {
      regionSize++;
    }
  }
}

console.log(regionSize);
