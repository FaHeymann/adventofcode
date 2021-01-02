const input = require('fs').readFileSync('inputs/2016/21.txt').toString();

let str = 'abcdefgh';

const rotateRightOnce = str => str.charAt(str.length - 1) + str.substr(0, str.length - 1);

input.split('\n').forEach(line => {
  if (line.startsWith('swap position')) {
    const [_, pos1, pos2] = line.match(/swap position ([0-9]+) with position ([0-9]+)/).map(x => parseInt(x, 10));
    let next = str.split('');
    next[pos1] = str.charAt(pos2);
    next[pos2] = str.charAt(pos1);
    str = next.join('');
  } else if (line.startsWith('swap letter')) {
    const [_, let1, let2] = line.match(/swap letter ([a-z]) with letter ([a-z])/);
    let next = str.split('');
    next[str.indexOf(let1)] = let2;
    next[str.indexOf(let2)] = let1;
    str = next.join('');
  } else if (line.startsWith('reverse positions')) {
    const [_, pos1, pos2] = line.match(/reverse positions ([0-9]+) through ([0-9]+)/).map(x => parseInt(x, 10));
    str = str.substr(0, pos1) + str.substr(pos1, (pos2 - pos1) + 1).split('').reverse().join('') + str.substr(pos2 + 1);
  } else if (line.startsWith('rotate left')) {
    const [_, pos1] = line.match(/rotate left ([0-9]+) step/).map(x => parseInt(x, 10));
    str = str.substr(pos1) + str.substr(0, pos1);
  } else if (line.startsWith('rotate right')) {
    const [_, pos1] = line.match(/rotate right ([0-9]+) step/).map(x => parseInt(x, 10));
    str = str.substr(str.length - pos1) + str.substr(0, str.length - pos1);
  } else if (line.startsWith('move')) {
    const [_, pos1, pos2] = line.match(/move position ([0-9]+) to position ([0-9]+)/).map(x => parseInt(x, 10));
    const next = str.split('');
    next.splice(pos1, 1);
    next.splice(pos2, 0, str.charAt(pos1));
    str = next.join('');
  } else if (line.startsWith('rotate based')) {
    const [_, let1] = line.match(/rotate based on position of letter ([a-z])/);
    let times = 1 + str.indexOf(let1) + (str.indexOf(let1) > 3 ? 1 : 0);
    for (let i = 0; i < times; i++) {
      str = rotateRightOnce(str);
    }
  }
});

console.log(str);

str = 'fbgdceah';

const rotateLeftOnce = str => str = str.substr(1) + str.substr(0, 1);

const rotateRightTimes = (str, times) => {
  for (let i = 0; i < times; i++) {
    str = rotateRightOnce(str);
  }
  return str;
}

input.split('\n').reverse().forEach(line => {
  if (line.startsWith('swap position')) {
    const [_, pos1, pos2] = line.match(/swap position ([0-9]+) with position ([0-9]+)/).map(x => parseInt(x, 10));
    let next = str.split('');
    next[pos1] = str.charAt(pos2);
    next[pos2] = str.charAt(pos1);
    str = next.join('');
  } else if (line.startsWith('swap letter')) {
    const [_, let1, let2] = line.match(/swap letter ([a-z]) with letter ([a-z])/);
    let next = str.split('');
    next[str.indexOf(let1)] = let2;
    next[str.indexOf(let2)] = let1;
    str = next.join('');
  } else if (line.startsWith('reverse positions')) {
    const [_, pos1, pos2] = line.match(/reverse positions ([0-9]+) through ([0-9]+)/).map(x => parseInt(x, 10));
    str = str.substr(0, pos1) + str.substr(pos1, (pos2 - pos1) + 1).split('').reverse().join('') + str.substr(pos2 + 1);
  } else if (line.startsWith('rotate left')) {
    const [_, pos1] = line.match(/rotate left ([0-9]+) step/).map(x => parseInt(x, 10));
    str = str.substr(str.length - pos1) + str.substr(0, str.length - pos1);
  } else if (line.startsWith('rotate right')) {
    const [_, pos1] = line.match(/rotate right ([0-9]+) step/).map(x => parseInt(x, 10));
    str = str.substr(pos1) + str.substr(0, pos1);
  } else if (line.startsWith('move')) {
    const [_, pos1, pos2] = line.match(/move position ([0-9]+) to position ([0-9]+)/).map(x => parseInt(x, 10));
    const next = str.split('');
    next.splice(pos2, 1);
    next.splice(pos1, 0, str.charAt(pos2));
    str = next.join('');
  } else if (line.startsWith('rotate based')) {
    const [_, let1] = line.match(/rotate based on position of letter ([a-z])/);
    const reference = str;

    let times = 1 + str.indexOf(let1) + (str.indexOf(let1) > 3 ? 1 : 0);

    while (rotateRightTimes(str, times) !== reference) {
      str = rotateLeftOnce(str);
      times = 1 + str.indexOf(let1) + (str.indexOf(let1) > 3 ? 1 : 0);
    }
  }
});

console.log(str);
