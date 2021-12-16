const hex = require("fs").readFileSync("inputs/2021/16.txt").toString();

const bin = hex
  .split("")
  .map((h) => parseInt(h, 16).toString(2).padStart(4, "0"))
  .join("");

const nodes = [];

const operationsMap = {
  0: (values) => values.reduce((sum, cur) => sum + cur, 0),
  1: (values) => values.reduce((sum, cur) => sum * cur, 1),
  2: (values) => Math.min(...values),
  3: (values) => Math.max(...values),
  5: (values) => (values[0] > values[1] ? 1 : 0),
  6: (values) => (values[0] < values[1] ? 1 : 0),
  7: (values) => (values[0] === values[1] ? 1 : 0),
};

const parseLiteral = (input, node) => {
  let valueString = "";
  let seg;
  do {
    seg = input.substr(0, 5);
    input = input.substr(5);
    valueString += seg.substr(1);
  } while (seg.charAt(0) === "1");
  node.value = parseInt(valueString, 2);
  return input;
};

const parseType0 = (input, values) => {
  const length = parseInt(input.substr(0, 15), 2);
  input = input.substr(15);
  let children = input.substr(0, length);
  input = input.substr(length);
  while (children.length > 0) {
    const result = decodePackage(children);
    children = result[0];
    values.push(result[1]);
  }
  return input;
};

const parseType1 = (input, values) => {
  const childrenCount = parseInt(input.substr(0, 11), 2);
  input = input.substr(11);
  for (let i = 0; i < childrenCount; i++) {
    const result = decodePackage(input);
    input = result[0];
    values.push(result[1]);
  }
  return input;
};

const decodePackage = (input) => {
  if (input.length < 4) {
    return "";
  }

  const node = {
    version: parseInt(input.substr(0, 3), 2),
    type: parseInt(input.substr(3, 3), 2),
  };
  nodes.push(node);

  input = input.substr(6);

  if (node.type === 4) {
    input = parseLiteral(input, node);
    return [input, node.value];
  } else {
    node.lengthTypeId = parseInt(input.charAt(0), 2);
    input = input.substr(1);
    let values = [];
    if (node.lengthTypeId === 0) {
      input = parseType0(input, values);
    } else {
      input = parseType1(input, values);
    }
    node.value = operationsMap[node.type](values);
    return [input, node.value];
  }
};

decodePackage(bin);

console.log(nodes.reduce((sum, cur) => sum + cur.version, 0));
console.log(nodes[0].value);
