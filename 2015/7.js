const input = require('fs').readFileSync('inputs/2015/7.txt').toString();

const state = {};

input.split('\n').forEach(line => {
  if (line.match(/^([a-z0-9]+) -> ([a-z]+)$/)) {
    const [_, in1, out] = line.match(/^([a-z0-9]+) -> ([a-z]+)$/);
    state[out] = {
      resolve: () => {
        if (state[out].result) {
          return state[out].result;
        }
        const in1c = Number.isNaN(parseInt(in1, 10)) ? state[in1].resolve(): parseInt(in1, 10);
        state[out].result = in1c;
        return in1c;
      },
    };
  }

  if (line.match(/^([a-z0-9]+) AND ([a-z0-9]+) -> ([a-z]+)$/)) {
    const [_, in1, in2, out] = line.match(/^([a-z0-9]+) AND ([a-z0-9]+) -> ([a-z]+)$/);
    state[out] = {
      resolve: () => {
        if (!state[out].result) {
          const in1c = Number.isNaN(parseInt(in1, 10)) ? state[in1].resolve(): parseInt(in1, 10);
          const in2c = Number.isNaN(parseInt(in2, 10)) ? state[in2].resolve(): parseInt(in2, 10);
          state[out].result = in1c & in2c;
        }
        return state[out].result;
      },
    };
  }

  if (line.match(/^([a-z0-9]+) OR ([a-z0-9]+) -> ([a-z]+)$/)) {
    const [_, in1, in2, out] = line.match(/^([a-z0-9]+) OR ([a-z0-9]+) -> ([a-z]+)$/);
    state[out] = {
      resolve: () => {
        if (!state[out].result) {
          const in1c = Number.isNaN(parseInt(in1, 10)) ? state[in1].resolve(): parseInt(in1, 10);
          const in2c = Number.isNaN(parseInt(in2, 10)) ? state[in2].resolve(): parseInt(in2, 10);
          state[out].result = in1c | in2c;
        }
        return state[out].result;
      },
    };
  }

  if (line.match(/^([a-z0-9]+) LSHIFT ([a-z0-9]+) -> ([a-z]+)$/)) {
    const [_, in1, in2, out] = line.match(/^([a-z0-9]+) LSHIFT ([a-z0-9]+) -> ([a-z]+)$/);
    state[out] = {
      resolve: () => {
        if (!state[out].result) {
          const in1c = Number.isNaN(parseInt(in1, 10)) ? state[in1].resolve(): parseInt(in1, 10);
          const in2c = Number.isNaN(parseInt(in2, 10)) ? state[in2].resolve(): parseInt(in2, 10);
          state[out].result = (in1c << in2c) & 0b1111111111111111;
        }
        return state[out].result;
      },
    };
  }

  if (line.match(/^([a-z0-9]+) RSHIFT ([a-z0-9]+) -> ([a-z]+)$/)) {
    const [_, in1, in2, out] = line.match(/^([a-z0-9]+) RSHIFT ([a-z0-9]+) -> ([a-z]+)$/);
    state[out] = {
      resolve: () => {
        if (!state[out].result) {
          const in1c = Number.isNaN(parseInt(in1, 10)) ? state[in1].resolve(): parseInt(in1, 10);
          const in2c = Number.isNaN(parseInt(in2, 10)) ? state[in2].resolve(): parseInt(in2, 10);
          state[out].result = in1c >> in2c;
        }
        return state[out].result;
      },
    };
  }

  if (line.match(/^NOT ([a-z0-9]+) -> ([a-z]+)$/)) {
    const [_, in1, out] = line.match(/^NOT ([a-z0-9]+) -> ([a-z]+)$/);
    state[out] = {
      resolve: () => {
        if (!state[out].result) {
          const in1c = Number.isNaN(parseInt(in1, 10)) ? state[in1].resolve(): parseInt(in1, 10);
          state[out].result = (~ in1c) & 0b1111111111111111;
        }
        return state[out].result;
      },
    };
  }
});

const first = state['a'].resolve()
console.log(first);
Object.values(state).forEach(entry => {
  delete entry.result;
});
state['b'].result = first;
console.log(state['a'].resolve());
