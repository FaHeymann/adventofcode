// const input = `#############
// #...........#
// ###B#C#B#D###
//   #A#D#C#A#
//   #########`;

const input = `#############
#...........#
###B#C#A#B###
  #C#D#D#A#
  #########`

const key = (y, x) => `${y}#${x}`

const init = {
  positions: {},
  pieces: [],
  score: 0,
}

input.split("\n").forEach((line, y) => {
  line.split("").forEach((c, x) => {
    if (["A", "B", "C", "D"].includes(c)) {
      init.positions[key(y, x)] = false;
      init.pieces.push({ y, x, type: c })
    }
    if (c === ".") {
      init.positions[key(y, x)] = true;
    }
  });
});

const id = state => {
  let str = "";
  Object.entries(state.positions).forEach(([key, value]) => {
    if (value) {
      str += "."
    } else {
      const [y, x] = key.split("#").map(n => parseInt(n, 10));
      // console.log(y, x)
      str += state.pieces.find(p => p.y === y && p.x === x).type;
    }
  });
  return str;
}

const scoreMap = {
  A: 1,
  B: 10,
  C: 100,
  D: 1000,
}

const slotMap = {
  A: 3,
  B: 5,
  C: 7,
  D: 9,
}

// console.log(init);
// console.log(id(init))

const visited = new Map()

const queue = [init];
console.log(id(init))

const enqueue = (cur, i, dy, dx) => {
  const piece = cur.pieces[i];
  if ((key(piece.y + dy, piece.x + dx) in cur.positions) && cur.positions[key(piece.y + dy, piece.x + dx)]) {
    if (dy === 1 && piece.x !== slotMap[piece.type]) {
      return;
    }
    if (dy === 1 && piece.y === 1 && ![null, undefined, piece.type].includes(cur.pieces.find(p => p.y === 3 && p.x === piece.x)?.type)) {
      return;
    }

    if (dy === -1 && piece.x === slotMap[piece.type] && piece.y === 3) {
      return;
    }
    if (dy === -1 && piece.x === slotMap[piece.type] && piece.y === 2 && cur.pieces.find(p => p.y === 3 && p.x === piece.x)?.type === piece.type) {
      return;
    }

    const nextState = JSON.parse(JSON.stringify(cur));
    nextState.pieces[i].y = piece.y + dy;
    nextState.pieces[i].x = piece.x + dx;
    nextState.positions[key(piece.y, piece.x)] = true;
    nextState.positions[key(piece.y + dy, piece.x + dx)] = false;
    nextState.score = cur.score + scoreMap[piece.type];

    if (visited.has(id(nextState)) && visited.get(id(nextState)) <= nextState.score) {
      return;
    }
    visited.set(id(nextState), nextState.score)
    queue.push(nextState)
  }
}

// console.log(queue)
// console.log("-----------")

const winning = '...........ABCDABCD';

let scores = [];

for (let i = 0; queue.length > 0; i++) {
  const cur = queue.shift();
  console.log(id(cur))
  if (id(cur) === winning) {
    console.log(cur.score);
    scores.push(cur.score)
    continue;
  }
  cur.pieces.forEach((_, i) => {
    enqueue(cur, i, -1, 0);
    enqueue(cur, i, 1, 0);
    enqueue(cur, i, 0, -1);
    enqueue(cur, i, 0, 1);
  })
}

console.log(scores)
console.log(Math.min(...scores))

// console.log(JSON.stringify(queue, null, 2))
// console.log(visited);
