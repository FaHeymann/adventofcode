const program = require('fs').readFileSync('inputs/2019/17.txt').toString().split(',').map(x => parseInt(x, 10));
program[0] = 2;

const getInput = (index) => {
  const main = 'A,B,A,B,C,C,B,C,B,A\n'.split('').map(s => s.charCodeAt(0));
  const a = 'R,12,L,8,R,12\n'.split('').map(s => s.charCodeAt(0));
  const b = 'R,8,R,6,R,6,R,8\n'.split('').map(s => s.charCodeAt(0));
  const c = 'R,8,L,8,R,8,R,4,R,4\n'.split('').map(s => s.charCodeAt(0));
  const noVid = 'n\n'.split('').map(s => s.charCodeAt(0));
  const combined = main.concat(a, b, c, noVid);
  return index < combined.length ? combined[index] : 0;
};

const machine = require('./intcomp')(program, getInput);

const result = machine.runTillTermination();

console.log(result[result.length - 1]);

// const path = 'R12L8R12 R8R6R6R8 R12L8R12 R8R6R6R8 R8L8R8R4R4 R8L8R8R4R4 R8R6R6R8 R8L8R8R4R4 R8R6R6R8 R12L8R12';
// const path2 = '   A       B       A         B         C          C         B        C          B          A'

// const testGrid = [];

// for (let y = 0; y < 60; y++) {
//   testGrid[y] = [];
//   for (let x = 0; x < 50; x++) {
//     testGrid[y][x] = '.';
//   }
// }

// let y2 = 8;
// let x2 = 0;
// let dir = 'N';

// const dirMap = {
//   S: { L: 'E', R: 'W' },
//   N: { L: 'W', R: 'E' },
//   E: { L: 'N', R: 'S' },
//   W: { L: 'S', R: 'N' },
// }

// const move = () => {
//   if (dir === 'S') {
//     y2++;
//   } else if (dir === 'N') {
//     y2--;
//   } else if (dir === 'E') {
//     x2++;
//   } else if (dir === 'W') {
//     x2--;
//   }
//   testGrid[y2][x2] = '#';
// }

// path.split(' ').forEach(ins => {
//   if (['R', 'L'].includes(ins)) {
//     dir = dirMap[dir][ins];
//   } else {
//     for (let i = 0; i < parseInt(ins, 10); i++) {
//       move();
//     }
//   }
// });

// console.log(testGrid.map(l => l.join('')).join('\n'));
