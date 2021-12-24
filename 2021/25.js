const input = require("fs").readFileSync("inputs/2021/25.txt").toString();
let grid = input.split("\n").map((line) => line.split(""));

const move = (char, dy, dx) => {
  const newGrid = [];
  let moved = false;
  grid.forEach((line, y) => {
    if (!newGrid[y]) {
      newGrid[y] = [];
    }
    line.forEach((c, x) => {
      if (newGrid[y][x]) {
        return;
      }
      if (c === char && grid[(y + dy) % grid.length][(x + dx) % grid[0].length] === ".") {
        moved = true
        newGrid[y][x] = ".";
        if (!newGrid[(y + dy) % grid.length]) {
          newGrid[(y + dy) % grid.length] = [];
        }
        newGrid[(y + dy) % grid.length][(x + dx) % grid[0].length] = char;
      } else {
        newGrid[y][x] = grid[y][x];
      }
    });
  });
  grid = newGrid;
  return moved;
};

const step = () => {
  const a = move(">", 0, 1);
  const b = move("v", 1, 0);
  return a || b;
};

let moved = true;
let i;

for (i = 0; moved; i++) {
  moved = step();
}

console.log(i);
