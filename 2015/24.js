const input = require('fs').readFileSync('inputs/2015/24.txt').toString();

const star1 = () => {
  const packets = input.split('\n').map(Number).sort((a, b) => b - a);
  const groupSize = packets.reduce((sum, cur) => sum + cur, 0) / 3;

  let winners = [];
  let minCardinality = Number.MAX_VALUE;

  const canBeSplitEqually = (s1, s2, c1, c2, remainders) => {
    if (c1 > groupSize || c2 > groupSize) {
      return false;
    }
    if (remainders.length === 0) {
      return true;
    }
    const item = remainders.pop();
    return canBeSplitEqually(s1.concat([item]), s2, c1 + item, c2, [...remainders]) || canBeSplitEqually(s1, s2.concat([item]), c1, c2 + item, [...remainders]);
  }

  const buildSets = (set, index, size, cardinality) => {
    if (cardinality > minCardinality) {
      return;
    }
    if (size === groupSize) {
      const remainders = packets.filter(e => !set.includes(e));
      if (canBeSplitEqually([], [], 0, 0, remainders)) {
        if (cardinality < minCardinality) {
          winners = [];
          minCardinality = cardinality;
        }
        winners.push(set);
      }
      return;
    }
    if (size > groupSize || index === packets.length) {
      return;
    }
    const item = packets[index];
    buildSets(set.concat([item]), index + 1, size + item, cardinality + 1);
    buildSets(set, index + 1, size, cardinality);
  }

  buildSets([], 0, 0, 0);

  console.log(winners.reduce((min, cur) => Math.min(min, cur.reduce((product, w) => product * w, 1)), Number.MAX_VALUE));
}

star1();

const packets = input.split('\n').map(Number).sort((a, b) => b - a);
const groupSize = packets.reduce((sum, cur) => sum + cur, 0) / 4;

let winners = [];
let minCardinality = Number.MAX_VALUE;

const canBeSplitEqually = (s1, s2, s3, c1, c2, c3, remainders) => {
  if (c1 > groupSize || c2 > groupSize || c3 > groupSize) {
    return false;
  }
  if (remainders.length === 0) {
    return true;
  }
  const item = remainders.pop();
  return canBeSplitEqually(s1.concat([item]), s2, s3, c1 + item, c2, c3, [...remainders]) || canBeSplitEqually(s1, s2.concat([item]), s3, c1, c2 + item, c3, [...remainders]) || canBeSplitEqually(s1, s2, s3.concat([item]), c1, c2, c3 + item, [...remainders]);
}

const buildSets = (set, index, size, cardinality) => {
  if (cardinality > minCardinality) {
    return;
  }
  if (size === groupSize) {
    const remainders = packets.filter(e => !set.includes(e));
    if (canBeSplitEqually([], [], [], 0, 0, 0, remainders)) {
      if (cardinality < minCardinality) {
        winners = [];
        minCardinality = cardinality;
      }
      winners.push(set);
    }
    return;
  }
  if (size > groupSize || index === packets.length) {
    return;
  }
  const item = packets[index];
  buildSets(set.concat([item]), index + 1, size + item, cardinality + 1);
  buildSets(set, index + 1, size, cardinality);
}

buildSets([], 0, 0, 0);

console.log(winners.reduce((min, cur) => Math.min(min, cur.reduce((product, w) => product * w, 1)), Number.MAX_VALUE));
