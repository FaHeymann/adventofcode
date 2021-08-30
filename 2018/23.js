const input = require('fs').readFileSync('inputs/2018/23.txt').toString();

const bots = input.split('\n').map((line, id) => {
  const [_, x, y, z, r] = line.match(/pos=<([0-9-]+),([0-9-]+),([0-9-]+)>, r=([0-9-]+)/).map(a => parseInt(a, 10));
  return {x, y, z, r, id};
});

const inRange = (a, b) => Math.abs(a.x - b.x) + Math.abs(a.y - b.y) + Math.abs(a.z - b.z) <= a.r;

let maxR = 0;
let maxId;

bots.forEach(bot => {
  if (bot.r > maxR) {
    maxR = bot.r;
    maxId = bot.id;
  }
});

let count = 0;

bots.forEach(bot => {
  count += inRange(bots[maxId], bot) ? 1 : 0;
});

console.log(count);
