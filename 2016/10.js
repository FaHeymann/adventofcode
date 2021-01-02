const input = require('fs').readFileSync('inputs/2016/10.txt').toString();

const bots = {};
const output = {};

const initializeBot = (id) => {
  bots[id] = {
    storage: [],
    id,
  }
}

input.split('\n').forEach(line => {
  if (line.startsWith('value')) {
    const [_, value, botId] = line.match(/value ([0-9]+) goes to bot ([0-9]+)/).map(x => parseInt(x));
    if (!(botId in bots)) {
      initializeBot(botId);
    }
    bots[botId].storage.push(value);
  } else {
    const [_, botId, lowType, lowTarget, highType, highTarget] = line.match(/bot ([0-9]+) gives low to (.*) ([0-9]+) and high to (.*) ([0-9]+)/).map((x, i) => i === 1 ? parseInt(x) : x);
    if (!(botId in bots)) {
      initializeBot(botId);
    }

    bots[botId].step = (function () {
      if (this.storage.length !== 2) {
        return false;
      }

      if (Math.min(...this.storage) === 17 && Math.max(...this.storage) === 61) {
        console.log(this.id);
      }

      if (lowType === 'output') {
        if (!(lowTarget in output)) {
          output[lowTarget] = [];
        }
        output[lowTarget].push(Math.min(...this.storage));
      } else {
        bots[lowTarget].storage.push(Math.min(...this.storage));
      }

      if (highType === 'output') {
        if (!(highTarget in output)) {
          output[highTarget] = [];
        }
        output[highTarget].push(Math.max(...this.storage));
      } else {
        bots[highTarget].storage.push(Math.max(...this.storage));
      }
      this.storage = [];
      return true;
    }).bind(bots[botId]);
  }
});


while (Object.values(bots).some(b => b.step()));

console.log(output[0] * output[1] * output[2]);
