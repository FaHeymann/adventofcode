const input = require('fs').readFileSync('inputs/2018/7.txt').toString();

const requirements = {};

input.split('\n').forEach(line => {
  const [_, before, then] = line.match(/Step ([A-Z]) must be finished before step ([A-Z]) can begin/);
  if (!requirements[before]) {
    requirements[before] = [];
  }
  if (!requirements[then]) {
    requirements[then] = [];
  }
  requirements[then].push(before);
});

let todo = Object.keys(requirements).sort();
let done = [];

const isReady = c => requirements[c].every(r => done.includes(r));

while(todo.length > 0) {
  const next = todo.findIndex(t => isReady(t));
  done.push(todo[next]);
  todo.splice(next, 1);
}

console.log(done.join(''));

todo = Object.keys(requirements).sort();
done = [];

const workers = [
  { inProgress: null, doneAt: null, },
  { inProgress: null, doneAt: null, },
  { inProgress: null, doneAt: null, },
  { inProgress: null, doneAt: null, },
  { inProgress: null, doneAt: null, },
];

let i = 0;

while (done.length < Object.keys(requirements).length) {
  workers.forEach(w => {
    if (w.doneAt === i) {
      done.push(w.inProgress);
      w.inProgress = null;
      w.doneAt = null;
    }
  });
  workers.forEach(w => {
    if (w.inProgress === null) {
      const next = todo.findIndex(t => isReady(t));
      if (next > -1) {
        w.inProgress = todo[next];
        w.doneAt = i + todo[next].charCodeAt(0) - 64 + 60;
        todo.splice(next, 1);
      }
    }
  });
  i++;
}

console.log(i - 1);
