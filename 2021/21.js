const p1Start = 8;
const p2Start = 3

let dice = 0
let rolls = 0;

const rollDice = () => {
  dice %= 100;
  dice++;
  rolls++;
  return dice;
}

let pos = [p1Start, p2Start]
let score = [0, 0];

while (true) {
  pos[0] += rollDice() + rollDice() + rollDice();
  while (pos[0] > 10) {
    pos[0] -= 10;
  }
  score[0] += pos[0];
  if (score[0] >= 1000) {
    break;
  }

  pos[1] += rollDice() + rollDice() + rollDice();
  while (pos[1] > 10) {
    pos[1] -= 10;
  }
  score[1] += pos[1];
  if (score[1] >= 1000) {
    break;
  }
}

console.log(Math.min(...score) * rolls)

// Part 2

const key = (score1, score2, pos1, pos2, next) =>
  [score1, score2, pos1, pos2, next].join("#");

const map = new Map();
const queue = []

const start = key(0, 0, p1Start, p2Start, 1);
map.set(start, 1);
queue.push([0, 0, p1Start, p2Start, 1]);

let count1 = 0;
let count2 = 0;

const enqueue = (score1, score2, pos1, pos2, next, amount) => {
  if (score1 >= 21) {
    count1 += amount;
    return;
  }
  if (score2 >= 21) {
    count2 += amount;
    return;
  }
  const nextKey = key(score1, score2, pos1, pos2, next);
  if (map.has(nextKey)) {
    map.set(nextKey, map.get(nextKey) + amount);
  } else {
    map.set(nextKey, amount);
    queue.push([score1, score2, pos1, pos2, next]);
  }
};

const fanOut = [
  { val: 3, times: 1 },
  { val: 4, times: 3 },
  { val: 5, times: 6 },
  { val: 6, times: 7 },
  { val: 7, times: 6 },
  { val: 8, times: 3 },
  { val: 9, times: 1 },
];

step = () => {
  const cur = queue.shift();
  let [score1, score2, pos1, pos2, next] = cur;
  const amount = map.get(key(...cur));
  map.delete(key(...cur));

  if (next === 1) {
    fanOut.forEach(({ val, times }) => {
      curPos1 = pos1;
      curScore1 = score1;
      curPos1 += val;
      while (curPos1 > 10) {
        curPos1 -= 10;
      }
      curScore1 += curPos1;
      enqueue(curScore1, score2, curPos1, pos2, 2, amount * times);
    })
  } else {
    fanOut.forEach(({ val, times }) => {
      curPos2 = pos2;
      curScore2 = score2;
      curPos2 += val;
      while (curPos2 > 10) {
        curPos2 -= 10;
      }
      curScore2 += curPos2;
      enqueue(score1, curScore2, pos1, curPos2, 1, amount * times);
    })
  }
};

while (queue.length > 0) {
  step();
}

console.log(Math.max(count1, count2));
