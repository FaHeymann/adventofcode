const input = require('fs').readFileSync('inputs/2018/4.txt').toString();

const map = {};

let curGuardId;
let sleepingSince;

input.split('\n').sort().forEach(line => {
  if (line.includes('begins shift')) {
    const [_, id] = line.match(/Guard #([0-9]+) begins shift/);
    curGuardId = id;
  } else if (line.includes('falls asleep')) {
    const [_, minute] = line.match(/[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:([0-9]{2})/);
    sleepingSince = minute;
  } else if (line.includes('wakes up')) {
    const [_, minute] = line.match(/[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:([0-9]{2})/);
    if (!map[curGuardId]) {
      map[curGuardId] = {};
    }

    for (let i = sleepingSince; i < minute; i++) {
      if (!map[curGuardId][i]) {
        map[curGuardId][i] = 0;
      }
      if (!map[curGuardId].total) {
        map[curGuardId].total = 0;
      }
      map[curGuardId][i]++;
      map[curGuardId].total++
    }
  }
});

let max = 0;
let guardId;

Object.entries(map).forEach(([id, values]) => {
  if (values.total > max) {
    max = values.total;
    guardId = id;
  }
});

max = 0;
let minute;

Object.entries(map[guardId]).forEach(([time, value]) => {
  if (time !== 'total' && value > max) {
    max = value;
    minute = time;
  }
});

console.log(minute * parseInt(guardId, 10));

// star 2
max = 0;

Object.entries(map).forEach(([id, values]) => {
  Object.entries(values).forEach(([time, value]) => {
    if (time !== 'total' && value > max) {
      max = value;
      minute = time;
      guardId = id;
    }
  });
});

console.log(minute * parseInt(guardId, 10));
