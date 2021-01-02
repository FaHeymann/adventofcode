const input = require('fs').readFileSync('inputs/2017/9.txt').toString();

let garbageCount = 0;

const resolve = (str, score) => {
  let scoreOut = score;
  let garbageMode = false;
  let cancelNext = false;
  for (let i = 0; i < str.length; i++) {
    if (i === 0) {
      continue;
    }
    if (!garbageMode) {
      if (str.charAt(i) === '<') {
        garbageMode = true;
        continue;
      }
      if (str.charAt(i) === '}') {
        return [scoreOut, i];
      }
      if (str.charAt(i) === '{') {
        const [subScore, subLength] = resolve(str.slice(i), score + 1);
        scoreOut += subScore;
        i += subLength;
      }
    } else { // garbageMode
      if (cancelNext) {
        cancelNext = false;
      } else if (str.charAt(i) === '!') {
        cancelNext = true;
      } else if (str.charAt(i) === '>') {
        garbageMode = false;
      } else {
        garbageCount++;
      }
    }
  }
}

console.log(resolve(input, 1)[0]);
console.log(garbageCount);
