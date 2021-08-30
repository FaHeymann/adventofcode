module.exports = (initialState, getInput) => {
  const state = [...initialState];
  let inputIndex = 0;
  let output = [];
  let head = 0;
  let terminated = false;
  let outputted = false;
  let relativeBase = 0;

  const step = () => {
    outputted = false;
    const opcode = state[head] % 100;
    const parameterMode1 = state[head] >= 100 ? parseInt(String(state[head]).charAt(String(state[head]).length - 3), 10) : 0;
    const parameterMode2 = state[head] >= 1000 ? parseInt(String(state[head]).charAt(String(state[head]).length - 4), 10) : 0;
    const parameterMode3 = state[head] >= 10000 ? parseInt(String(state[head]).charAt(String(state[head]).length - 5), 10) : 0;

    if (Number.isNaN(opcode)) {
      console.log('Error');
      process.exit(1);
    }

    let par1 = parameterMode1 === 0 ? state[state[head + 1]] : (parameterMode1 === 2 ? state[relativeBase + state[head + 1]] : state[head + 1]);
    let par2 = parameterMode2 === 0 ? state[state[head + 2]] : (parameterMode2 === 2 ? state[relativeBase + state[head + 2]] : state[head + 2]);

    if (par1 === undefined) {
      par1 = 0;
    }

    if (par2 === undefined) {
      par2 = 0;
    }

    if (state[head] === 99) {
      terminated = true;
      return;
    }
    if (opcode === 1) { // addition
      if (parameterMode3 === 0) {
        state[state[head + 3]] = par1 + par2;
      } else {
        state[relativeBase + state[head + 3]] = par1 + par2;
      }
      head += 4;
    } else if (opcode === 2) { // multiplication
      if (parameterMode3 === 0) {
        state[state[head + 3]] = par1 * par2;
      } else {
        state[relativeBase + state[head + 3]] = par1 * par2;
      }
      head += 4;
    } else if (opcode === 3) { // input
      if (parameterMode1 === 0) {
        state[state[head + 1]] = getInput(inputIndex++);
      } else {
        state[relativeBase + state[head + 1]] = getInput(inputIndex++);
      }
      head += 2;
    } else if (opcode === 4) { // output
      output = output.concat(par1);
      head += 2;
      outputted = true;
    } else if (opcode === 5) { // jump if true
      head = par1 === 0 ? head + 3 : par2;
    } else if (opcode === 6) { // jump if false
      head = par1 === 0 ? par2: head + 3;
    } else if (opcode === 7) { // less than
      if (parameterMode3 === 0) {
        state[state[head + 3]] = par1 < par2 ? 1 : 0;
      } else {
        state[relativeBase + state[head + 3]] = par1 < par2 ? 1 : 0;
      }
      head += 4;
    } else if (opcode === 8) { // equals
      if (parameterMode3 === 0) {
        state[state[head + 3]] = par1 === par2 ? 1 : 0;
      } else {
        state[relativeBase + state[head + 3]] = par1 === par2 ? 1 : 0;
      }
      head += 4;
    } else if (opcode === 9) { // change relative base
      relativeBase += par1;
      head += 2;
    }
  }

  return {
    runTillOutput: () => {
      outputted = false;
      while(!outputted) {
        if (terminated) {
          return 'TERM';
        }
        step();
      }
      return output[output.length - 1];
    },
    runTillTermination: () => {
      while(!terminated) {
        step();
      }
      return output;
    },
    tick: () => {
      step();
      return output;
    },
  }
};
