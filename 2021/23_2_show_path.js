const winning = "...........AAAAxxxxxxBBBBxxxxxxCCCCxxxxxxDDDD";
const start =
  "..........." +
  "BDDC" +
  "xxxxxx" +
  "CCBD" +
  "xxxxxx" +
  "ABAD" +
  "xxxxxx" +
  "BACA";

const print = (state) => `----------------------------------
#############
#${state.substr(0, 11)}#
###${state.charAt(11)}#${state.charAt(21)}#${state.charAt(31)}#${state.charAt(
  41
)}###
  #${state.charAt(12)}#${state.charAt(22)}#${state.charAt(32)}#${state.charAt(
  42
)}#
  #${state.charAt(13)}#${state.charAt(23)}#${state.charAt(33)}#${state.charAt(
  43
)}#
  #${state.charAt(14)}#${state.charAt(24)}#${state.charAt(34)}#${state.charAt(
  44
)}#
  #########`;

const scoreMap = {
  A: 1,
  B: 10,
  C: 100,
  D: 1000,
};

const typeBase = {
  A: 10,
  B: 20,
  C: 30,
  D: 40,
};

const pocketIsReady = (type, state) => {
  return [1, 2, 3, 4]
    .map((n) => n + typeBase[type])
    .every((n) => [type, "."].includes(state.charAt(n)));
};

const isDone = (index, state) => {
  return (
    index > 10 &&
    pocketIsReady(state.charAt(index), state) &&
    typeBase[state.charAt(index)] === Math.floor(index / 10) * 10
  );
};

const getPath = (i1, i2) => {
  const start = i1;
  const result = [];
  if (i1 > 10) {
    while (i1 % 10 !== 0) {
      result.push(i1);
      i1--;
    }
    i1 = (i1 / 10) * 2;
  }
  if (i2 > 10) {
    while (i2 % 10 !== 0) {
      result.push(i2);
      i2--;
    }
    i2 = (i2 / 10) * 2;
  }

  for (let i = Math.min(i1, i2); i <= Math.max(i1, i2); i++) {
    result.push(i);
  }
  return result.filter((n) => n !== start);
};

const findPocketPosition = (type, state) => {
  return [4, 3, 2, 1]
    .map((n) => n + typeBase[type])
    .find((n) => state.charAt(n) === ".");
};

const isReachable = (path, state) => {
  return path.every((n) => state.charAt(n) === ".");
};

const queue = [];
let minEnergy = Number.POSITIVE_INFINITY;

const visited = new Map();

const step = () => {
  const { state, score, history } = queue.shift();

  if (visited.has(state) && visited.get(state) <= score) {
    return;
  }

  visited.set(state, score);

  if (state === winning) {
    minEnergy = Math.min(score, minEnergy);
    history.forEach(h => console.log(print(h)))
  }

  const result = state.split("").some((type, i) => {
    if (!["A", "B", "C", "D"].includes(type)) {
      return false;
    }

    if (isDone(i, state)) {
      return false;
    }

    if (pocketIsReady(type, state)) {
      const path = getPath(i, findPocketPosition(type, state));
      if (isReachable(path, state)) {
        const newState = state
          .split("")
          .map((c, j) =>
            i === j ? "." : j === findPocketPosition(type, state) ? type : c
          )
          .join("");
        queue.push({
          state: newState,
          score: path.length * scoreMap[type] + score,
          history: [...history, state],
        });
        return true;
      }
    }
  });

  if (result) {
    return;
  }

  state.split("").forEach((type, i) => {
    if (!["A", "B", "C", "D"].includes(type)) {
      return;
    }

    if (i <= 10 || isDone(i, state)) {
      return;
    }

    [0, 1, 3, 5, 7, 9, 10].forEach((target) => {
      const path = getPath(i, target);
      if (isReachable(path, state)) {
        const newState = state
          .split("")
          .map((c, j) => (i === j ? "." : j === target ? type : c))
          .join("");
        queue.push({
          state: newState,
          score: path.length * scoreMap[type] + score,
          history: [...history, state],
        });
      }
    });
  });
};

queue.push({
  state: start,
  score: 0,
  history: [],
});

while (queue.length > 0) {
  step();
}

console.log(minEnergy);
