const moves = `>>><<><>><<<>><>>><<<>>><<<><<<>><>><<>>`;
// const moves = require("fs").readFileSync("inputs/2022/17.txt").toString();


let moveIndex = 0;
const getNextMove = () => {
  const move = moves[moveIndex];
  moveIndex++;
  moveIndex %= moves.length;
  return move;
};

const rocks = [
  (maxHeight) => [
    [maxHeight + 4, 2],
    [maxHeight + 4, 3],
    [maxHeight + 4, 4],
    [maxHeight + 4, 5],
  ], // hor. line
  (maxHeight) => [
    [maxHeight + 4, 3],
    [maxHeight + 5, 2],
    [maxHeight + 5, 3],
    [maxHeight + 5, 4],
    [maxHeight + 6, 3],
  ], // plus
  (maxHeight) => [
    [maxHeight + 4, 2],
    [maxHeight + 4, 3],
    [maxHeight + 4, 4],
    [maxHeight + 5, 4],
    [maxHeight + 6, 4],
  ], // l
  (maxHeight) => [
    [maxHeight + 4, 2],
    [maxHeight + 5, 2],
    [maxHeight + 6, 2],
    [maxHeight + 7, 2],
  ], // vert. line
  (maxHeight) => [
    [maxHeight + 4, 2],
    [maxHeight + 4, 3],
    [maxHeight + 5, 2],
    [maxHeight + 5, 3],
  ], // block
];

let rockIndex = 0;
const positionNextRock = (maxHeight) => {
  const rock = rocks[rockIndex](maxHeight);
  rockIndex++;
  rockIndex %= rocks.length;
  return rock;
};

let maxHeight = 0;
const occupied = new Set;
const isOccupied = (y, x) => {
  if (x < 0 || x > 6 || y <= 0) {
    return true
  }
  return occupied.has(`${y}#${x}`)
}

const horizontalMove = (rock) => {
  const move = getNextMove()
  const add = move === '<' ? -1 : 1;

  for (let i = 0; i < rock.length; i++) {
    const point = rock[i];
    if (isOccupied(point[0], point[1] + add)) {
      return
    }
  }
  for (let i = 0; i < rock.length; i++) {
    rock[i][1] = rock[i][1] + add
  }
}

const fall = (rock) => {
  for (let i = 0; i < rock.length; i++) {
    const point = rock[i];
    if (isOccupied(point[0] - 1, point[1])) {
      return true
    }
  }
  for (let i = 0; i < rock.length; i++) {
    rock[i][0] = rock[i][0] - 1
  }
  return false
}

for (let i = 0; i < 10000000; i++) {
  const rock = positionNextRock(maxHeight)
  let done = false
  // console.log('new rock')
  while(!done) {
    horizontalMove(rock)
    done = fall(rock)
  }
  rock.forEach(p => {
    occupied.add(`${p[0]}#${p[1]}`)
    maxHeight = Math.max(maxHeight, p[0])
  })

  console.log(moveIndex)

  // if (moveIndex === 0 && rockIndex === 0) {
  //   console.log(maxHeight)
  // }

  // console.log(maxHeight)
}
