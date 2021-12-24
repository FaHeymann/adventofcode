const vars = [0, 0, 0, 0];
const map = { w: 0, x: 1, y: 2, z: 3 };

resolve = (inp) => {
  if (["w", "x", "y", "z"].includes(inp)) {
    return vars[map[inp]];
  }
  return parseInt(inp, 10);
};

// const input = `inp w
// add z w
// mod z 2
// div w 2
// add y w
// mod y 2
// div w 2
// add x w
// mod x 2
// div w 2
// mod w 2`;

const input = require("fs").readFileSync("inputs/2021/24.txt").toString();

let i = 0;
const getParam = () => {
  // return parseInt("13579246899999".charAt(i++), 10)
  // return parseInt("12345678912345".charAt(i++), 10)
  // return parseInt("99999999999999".charAt(i++), 10)
  return parseInt("99999795919456".charAt(i++), 10)
}

input.split("\n").forEach((line, nr) => {
  const [op, ...params] = line.split(" ");
  if (op === "inp") {
    vars[map[params[0]]] = getParam()
  }
  if (op === "add") {
    vars[map[params[0]]] = resolve(params[0]) + resolve(params[1]);
  }
  if (op === "mul") {
    vars[map[params[0]]] = resolve(params[0]) * resolve(params[1]);
  }
  if (op === "div") {
    const temp = resolve(params[0]) / resolve(params[1]);
    vars[map[params[0]]] = temp >= 0 ? Math.floor(temp) : Math.ceil(temp);
  }
  if (op === "mod") {
    vars[map[params[0]]] = resolve(params[0]) % resolve(params[1]);
  }
  if (op === "eql") {
    vars[map[params[0]]] = resolve(params[0]) === resolve(params[1]) ? 1 : 0;
  }

  console.log(nr + 1, vars)
});

vars 
