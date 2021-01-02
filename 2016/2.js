const input = require('fs').readFileSync('inputs/2016/2.txt').toString();

let pos = '5';

const map = {
  1: {D: '4', R: '2'},
  2: {L: '1', D: '5', R: '3'},
  3: {L: '2', D: '6',},
  4: {U: '1', D: '7', R: '5'},
  5: {D: '8', R: '6', U: '2', L: '4'},
  6: {U: '3', D: '9', L: '5'},
  7: {U: '4', R: '8'},
  8: {L: '7', U: '5', R: '9'},
  9: {L: '8', U: '6'},
}

let out = '';

input.split('\n').forEach(line => {
  line.split('').forEach(c => {
    pos = map[pos][c] ? map[pos][c] : pos;
  });
  out += pos;
});

console.log(out);

const map2 = {
  1: {D: '3'},
  2: {D: '6', R: '3'},
  3: {L: '2', R: '4', U: '1', D: '7'},
  4: {L: '3', D: '8',},
  5: {R: '6'},
  6: {U: '2', D: 'A', L: '5', R: '7'},
  7: {U: '3', D: 'B', L: '6', R: '8'},
  8: {U: '4', D: 'C', L: '7', R: '9'},
  9: {L: '8'},
  A: {U: '6', R: 'B'},
  B: {U: '7', D: 'D', L: 'A', R: 'C'},
  C: {L: 'B', U: '8'},
  D: {U: 'B'},
}

pos = '5';
out = '';

input.split('\n').forEach(line => {
  line.split('').forEach(c => {
    pos = map2[pos][c] ? map2[pos][c] : pos;
  });
  out += pos;
});

console.log(out);

