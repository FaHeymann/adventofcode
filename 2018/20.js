const input = require('fs').readFileSync('inputs/2018/20.txt').toString();

const extractParenthesis = (string) => {
  let level = 1;
  let out = '';
  let remainder = '';
  for (let i = 1; i < string.length; i++) {
    if (string.charAt(i) === ')' && level === 1) {
      remainder = string.substr(i + 1)
      break;
    }
    if (string.charAt(i) === '(') {
      level++;
    }
    if (string.charAt(i) === ')') {
      level--;
    }
    out += string.charAt(i);
  }
  return [out, remainder];
}

const split = (string) => {
  let level = 0;
  let out = [];
  let cur = '';
  for (let i = 0; i < string.length; i++) {
    if (string.charAt(i) === '|' && level === 0) {
      out.push(cur);
      cur = '';
      continue;
    }
    if (string.charAt(i) === '(') {
      level++;
    }
    if (string.charAt(i) === ')') {
      level--;
    }
    cur += string.charAt(i);
  }
  out.push(cur);
  return out;
}

const nodes = ['0#0'];
const edges = { '0#0': [] };

let doneTraversing = new Set();

const traverse = (path, x, y) => {
  if (doneTraversing.has(`${path}#${x}#${y}`)) {
    return;
  }
  doneTraversing.add(`${path}#${x}#${y}`);

  const previous = `${y}#${x}`;
  if (path === '') {
    return;
  }

  if (path.charAt(0) === '(') {
    const [parensContent, remainder] = extractParenthesis(path);
    split(parensContent).forEach(option => {
      traverse(option + remainder, x, y);
    });
    return;
  }

  if (path.charAt(0) === 'N') {
    y++;
  } else if (path.charAt(0) === 'S') {
    y--;
  } else if (path.charAt(0) === 'W') {
    x--;
  } else if (path.charAt(0) === 'E') {
    x++;
  }

  const next = `${y}#${x}`;

  if (!nodes.includes(next)) {
    nodes.push(next);
    edges[next] = [];
  }

  edges[previous].push(next);
  edges[next].push(previous);
  traverse(path.substr(1), x, y);
}

traverse(input.substring(1, input.length - 1), 0, 0);

const shortestPaths = { '0#0': 0 };

const queue = [{ node: '0#0', distance: 0 }];
while (queue.length > 0) {
  const cur = queue.pop();
  edges[cur.node].some(next => {
    if (!(next in shortestPaths) || shortestPaths[next] > cur.distance + 1) {
      shortestPaths[next] = cur.distance + 1;
      queue.unshift({ node: next, distance: cur.distance + 1 });
    }
  });
}

let max = 0;
let count = 0;

nodes.forEach(n => {
  max = Math.max(max, shortestPaths[n]);
  if (shortestPaths[n] >= 1000) {
    count++;
  }
});

console.log(max, count);
