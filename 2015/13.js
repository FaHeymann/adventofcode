const input = require('fs').readFileSync('inputs/2015/13.txt').toString();

const persons = {};

input.split('\n').forEach(line => {
  const [_, p1, op, val, p2] = line.match(/^([A-Za-z]+) would ([gain|lose]+) ([0-9]+) happiness units by sitting next to ([A-Za-z]+)\.$/);

  if (!persons[p1]) {
    persons[p1] = {rels: {}};
  }

  if (!persons[p2]) {
    persons[p2] = {rels: {}};
  }

  if (!persons[p1].rels[p2]) {
    persons[p1].rels[p2] = 0;
  }

  if (!persons[p2].rels[p1]) {
    persons[p2].rels[p1] = 0;
  }

  persons[p1].rels[p2] += op === 'gain' ? parseInt(val, 10) : parseInt(val, 10) * -1;
  persons[p2].rels[p1] += op === 'gain' ? parseInt(val, 10) : parseInt(val, 10) * -1;
});

const permutator = (inputArr) => { // by far not all permutations are necessary, but this what easiest for a small instance like this
  let result = [];

  const permute = (arr, m = []) => {
    if (arr.length === 0) {
      result.push(m);
    } else {
      for (let i = 0; i < arr.length; i++) {
        let curr = arr.slice();
        let next = curr.splice(i, 1);
        permute(curr.slice(), m.concat(next));
     }
   }
 }

 permute(inputArr)
 return result;
}

console.log(permutator(Object.keys(persons)).reduce((max, per) => Math.max(max, per.reduce((sum, cur, i, arr) => i === 0 ? sum + persons[cur].rels[arr[arr.length - 1]] : sum + persons[cur].rels[arr[i - 1]], 0)), 0));

persons['Me'] = {rels: {}};

Object.entries(persons).forEach(([key, value]) => {
  value.rels['Me'] = 0;
  persons['Me'].rels[key] = 0;
});

console.log(permutator(Object.keys(persons)).reduce((max, per) => Math.max(max, per.reduce((sum, cur, i, arr) => i === 0 ? sum + persons[cur].rels[arr[arr.length - 1]] : sum + persons[cur].rels[arr[i - 1]], 0)), 0));
