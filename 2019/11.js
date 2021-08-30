const program = [3,8,1005,8,324,1106,0,11,0,0,0,104,1,104,0,3,8,102,-1,8,10,101,1,10,10,4,10,1008,8,0,10,4,10,1002,8,1,29,2,1102,17,10,3,8,102,-1,8,10,1001,10,1,10,4,10,1008,8,1,10,4,10,102,1,8,55,2,4,6,10,1,1006,10,10,1,6,14,10,3,8,1002,8,-1,10,101,1,10,10,4,10,1008,8,1,10,4,10,101,0,8,89,3,8,102,-1,8,10,1001,10,1,10,4,10,108,0,8,10,4,10,1002,8,1,110,1,104,8,10,3,8,1002,8,-1,10,1001,10,1,10,4,10,1008,8,1,10,4,10,102,1,8,137,2,9,17,10,2,1101,14,10,3,8,102,-1,8,10,101,1,10,10,4,10,1008,8,0,10,4,10,101,0,8,167,1,107,6,10,1,104,6,10,2,1106,6,10,3,8,1002,8,-1,10,101,1,10,10,4,10,108,1,8,10,4,10,1001,8,0,200,1006,0,52,1006,0,70,1006,0,52,3,8,102,-1,8,10,101,1,10,10,4,10,1008,8,1,10,4,10,1002,8,1,232,1006,0,26,1,104,19,10,3,8,102,-1,8,10,1001,10,1,10,4,10,108,0,8,10,4,10,102,1,8,260,1,2,15,10,2,1102,14,10,3,8,1002,8,-1,10,1001,10,1,10,4,10,108,0,8,10,4,10,1001,8,0,290,1,108,11,10,1006,0,36,1006,0,90,1006,0,52,101,1,9,9,1007,9,940,10,1005,10,15,99,109,646,104,0,104,1,21101,0,666412360596,1,21101,341,0,0,1105,1,445,21101,838366659476,0,1,21102,1,352,0,1106,0,445,3,10,104,0,104,1,3,10,104,0,104,0,3,10,104,0,104,1,3,10,104,0,104,1,3,10,104,0,104,0,3,10,104,0,104,1,21101,0,97713695975,1,21102,1,399,0,1106,0,445,21102,179469028392,1,1,21101,410,0,0,1105,1,445,3,10,104,0,104,0,3,10,104,0,104,0,21102,1,988220650260,1,21101,433,0,0,1105,1,445,21101,0,838345843560,1,21101,444,0,0,1106,0,445,99,109,2,22101,0,-1,1,21102,1,40,2,21102,1,476,3,21101,466,0,0,1106,0,509,109,-2,2105,1,0,0,1,0,0,1,109,2,3,10,204,-1,1001,471,472,487,4,0,1001,471,1,471,108,4,471,10,1006,10,503,1101,0,0,471,109,-2,2106,0,0,0,109,4,1202,-1,1,508,1207,-3,0,10,1006,10,526,21101,0,0,-3,22101,0,-3,1,22102,1,-2,2,21102,1,1,3,21101,0,545,0,1106,0,550,109,-4,2105,1,0,109,5,1207,-3,1,10,1006,10,573,2207,-4,-2,10,1006,10,573,21201,-4,0,-4,1106,0,641,21201,-4,0,1,21201,-3,-1,2,21202,-2,2,3,21102,592,1,0,1106,0,550,21201,1,0,-4,21101,0,1,-1,2207,-4,-2,10,1006,10,611,21101,0,0,-1,22202,-2,-1,-2,2107,0,-3,10,1006,10,633,22102,1,-1,1,21102,1,633,0,106,0,508,21202,-2,-1,-2,22201,-4,-2,-4,109,-5,2105,1,0];

const computer = (initialState, getInput) => {
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
    }
  }
};

let output;
const map = {0: { 0: 1 }};

let x = 0;
let y = 0;
let dir = 'U';

const getColor = () => map[y] ? map[y][x] : 0 || 0;
let input = getColor();

const paint = (color) => {
  if (!map[y]) {
    map[y] = {};
  }
  map[y][x] = color;
  input = getColor();
}

const moveMap = {
  U: {0: 'L', 1: 'R'},
  R: {0: 'U', 1: 'D'},
  D: {0: 'R', 1: 'L'},
  L: {0: 'D', 1: 'U'},
}

const move = (rotation) => {
  dir = moveMap[dir][rotation];
  if (dir === 'U') {
    y += 1;
  } else if (dir === 'R') {
    x += 1;
  } else if (dir === 'D') {
    y -= 1;
  } else if (dir === 'L') {
    x -= 1;
  }
  input = getColor();
}

const robot = computer(program, () => input);

for (let i = 0; i < 100000; i++) {
  const color = robot.runTillOutput();
  if (color === 'TERM') {
    // console.log(Object.values(map).reduce((sum, cur) => sum + Object.keys(cur).length, 0));
    for (let i = 0; i >= -5; i--) {
      let line = '';
      for (let j = 0; j <= 42; j++) {
        line += map[i][j] === 1 ? '#' : ' ';
      }
      console.log(line);
    }
    // Object.values(map).forEach(row => {
    //   console.log(Object.values(row).join(''));
    // })
    process.exit(0);
  }
  // console.log(color);
  paint(color);
  const rotation = robot.runTillOutput();
  // console.log(rotation);
  move(rotation);

  // console.log(x, y, dir);
  // console.log(map);
}
