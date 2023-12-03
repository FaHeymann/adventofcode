const { init } = require("z3-solver");

const input = require("fs").readFileSync("inputs/2023/24.txt").toString();

const [p1, p2, p3, ..._] = input.split("\n").map((line) => {
  const [pos, vel] = line
    .split(" @ ")
    .map((a) => a.split(", ").map((n) => parseInt(n, 10)));
  const m = vel[1] / vel[0];
  const y0 = pos[1] - pos[0] * m;
  return { pos, vel, m, y0 };
});

async function execute() {
  const { Context } = await init();
  const Z3 = Context("main");

  const px = Z3.Int.const("px");
  const py = Z3.Int.const("py");
  const pz = Z3.Int.const("pz");

  const vx = Z3.Int.const("vx");
  const vy = Z3.Int.const("vy");
  const vz = Z3.Int.const("vz");

  const t1 = Z3.Int.const("t1");
  const t2 = Z3.Int.const("t2");
  const t3 = Z3.Int.const("t3");

  const equations = [];

  equations.push(
    px.add(t1.mul(vx)).eq(t1.mul(p1.vel[0]).add(p1.pos[0]))
  );
  equations.push(
    py.add(t1.mul(vy)).eq(t1.mul(p1.vel[1]).add(p1.pos[1]))
  );
  equations.push(
    pz.add(t1.mul(vz)).eq(t1.mul(p1.vel[2]).add(p1.pos[2]))
  );

  equations.push(
    px.add(t2.mul(vx)).eq(t2.mul(p2.vel[0]).add(p2.pos[0]))
  );
  equations.push(
    py.add(t2.mul(vy)).eq(t2.mul(p2.vel[1]).add(p2.pos[1]))
  );
  equations.push(
    pz.add(t2.mul(vz)).eq(t2.mul(p2.vel[2]).add(p2.pos[2]))
  );

  equations.push(
    px.add(t3.mul(vx)).eq(t3.mul(p3.vel[0]).add(p3.pos[0]))
  );
  equations.push(
    py.add(t3.mul(vy)).eq(t3.mul(p3.vel[1]).add(p3.pos[1]))
  );
  equations.push(
    pz.add(t3.mul(vz)).eq(t3.mul(p3.vel[2]).add(p3.pos[2]))
  );

  const model = await Z3.solve(...equations);

  const x = parseInt(model.eval(px).toString(), 10)
  const y = parseInt(model.eval(py).toString(), 10)
  const z = parseInt(model.eval(pz).toString(), 10)

  console.log(x + y + z)

  process.exit(0)
}

execute();
