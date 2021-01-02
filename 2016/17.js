const crypto = require('crypto');

const static = 'pgflpeqp';

const getHash = path => crypto.createHash('md5').update(`${static}${path}`).digest("hex")

const todo = [{ path: '', y: 0, x: 0 }];

let shortestPath;
let maxLength = 0;

const step = () => {
  const state = todo.shift();

  if (state.y === 3 && state.x === 3) {
    if (!shortestPath) {
      shortestPath = state.path;
    }
    maxLength = Math.max(maxLength, state.path.length);
    return;
  }

  const doors = getHash(state.path);
  if (state.y < 3 && ['b', 'c', 'd', 'e', 'f'].includes(doors.charAt(1))) {
    todo.push({ path: state.path + 'D', y: state.y + 1, x: state.x });
  }
  if (state.x < 3 && ['b', 'c', 'd', 'e', 'f'].includes(doors.charAt(3))) {
    todo.push({ path: state.path + 'R', y: state.y, x: state.x + 1 });
  }
  if (state.y > 0 && ['b', 'c', 'd', 'e', 'f'].includes(doors.charAt(0))) {
    todo.push({ path: state.path + 'U', y: state.y - 1, x: state.x });
  }
  if (state.x > 0 && ['b', 'c', 'd', 'e', 'f'].includes(doors.charAt(2))) {
    todo.push({ path: state.path + 'L', y: state.y, x: state.x - 1 });
  }
}

while(todo.length > 0) {
  step();
}

console.log(shortestPath, maxLength);
