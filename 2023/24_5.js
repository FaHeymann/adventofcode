const input = `19, 13, 30 @ -2,  1, -2
18, 19, 22 @ -1, -1, -2
20, 25, 34 @ -2, -2, -4
12, 31, 28 @ -1, -2, -1
20, 19, 15 @  1, -5, -3`

const [p1, p2, p3, ...particles] = input.split("\n").map((line) => {
  const [pos, vel] = line
    .split(" @ ")
    .map((a) => a.split(", ").map((n) => parseInt(n, 10)));
  const m = vel[1] / vel[0];
  const y0 = pos[1] - pos[0] * m;
  return { pos, vel, m, y0 };
});

let output = [];

[p1, p2, p3].forEach((particle, i) => {
  output.push(`${particle.pos[0]} + t_${i + 1} * ${particle.vel[0]} = p_x + t_${i + 1} * v_x`)
  output.push(`${particle.pos[1]} + t_${i + 1} * ${particle.vel[1]} = p_y + t_${i + 1} * v_y`)
  output.push(`${particle.pos[2]} + t_${i + 1} * ${particle.vel[2]} = p_z + t_${i + 1} * v_z`)
})

console.log(output.join('\n'))

// px_1 + t_1 * vx_1 = px_u + t_1 * vx_u
// py_1 + t_1 * vy_1 = py_u + t_1 * vy_u
// pz_1 + t_1 * vz_1 = pz_u + t_1 * vz_u

// px_2 + t_2 * vx_2 = px_u + t_2 * vx_u
// py_2 + t_2 * vy_2 = py_u + t_2 * vy_u
// pz_2 + t_2 * vz_2 = pz_u + t_2 * vz_u

