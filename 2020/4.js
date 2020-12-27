const input = require('fs').readFileSync('inputs/2020/4.txt').toString();;

const pps = input.split('\n\n');

const fields = {
  'byr': x => 1920 <= parseInt(x, 10) && parseInt(x, 10) <= 2002,
  'iyr': x => 2010 <= parseInt(x, 10) && parseInt(x, 10) <= 2020,
  'eyr': x => 2020 <= parseInt(x, 10) && parseInt(x, 10) <= 2030,
  'hgt': x => x.substr(-2) === 'cm'
    ? (150 <= parseInt(x.substr(0, x.length - 2), 10) && parseInt(x.substr(0, x.length - 2), 10) <= 193)
    : (x.substr(-2) === 'in' && 59 <= parseInt(x.substr(0, x.length - 2), 10) && parseInt(x.substr(0, x.length - 2), 10) <= 76),
  'hcl': x => /^#[0-9a-f]{6}$/.test(x),
  'ecl': x => ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(x),
  'pid': x => /^[0-9]{9}$/.test(x),
};

console.log(
  pps.reduce((count, pp) => Object.keys(fields).every(
    key => pp.split('\n').map(l => l.split(' ')).flat().some(
      feature => feature.split(':')[0] === key
    )
  ) ? count + 1 : count, 0)
);

console.log(
  pps.reduce((count, pp) => Object.entries(fields).every(
    ([key, test]) => pp.split('\n').map(l => l.split(' ')).flat().some(
      feature => feature.split(':')[0] === key && test(feature.split(':')[1])
    )
  ) ? count + 1 : count, 0)
);
