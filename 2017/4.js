const input = require('fs').readFileSync('inputs/2017/4.txt').toString();

console.log(input.split('\n').reduce((count, line) => line.split(' ').every((word, i, arr) => !arr.slice(i + 1).includes(word)) ? count + 1 : count, 0));
console.log(input.split('\n').reduce((count, line) => line.split(' ').map(word => word.split('').sort((a, b) => a.charCodeAt(0) - b.charCodeAt(0)).join('')).every((word, i, arr) => !arr.slice(i + 1).includes(word)) ? count + 1 : count, 0));
