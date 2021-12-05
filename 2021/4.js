const parts = require("fs")
  .readFileSync("inputs/2021/4.txt")
  .toString()
  .split("\n\n");

const sequence = parts[0];
const boardsInput = parts
  .filter((p, i) => i !== 0)
  .map((b) =>
    b.split("\n").map((l) =>
      l
        .split(" ")
        .filter((c) => c !== "")
        .map((n) => parseInt(n, 10))
    )
  );

class Board {
  fields;
  marks;
  done;

  constructor(fields) {
    this.fields = fields;
    this.marks = [
      new Array(5).fill(false),
      new Array(5).fill(false),
      new Array(5).fill(false),
      new Array(5).fill(false),
      new Array(5).fill(false),
    ];
    this.done = false;
  }

  mark(number) {
    for (let y = 0; y < 5; y++) {
      for (let x = 0; x < 5; x++) {
        if (this.fields[y][x] === number) {
          this.marks[y][x] = true;
          return this.rowComplete(y) || this.columnComplete(x);
        }
      }
    }
    return false;
  }

  rowComplete(index) {
    return [...Array(5).keys()].reduce(
      (cur, i) => cur && this.marks[index][i],
      true
    );
  }

  columnComplete(index) {
    return [...Array(5).keys()].reduce(
      (cur, i) => cur && this.marks[i][index],
      true
    );
  }

  sumUnmarked() {
    return this.fields.reduce(
      (sum, cur, y) =>
        sum +
        cur.reduce(
          (innerSum, innerCur, x) =>
            innerSum + (!this.marks[y][x] ? innerCur : 0),
          0
        ),
      0
    );
  }

  toString() {
    return `fields:
${this.fields.map((l) => l.join(", ")).join("\n")}

marks:
${this.marks.map((l) => l.join(", ")).join("\n")}`;
  }
}

const boards = boardsInput.map((i) => new Board(i));
let first = true;

sequence
  .split(",")
  .map((n) => parseInt(n, 10))
  .forEach((n) => {
    boards.forEach((board) => {
      if (board.done) {
        return;
      }
      const result = board.mark(n);
      if (result) {
        if (first) {
          first = false;
          console.log(board.sumUnmarked() * n);
        }
        if (boards.filter((b) => !b.done).length === 1) {
          console.log(board.sumUnmarked() * n);
        }
        board.done = true;
      }
    });
  });
