const input = `#############
#...........#
###B#C#A#B###
  #C#D#D#A#
  #########`;

const moves = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 4],
  [4, 5],
  [5, 6],
  [6, 7],
  [7, 8],
  [8, 9],
  [9, 10],
  [2, 11],
  [11, 12],
  [4, 13],
  [13, 14],
  [6, 15],
  [15, 16],
  [8, 17],
  [17, 18],
];

const winning = "...........AABBCCDD";
const start = "...........BCCDADBA";

let state = start;
let score = 0;

const scoreMap = {
  A: 1,
  B: 10,
  C: 100,
  D: 1000,
};

const print = state => `----------------------------------
#############
#${state.substr(0, 11)}#
###${state.charAt(11)}#${state.charAt(13)}#${state.charAt(15)}#${state.charAt(17)}###
  #${state.charAt(12)}#${state.charAt(14)}#${state.charAt(16)}#${state.charAt(18)}#
  #########`

const move = (i1, i2) => {
  if (!moves.find(([j1, j2]) => (j1 === i1 && j2 === i2) || (j1 === i2 && j2 === i1))) {
    throw new Error("Invalid move")
  }

  if (
    ["A", "B", "C", "D"].includes(state.charAt(i1)) &&
    state.charAt(i2) === "."
  ) {
    const piece = state[i1];
    state = state
      .split("")
      .map((c, i) => (i === i1 ? "." : i === i2 ? piece : c))
      .join("");
    score += scoreMap[piece];
  } else if (
    ["A", "B", "C", "D"].includes(state.charAt(i2)) &&
    state.charAt(i1) === "."
  ) {
    const piece = state[i2];
    state = state
      .split("")
      .map((c, i) => (i === i2 ? "." : i === i1 ? piece : c))
      .join("");
    score += scoreMap[piece];
  } else {
    console.log(state.charAt(i1), state.charAt(i2))
    throw new Error("Invalid move (2)")
  }
  console.log(`${print(state)} (${score})`);
};

console.log(print(state));

move(15, 6)
move(6, 5)
move(5, 4)
move(4, 3)
move(3, 2)
move(2, 1)

move(17, 8)
move(8, 7)
move(7, 6)
move(6, 5)
move(5, 4)
move(4, 3)

move(18, 17)
move(17, 8)
move(8, 9)

move(16, 15)
move(15, 6)
move(6, 7)
move(7, 8)
move(8, 17)
move(17, 18)

move(13, 4)
move(4,5)
move(5,6)
move(6,15)
move(15,16)


move(14, 13)
move(13, 4)
move(4,5)
move(5,6)
move(6,7)
move(7,8)
move(8,17)

move(3, 4)
move(4, 13)
move(13, 14)

move(11, 2)
move(2, 3)
move(3, 4)
move(4, 13)

move(12, 11)
move(11, 2)
move(2, 3)
move(3, 4)
move(4, 5)
move(5, 6)
move(6, 15)

move(9, 8)
move(8, 7)
move(7, 6)
move(6, 5)
move(5, 4)
move(4, 3)
move(3, 2)
move(2, 11)
move(11, 12)

move(1, 2)
move(2, 11)