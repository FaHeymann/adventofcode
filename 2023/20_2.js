const input = require("fs").readFileSync("inputs/2023/20.txt").toString();

const modules = {};

const moduleState = {};

const queue = [];

input.split("\n").forEach((line) => {
  const [rawModule, outputs] = line.split(" -> ");

  if (rawModule.startsWith("%")) {
    const name = rawModule.substring(1);
    moduleState[name] = "off";
    modules[name] = {
      type: "flipflop",
      outputs: outputs.split(", "),
      handle: (pulse, source) => {
        if (pulse === "HIGH") {
          return;
        }
        moduleState[name] = moduleState[name] === "off" ? "on" : "off";
        outputs.split(", ").forEach((output) => {
          queue.unshift([
            output,
            moduleState[name] === "on" ? "HIGH" : "LOW",
            name,
          ]);
        });
      },
    };
  } else if (rawModule.startsWith("&")) {
    const name = rawModule.substring(1);
    moduleState[name] = {};
    modules[name] = {
      type: "conjunction",
      outputs: outputs.split(", "),
      handle: (pulse, source) => {
        moduleState[name][source] = pulse;

        // console.log( Object.values(moduleState[name]))

        const sendLow = Object.values(moduleState[name]).every(
          (m) => m === "HIGH"
        );
        outputs.split(", ").forEach((output) => {
          queue.unshift([output, sendLow ? "LOW" : "HIGH", name]);
        });
      },
    };
  } else {
    modules[rawModule] = {
      type: "generic",
      outputs: outputs.split(", "),
      handle: (pulse, source) => {
        outputs.split(", ").forEach((output) => {
          queue.unshift([output, pulse, rawModule]);
        });
      },
    };
  }
});

Object.entries(modules).forEach(([name, module]) => {
  module.outputs.forEach((output) => {
    if (modules[output] && modules[output].type === "conjunction") {
      moduleState[output][name] = "LOW";
    }
  });
});

// console.log(moduleState);
// console.log(modules)

// let [lowCount, highCount] = [0, 0]

const step = () => {
  const signal = queue.pop();
  // if (signal[1] === 'LOW') {
  //   lowCount += 1
  // } else {
  //   highCount += 1
  // }

  if (signal[0] === "rx" && signal[1] === "LOW") {
    console.log(signal[1]);
  }

  if (modules[signal[0]]) {
    modules[signal[0]].handle(signal[1], signal[2]);
  }

  // console.log('')
  // console.log(moduleState)
  // // console.log(modules)
  // console.log(queue)
};

const pressButton = () => {
  queue.unshift(["broadcaster", "LOW", "_"]);
  while (queue.length > 0) {
    step();
  }
};

const element = 'jtcode '

let prevState;
for (let i = 1; i < 10000; i++) {
  prevState = JSON.parse(JSON.stringify(moduleState));
  pressButton();

  if (moduleState[element] !== prevState[element]) {
    console.log('Switched', i, 'now', moduleState[element])
  }

  // Object.entries(moduleState).forEach(([key, value]) => {
  //   // if (modules[key].type === 'conjunction') {
  //   //   console.log({ [key]: { cur: value, last: prevState[key] } });
  //   // }
  //   if (key === "lq") {
  //     console.log({ i, [key]: { cur: value, last: prevState[key] } });
  //   }
  // });
}

// console.log(lowCount * highCount)

// const mustBeHigh = Object.keys(moduleState["zq"])
//   .concat(Object.keys(moduleState["kx"]))
//   .concat(Object.keys(moduleState["zd"]))
//   .concat(Object.keys(moduleState["mt"]));

// console.log(mustBeHigh)

// [
//   'lq', 'lm', 'tl', 'js', 'ps',
//   'hl', 'jj', 'fx', 'vg', 'zn',
//   'rm', 'gc', 'xm', 'mp', 'hd',
//   'qt', 'tc', 'zb', 'cl', 'vj',
//   'qs', 'fs', 'ph', 'qc', 'cg',
//   'nr', 'gm', 'lz', 'hf', 'hb',
//   'sm', 'jt', 'gd'
// ]
