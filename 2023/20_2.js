const input = require("fs").readFileSync("inputs/2023/20.txt").toString();

// const step = () => {
//   const signal = queue.pop();

//   if (signal[0] === "rx" && signal[1] === "LOW") {
//     console.log(signal[1]);
//   }

//   if (modules[signal[0]]) {
//     modules[signal[0]].handle(signal[1], signal[2]);
//   }
// };

// const pressButton = () => {
//   queue.unshift(["broadcaster", "LOW", "_"]);
//   while (queue.length > 0) {
//     step();
//   }
// };

const findCycleLength = (module) => {
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

  const detections = [];
  let i = 1

  const step = () => {
    const signal = queue.pop();

    if (signal[0] === module && signal[1] === "LOW") {
      detections.push(i)
    }

    if (modules[signal[0]]) {
      modules[signal[0]].handle(signal[1], signal[2]);
    }
  };

  const pressButton = () => {
    queue.unshift(["broadcaster", "LOW", "_"]);
    while (queue.length > 0) {
      step();
    }
    i++
  };

  while(detections.length < 2) {
    pressButton();
  }
  console.log(detections, detections[1] - detections[0])
  return detections[0]
};

const lcm = (a, b) => {
  let runner = Math.min(a, b);
  while (runner % Math.max(a, b) !== 0) {
    runner += Math.min(a, b);
  }
  return runner;
}

const c1 = findCycleLength('qz')
const c2 = findCycleLength('cq')
const c3 = findCycleLength('tt')
const c4 = findCycleLength('jx')

console.log(lcm(lcm(c1, c2), lcm(c3, c4)))
