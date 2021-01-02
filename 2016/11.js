let queue = [{
  e: 0,
  steps: 0,
  floors: [
    { gens: ['polonium', 'promethium', 'thulium', 'ruthenium', 'cobalt'], chips: ['thulium', 'ruthenium', 'cobalt'] },
    { gens: [], chips: ['polonium', 'promethium'] },
    { gens: [], chips: [] },
    { gens: [], chips: [] },
  ],
}];

let visited = new Set();

const serialize = state => {
  const map = {};
  state.floors.forEach((floor, i) => {
    floor.chips.forEach(chip => {
      map[chip] = [i];
    });
  });
  state.floors.forEach((floor, i) => {
    floor.gens.forEach(gen => {
      map[gen].push(i);
    });
  });
  return `${state.e}|${Object.values(map).map(e => `${e[0]},${e[1]}`).sort().join(';')}`;
}

const clone = state => JSON.parse(JSON.stringify(state));

const isSafe = state => !state.floors.some(floor => floor.chips.some(chip => floor.gens.length > 0 && !floor.gens.includes(chip)));

const enqueueIfSafe = state => {
  if (isSafe(state)) {
    queue.push(state);
  }
}

const step = () => {
  const state = queue.shift();

  if (visited.has(serialize(state))) {
    return false;
  }

  visited.add(serialize(state));

  if (
    state.floors[0].gens.length === 0
    && state.floors[0].chips.length === 0
    && state.floors[1].gens.length === 0
    && state.floors[1].chips.length === 0
    && state.floors[2].gens.length === 0
    && state.floors[2].chips.length === 0
  ) {
    console.log(state.steps);
    return true;
  }

  const floor = state.e;

  state.floors[floor].gens.forEach((gen, i) => {
    // one gen up
    if (floor < 3) {
      const next = clone(state);
      next.e++;
      next.steps++;
      next.floors[floor].gens.splice(i, 1);
      next.floors[floor + 1].gens.push(gen);
      enqueueIfSafe(next);
    }
    // one gen down
    if (floor > 0) {
      const next = clone(state);
      next.e--;
      next.steps++;
      next.floors[floor].gens.splice(i, 1);
      next.floors[floor - 1].gens.push(gen);
      enqueueIfSafe(next);
    }
    // two gens up
    if (floor < 3) {
      state.floors[floor].gens.forEach((gen2, j) => {
        if (j <= i) {
          return;
        }
        const next = clone(state);
        next.e++;
        next.steps++;
        next.floors[floor].gens.splice(j, 1);
        next.floors[floor].gens.splice(i, 1);
        next.floors[floor + 1].gens.push(gen);
        next.floors[floor + 1].gens.push(gen2);
        enqueueIfSafe(next);
      });
    }
  });

  state.floors[floor].chips.forEach((chip, i) => {
    // one chip up
    if (floor < 3) {
      const next = clone(state);
      next.e++;
      next.steps++;
      next.floors[floor].chips.splice(i, 1);
      next.floors[floor + 1].chips.push(chip);
      enqueueIfSafe(next);
    }
    // one chip down
    if (floor > 0) {
      const next = clone(state);
      next.e--;
      next.steps++;
      next.floors[floor].chips.splice(i, 1);
      next.floors[floor - 1].chips.push(chip);
      enqueueIfSafe(next);
    }
    // gen + chip up
    if (floor < 3 && state.floors[floor].gens.includes(chip)) {
      const next = clone(state);
      next.e++;
      next.steps++;
      next.floors[floor].chips.splice(i, 1);
      next.floors[floor].gens.splice(next.floors[floor].gens.indexOf(chip), 1);
      next.floors[floor + 1].chips.push(chip);
      next.floors[floor + 1].gens.push(chip);
      enqueueIfSafe(next);
    }
    // two chips up
    if (floor < 3) {
      state.floors[floor].chips.forEach((chip2, j) => {
        if (j <= i) {
          return;
        }
        const next = clone(state);
        next.e++;
        next.steps++;
        next.floors[floor].chips.splice(j, 1);
        next.floors[floor].chips.splice(i, 1);
        next.floors[floor + 1].chips.push(chip);
        next.floors[floor + 1].chips.push(chip2);
        enqueueIfSafe(next);
      });
    }
  });
  return false;
}

while (!step());

const initial = { // star2
  e: 0,
  steps: 0,
  floors: [
    { gens: ['polonium', 'promethium', 'thulium', 'ruthenium', 'cobalt', 'elerium', 'dilithium'], chips: ['thulium', 'ruthenium', 'cobalt', 'elerium', 'dilithium'] },
    { gens: [], chips: ['polonium', 'promethium'] },
    { gens: [], chips: [] },
    { gens: [], chips: [] },
  ],
};

queue = [{
  e: 0,
  steps: 0,
  floors: [
    { gens: ['polonium', 'promethium', 'thulium', 'ruthenium', 'cobalt', 'elerium', 'dilithium'], chips: ['thulium', 'ruthenium', 'cobalt', 'elerium', 'dilithium'] },
    { gens: [], chips: ['polonium', 'promethium'] },
    { gens: [], chips: [] },
    { gens: [], chips: [] },
  ],
}];

visited = new Set();

while (!step());
