const input = require('fs').readFileSync('inputs/2020/5.txt').toString();;

const decode = (pass, selectLow, range) => {
  pass.split('').forEach(char => {
    range = char === selectLow ? [range[0], Math.floor((range[0] + range[1]) / 2)] : [Math.ceil((range[0] + range[1]) / 2), range[1]];
  });
  return range[0];
};

console.log(input.split('\n').reduce((max, cur) => Math.max(max, 8 * decode(cur.substr(0, 7), 'F', [0, 127]) + decode(cur.substr(7), 'L', [0, 7])), 0));

const ids = input.split('\n').map(cur => 8 * decode(cur.substr(0, 7), 'F', [0, 127]) + decode(cur.substr(7), 'L', [0, 7]));

console.log([...Array(838).keys()].find(cur => !ids.includes(cur) && ids.includes(cur - 1) && ids.includes(cur + 1)));
