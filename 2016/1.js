const input = `R5, L2, L1, R1, R3, R3, L3, R3, R4, L2, R4, L4, R4, R3, L2, L1, L1, R2, R4, R4, L4, R3, L2, R1, L4, R1, R3, L5, L4, L5, R3, L3, L1, L1, R4, R2, R2, L1, L4, R191, R5, L2, R46, R3, L1, R74, L2, R2, R187, R3, R4, R1, L4, L4, L2, R4, L5, R4, R3, L2, L1, R3, R3, R3, R1, R1, L4, R4, R1, R5, R2, R1, R3, L4, L2, L2, R1, L3, R1, R3, L5, L3, R5, R3, R4, L1, R3, R2, R1, R2, L4, L1, L1, R3, L3, R4, L2, L4, L5, L5, L4, R2, R5, L4, R4, L2, R3, L4, L3, L5, R5, L4, L2, R3, R5, R5, L1, L4, R3, L1, R2, L5, L1, R4, L1, R5, R1, L4, L4, L4, R4, R3, L5, R1, L3, R4, R3, L2, L1, R1, R2, R2, R2, L1, L1, L2, L5, L3, L1`;

let y = 0;
let x = 0;
let dir = 'U';

const dirMap = {
  R: {
    U: 'R',
    R: 'D',
    D: 'L',
    L: 'U',
  },
  L: {
    U: 'L',
    R: 'U',
    D: 'R',
    L: 'D',
  }
}

input.split(', ').forEach(instr => {
  dir = dirMap[instr.substr(0, 1)][dir];
  if (dir === 'U') {
    y += parseInt(instr.substr(1), 10);
  } else if (dir === 'R') {
    x += parseInt(instr.substr(1), 10);
  } else if (dir === 'D') {
    y -= parseInt(instr.substr(1), 10);
  } else if (dir === 'L') {
    x -= parseInt(instr.substr(1), 10);
  }
});

console.log(Math.abs(x) + Math.abs(y));

y = 0;
x = 0;
dir = 'U';

const visited = [];

const step = (change, dist) => {
  for (let i = 0; i < parseInt(dist, 10); i++) {
    change();
    if (visited.includes(`${y}#${x}`)) {
      return true;
    }
    visited.push(`${y}#${x}`);
  }
  return false;
}

input.split(', ').some(instr => {
  dir = dirMap[instr.substr(0, 1)][dir];
  if (dir === 'U') {
    return step(() => { y++; }, instr.substr(1));
  } else if (dir === 'R') {
    return step(() => { x++; }, instr.substr(1));
  } else if (dir === 'D') {
    return step(() => { y--; }, instr.substr(1));
  } else if (dir === 'L') {
    return step(() => { x--; }, instr.substr(1));
  }
});

console.log(Math.abs(x) + Math.abs(y));
