const input = require("fs").readFileSync("inputs/2021/20.txt").toString();

const [alg, pictureRaw] = input.split("\n\n");
const picture = pictureRaw.split("\n").map((line) => line.split(""));

let map = new Map();

const key = (y, x) => `${y}#${x}`;
const get = (y, x, i) => {
  if (map.has(key(y, x))) {
    return map.get(key(y, x));
  }
  return i % 2 === 0 ? false : true;
};

const getAsDigit = (y, x, i) => (get(y, x, i) ? "1" : "0");

picture.forEach((row, y) => {
  row.forEach((c, x) => {
    map.set(key(y, x), c === "#");
  });
});

for (let i = 0; i < 50; i++) {
  const newMap = new Map();
  for (let y = 0 - i - 1; y < picture.length + i + 1; y++) {
    for (let x = 0 - i - 1; x < picture[0].length + i + 1; x++) {
      const number = parseInt(
        [
          [-1, -1],
          [-1, 0],
          [-1, 1],
          [0, -1],
          [0, 0],
          [0, 1],
          [1, -1],
          [1, 0],
          [1, 1],
        ]
          .map(([yd, xd]) => getAsDigit(y + yd, x + xd, i))
          .join(""),
        2
      );
      newMap.set(key(y, x), alg.charAt(number) === "#");
    }
  }
  map = newMap;
  
  if (i === 1 || i === 49) {
    let count = 0;
    map.forEach((value) => {
      count += value ? 1 : 0;
    });

    console.log(count);
  }
}
