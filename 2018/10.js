const input = require('fs').readFileSync('inputs/2018/10.txt').toString();

let points = input.split('\n').map(line => {
  const [_, posX, posY, velX, velY] = line.match(/position=<([\s0-9-]+),([\s0-9-]+)> velocity=<([\s0-9-]+),([\s0-9-]+)>/).map(x => parseInt(x ,10));
  return { posX, posY, velX, velY };
});

const draw = () => {
  if (Math.abs(Math.min(...points.map(p => p.posY)) - Math.max(...points.map(p => p.posY))) > 10) {
    return false;
  }
  for (let y = Math.min(...points.map(p => p.posY)); y <= Math.max(...points.map(p => p.posY)); y++) {
    let line = '';
    for (let x = Math.min(...points.map(p => p.posX)); x <= Math.max(...points.map(p => p.posX)); x++) {
      line += points.find(p => p.posY === y && p.posX === x) ? '#' : ' ';
    }
    console.log(line);
  }
  return true;
}

const step = () => {
  points = points.map(p => ({
    posY: p.posY + p.velY,
    posX: p.posX + p.velX,
    velY: p.velY,
    velX: p.velX,
  }));
}

draw();

for (let i = 0; i < 100000; i++) {
  step();
  if (draw()) {
    console.log(i + 1);
  }
}
