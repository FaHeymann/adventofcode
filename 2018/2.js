const input = require('fs').readFileSync('inputs/2018/2.txt').toString();

let count = [0, 0];

const list = input.split('\n');

list.forEach(line => {
  const map = {};
  line.split('').forEach(c => {
    if (!map[c]) {
      map[c] = 0;
    }
    map[c]++;
  });
  count = [Object.values(map).includes(2) ? count[0] + 1 : count[0], Object.values(map).includes(3) ? count[1] + 1 : count[1]];
});

console.log(count[0] * count[1]);

for (let i = 0; i < list.length; i++) {
  for (let j = i + 1; j < list.length; j++) {
    let out = '';
    for (let k = 0; k < list[0].length; k++) {
      if (list[i].charAt(k) === list[j].charAt(k)) {
        out += list[i].charAt(k);
      }
    }
    if (out.length === list[0].length - 1) {
      console.log(out);
      process.exit(0);
    }
  }
}
