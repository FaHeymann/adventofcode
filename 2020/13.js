const input = '29,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,41,x,x,x,x,x,x,x,x,x,601,x,x,x,x,x,x,x,23,x,x,x,x,13,x,x,x,17,x,19,x,x,x,x,x,x,x,x,x,x,x,463,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,37';

const star1 = () => {
  const start = 1002460;
  const busses = input.split(',').filter(x => x !== 'x').map(x => parseInt(x, 10));

  for (let i = start; true; i++) {
    if (busses.some(bus => {
      if (i % bus === 0) {
        console.log(bus * (i - start));
        return true;
      }
    })) {
      break;
    }
  }
}

star1();

const busses = input.split(',').map((c, i) => c === 'x' ? null : [parseInt(c, 10), i]).filter(b => b !== null);

const lcm = (a, b) => {
  let runner = Math.min(a, b);
  while (runner % Math.max(a, b) !== 0) {
    runner += Math.min(a, b);
  }
  return runner;
}

let period = busses[0][0];

let periodRegister = {};
const addedPeriod = {};
addedPeriod[busses[0][0]] = true;

for (let i = 0; true; i += period) {
  if (busses.every(bus => (i + bus[1]) % bus[0] === 0)) {
    console.log(i);
    break;
  }
  busses.forEach(bus => {
    if (!addedPeriod[bus[0]] && (i + bus[1]) % bus[0] === 0) {
      if (!periodRegister[bus[0]]) {
        periodRegister[bus[0]] = i;
      } else {
        period = lcm(period, (i - periodRegister[bus[0]]));
        periodRegister = {};
        addedPeriod[bus[0]] = true;
      }
    }
  });
}
