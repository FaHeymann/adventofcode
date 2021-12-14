const input = require("fs").readFileSync("inputs/2021/14.txt").toString();
const [start, rulesRaw] = input.split("\n\n");

const rules = rulesRaw
  .split("\n")
  .map((line) => line.split(" -> "))
  .reduce((obj, [key, value]) => ({ [key]: value, ...obj }), {});

let pairs = Object.keys(rules).reduce((obj, key) => ({ [key]: 0, ...obj }), {});

for (let i = 0; i < start.length - 1; i++) {
  pairs[`${start.charAt(i)}${start.charAt(i + 1)}`]++;
}

const step = () => {
  const next = Object.keys(pairs).reduce(
    (obj, key) => ({ [key]: 0, ...obj }),
    {}
  );
  Object.entries(pairs).forEach(([key, value]) => {
    next[`${key.charAt(0)}${rules[key]}`] += value;
    next[`${rules[key]}${key.charAt(1)}`] += value;
  });

  pairs = next;
};

const toElements = (pairs) => {
  const elements = Object.keys(pairs).reduce(
    (obj, key) => ({ [key.charAt(0)]: 0, [key.charAt(1)]: 0, ...obj }),
    {}
  );
  Object.entries(pairs).forEach(([key, value]) => {
    elements[key.charAt(0)] += value;
    elements[key.charAt(1)] += value;
  });
  Object.entries(elements).forEach(([key, value]) => {
    elements[key] = Math.ceil(value / 2);
  });
  return elements;
};

for (let i = 0; i < 10; i++) {
  step();
}

let elements = toElements(pairs);
console.log(
  Math.max(...Object.values(elements)) - Math.min(...Object.values(elements))
);

for (let i = 0; i < 30; i++) {
  step();
}

elements = toElements(pairs);
console.log(
  Math.max(...Object.values(elements)) - Math.min(...Object.values(elements))
);
