const constraintsInput = `departure location: 33-430 or 456-967
departure station: 42-864 or 875-957
departure platform: 42-805 or 821-968
departure track: 34-74 or 93-967
departure date: 40-399 or 417-955
departure time: 30-774 or 797-950
arrival location: 50-487 or 507-954
arrival station: 34-693 or 718-956
arrival platform: 42-729 or 751-959
arrival track: 28-340 or 349-968
class: 49-524 or 543-951
duration: 40-372 or 397-951
price: 48-922 or 939-951
route: 33-642 or 666-960
row: 39-238 or 255-973
seat: 48-148 or 161-973
train: 50-604 or 630-971
type: 29-299 or 316-952
wagon: 45-898 or 921-966
zone: 34-188 or 212-959`;

const my = '137,173,167,139,73,67,61,179,103,113,163,71,97,101,109,59,131,127,107,53';

const tickets = require('fs').readFileSync('inputs/2020/16.txt').toString();

const constraints = constraintsInput.split('\n').map(line => {
  const ranges = line.split(': ')[1].split(' or ').map(r => r.split('-').map(x => parseInt(x, 10)));
  return {
    name: line.split(': ')[0],
    isValid: (input) => (input >= ranges[0][0] && input <= ranges[0][1]) || (input >= ranges[1][0] && input <= ranges[1][1]),
    possibleIndices: [...Array(20).keys()]
  };
});

let validTickets = [];

console.log(tickets.split('\n').reduce((count, line) => {
  let invalids = 0;
  line.split(',').map(x => parseInt(x, 10)).forEach(x => {
    if (!constraints.some(constraint => constraint.isValid(x))) {
      invalids += x;
    }
  });
  if (invalids === 0) {
    validTickets.push(line.split(',').map(x => parseInt(x, 10)));
  }
  return count + invalids;
}, 0));

validTickets.push(my.split(',').map(x => parseInt(x, 10)));

validTickets.forEach(ticket => {
  ticket.forEach((x, i) => {
    constraints.forEach((constraint) => {
      if (!constraint.isValid(x)) {
        const index = constraint.possibleIndices.indexOf(i);
        if (index > -1) {
           constraint.possibleIndices.splice(index, 1);
        }
      }
    });
  });
});

let result = 1;

for (let i = 0; i < constraints.length; i++) {
  let number;
  for (let j = 0; j < constraints.length; j++) {
    if (constraints[j].possibleIndices.length === 1) {
      number = constraints[j].possibleIndices[0];
      if (constraints[j].name.startsWith('departure')) {
        result *= parseInt(my.split(',')[number], 10);
      }
      break;
    }
  }

  for (let j = 0; j < constraints.length; j++) {
    const index = constraints[j].possibleIndices.indexOf(number);
    if (index > -1) {
      constraints[j].possibleIndices.splice(index, 1);
    }
  }
}
console.log(result);
