const input = require("fs").readFileSync("inputs/2022/11.txt").toString();

const run = (secondStar) => {
  const monkeys = [];

  input.split("\n\n").forEach((rawMonkey) => {
    const lines = rawMonkey.split("\n");
    const monkey = {};

    monkey.items = lines[1]
      .split(": ")[1]
      .split(", ")
      .map((x) => parseInt(x, 10));

    const operands = lines[2].split(": ")[1].split(" ");
    monkey.op = (old) => {
      const arg = operands[4] === "old" ? old : parseInt(operands[4], 10);
      if (operands[3] === "+") {
        return old + arg;
      }
      return old * arg;
    };

    monkey.divisor = parseInt(lines[3].split(" ").at(-1), 10);
    monkey.ifTrue = parseInt(lines[4].split(" ").at(-1), 10);
    monkey.ifFalse = parseInt(lines[5].split(" ").at(-1), 10);

    monkey.inspectCount = 0;

    monkeys.push(monkey);
  });

  const modulo = monkeys.map(m => m.divisor).reduce((cur, next) => cur * next, 1)

  const tick = () => {
    monkeys.forEach((monkey, monkeyIndex) => {
      monkey.items.forEach((item) => {
        let value = monkey.op(item);
        if (secondStar) {
          value = value % modulo;
        } else {
          value = Math.floor(value / 3)
        }

        if (value % monkey.divisor === 0) {
          monkeys[monkey.ifTrue].items.push(value);
        } else {
          monkeys[monkey.ifFalse].items.push(value);
        }
        monkey.inspectCount = monkey.inspectCount + 1;
      });

      monkey.items = [];
    });
  };

  for (let i = 0; i < (secondStar ? 10000 : 20); i++) {
    tick();
  }

  const counts = monkeys.map((m) => m.inspectCount).sort((a, b) => b - a);
  console.log(counts[0] * counts[1]);
};

run(false);
run(true);
