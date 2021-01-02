const input = require('fs').readFileSync('inputs/2017/24.txt').toString();

const elements = input.split('\n').map(e => e.split('/').map(x => parseInt(x, 10)));

const resolve = (parts, port) => {
  let best = 0;
  parts.forEach((part, i) => {
    if (part[0] === port) {
      partsRemaining = [...parts];
      partsRemaining.splice(i, 1);
      best = Math.max(part[0] + part[1] + resolve(partsRemaining, part[1]), best);
    } else if (part[1] === port) {
      partsRemaining = [...parts];
      partsRemaining.splice(i, 1);
      best = Math.max(part[0] + part[1] + resolve(partsRemaining, part[0]), best);
    }
  });
  return best;
};

console.log(resolve(elements, 0));

const resolve2 = (parts, port, depth) => {
  let bestStrength = 0;
  let bestDepth = depth;
  parts.forEach((part, i) => {
    if (part[0] === port) {
      partsRemaining = [...parts];
      partsRemaining.splice(i, 1);
      [resultStrength, resultDepth] = resolve2(partsRemaining, part[1], depth + 1);
      if (resultDepth > bestDepth) {
        bestDepth = resultDepth;
        bestStrength = resultStrength + part[0] + part[1];
      } else if (resultDepth === bestDepth) {
        bestStrength = Math.max(bestStrength, resultStrength + part[0] + part[1]);
      }
    } else if (part[1] === port) {
      partsRemaining = [...parts];
      partsRemaining.splice(i, 1);
      [resultStrength, resultDepth] = resolve2(partsRemaining, part[0], depth + 1);
      if (resultDepth > bestDepth) {
        bestDepth = resultDepth;
        bestStrength = resultStrength + part[0] + part[1];
      } else if (resultDepth === bestDepth) {
        bestStrength = Math.max(bestStrength, resultStrength + part[0] + part[1]);
      }
    }
  });
  return [bestStrength, bestDepth];
};

console.log(resolve2(elements, 0, 1)[0]);
