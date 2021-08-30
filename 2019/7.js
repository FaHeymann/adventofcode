const state = [3,8,1001,8,10,8,105,1,0,0,21,42,51,60,77,94,175,256,337,418,99999,3,9,1001,9,4,9,102,5,9,9,1001,9,3,9,102,5,9,9,4,9,99,3,9,102,2,9,9,4,9,99,3,9,1001,9,3,9,4,9,99,3,9,101,4,9,9,1002,9,4,9,101,5,9,9,4,9,99,3,9,1002,9,5,9,101,3,9,9,102,2,9,9,4,9,99,3,9,1001,9,1,9,4,9,3,9,1002,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,101,2,9,9,4,9,3,9,101,2,9,9,4,9,3,9,101,2,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,101,1,9,9,4,9,99,3,9,1001,9,2,9,4,9,3,9,101,1,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,101,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,1,9,4,9,3,9,101,1,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,1002,9,2,9,4,9,99,3,9,101,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,101,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,101,2,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,101,2,9,9,4,9,99,3,9,101,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,1,9,4,9,3,9,101,1,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,1002,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,1,9,9,4,9,3,9,102,2,9,9,4,9,3,9,101,2,9,9,4,9,99,3,9,1001,9,2,9,4,9,3,9,101,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,2,9,9,4,9,3,9,101,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,1,9,9,4,9,99];
// const state = [3,52,1001,52,-5,52,3,53,1,52,56,54,1007,54,5,55,1005,55,26,1001,54,-5,54,1105,1,12,1,53,54,53,1008,54,0,55,1001,55,1,55,2,53,55,53,4,53,1001,56,-1,56,1005,56,6,99,0,0,0,0,10];

const permutator = (inputArr) => {
  let result = [];

  const permute = (arr, m = []) => {
    if (arr.length === 0) {
      result.push(m)
    } else {
      for (let i = 0; i < arr.length; i++) {
        let curr = arr.slice();
        let next = curr.splice(i, 1);
        permute(curr.slice(), m.concat(next))
     }
   }
 }

 permute(inputArr)

 return result;
}

const computer = (initialState, getInput) => {
  const state = [...initialState];
  let inputIndex = 0;
  let output = [];
  let head = 0;
  let terminated = false;
  let outputted = false

  const step = () => {
    outputted = false;
    const opcode = state[head] % 100;
    const parameterMode1 = state[head] >= 100 ? parseInt(String(state[head]).charAt(String(state[head]).length - 3), 10) : 0;
    const parameterMode2 = state[head] >= 1000 ? parseInt(String(state[head]).charAt(String(state[head]).length - 4), 10) : 0;
    // const parameterMode3 = state[head] >= 10000 ? parseInt(String(state[head]).charAt(String(state[head]).length - 5), 10) : 0;

    if (Number.isNaN(opcode)) {
      console.log('Error');
      process.exit(1);
    }

    const par1 = parameterMode1 === 0 ? state[state[head + 1]] : state[head + 1];
    const par2 = parameterMode2 === 0 ? state[state[head + 2]] : state[head + 2];
    // const par3 = parameterMode2 === 0 ? state[state[head + 3]] : state[head + 3];

    if (state[head] === 99) {
      terminated = true;
      return;
    }
    if (opcode === 1) { // addition
      state[state[head + 3]] = par1 + par2;
      head += 4;
    } else if (opcode === 2) { // multiplication
      state[state[head + 3]] = par1 * par2;
      head += 4;
    } else if (opcode === 3) { // input
      state[state[head + 1]] = getInput(inputIndex++);
      head += 2;
    } else if (opcode === 4) { // output
      // console.log(state[state[head + 1]]);
      output = output.concat(par1);
      head += 2;
      outputted = true;
    } else if (opcode === 5) { // jump if true
      head = par1 === 0 ? head + 3 : par2;
    } else if (opcode === 6) { // jump if false
      head = par1 === 0 ? par2: head + 3;
    } else if (opcode === 7) { // less than
      state[state[head + 3]] = par1 < par2 ? 1 : 0;
      head += 4;
    } else if (opcode === 8) { // equals
      state[state[head + 3]] = par1 === par2 ? 1 : 0;
      head += 4;
    }
  }

  return {
    runTillOutput: () => {
      outputted = false;
      while(!outputted) {
        if (terminated) {
          return output.concat('TERM');
        }
        step();
      }
      return output;
    },
    runTillTermination: () => {
      while(!terminated) {
        step();
      }
      return output;
    }
  }
};

console.log(permutator([5,6,7,8,9]).reduce((max, sequence) => {
  let outA = [];
  let outB = [];
  let outC = [];
  let outD = [];
  let outE = [];

  const a = computer(state, (i) => i === 0 ? sequence[0] : (i === 1 ? 0 : outE[outE.length - 1]));
  const b = computer(state, (i) => i === 0 ? sequence[1] : outA[outA.length - 1]);
  const c = computer(state, (i) => i === 0 ? sequence[2] : outB[outB.length - 1]);
  const d = computer(state, (i) => i === 0 ? sequence[3] : outC[outC.length - 1]);
  const e = computer(state, (i) => i === 0 ? sequence[4] : outD[outD.length - 1]);

  while(outA[outA.length - 1] !== 'TERM') {
    outA = a.runTillOutput();
    outB = b.runTillOutput();
    outC = c.runTillOutput();
    outD = d.runTillOutput();
    outE = e.runTillOutput();
  }

  return Math.max(max, outE[outE.length - 2]);
}, 0));
