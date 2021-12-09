const input = require("fs")
  .readFileSync("inputs/2021/8.txt")
  .toString()
  .split("\n");

const arrayDiff = (longer, shorter) => longer.find((x) => !shorter.includes(x));

const toDigit = {
  abcefg: 0,
  cf: 1,
  acdeg: 2,
  acdfg: 3,
  bcdf: 4,
  abdfg: 5,
  abdefg: 6,
  acf: 7,
  abcdefg: 8,
  abcdfg: 9,
};

let count = 0;
let sum = 0;

input.forEach((line) => {
  const [hints, digits] = line
    .split(" | ")
    .map((n) => n.split(" ").map((c) => c.split("")));

  const map = {};
  const solvedHints = {};

  solvedHints[1] = hints.find((h) => h.length === 2);
  solvedHints[7] = hints.find((h) => h.length === 3);
  solvedHints[4] = hints.find((h) => h.length === 4);
  solvedHints[8] = hints.find((h) => h.length === 7);
  solvedHints[9] = hints.find(
    (h) => h.length === 6 && solvedHints[4].every((s) => h.includes(s))
  );
  solvedHints[6] = hints.find(
    (h) => h.length === 6 && !solvedHints[1].every((s) => h.includes(s))
  );
  solvedHints[0] = hints.find(
    (h) => h.length === 6 && h !== solvedHints[9] && h !== solvedHints[6]
  );
  solvedHints[5] = hints.find(
    (h) => h.length === 5 && h.every((s) => solvedHints[6].includes(s))
  );
  solvedHints[3] = hints.find(
    (h) =>
      h.length === 5 &&
      h.every((s) => solvedHints[9].includes(s)) &&
      h !== solvedHints[5]
  );
  solvedHints[2] = hints.find(
    (h) => h.length === 5 && h !== solvedHints[3] && h !== solvedHints[5]
  );

  map[arrayDiff(solvedHints[7], solvedHints[1])] = "a";
  map[arrayDiff(solvedHints[8], solvedHints[9])] = "e";
  map[arrayDiff(solvedHints[8], solvedHints[6])] = "c";
  map[arrayDiff(solvedHints[8], solvedHints[0])] = "d";
  map[arrayDiff(solvedHints[9], solvedHints[3])] = "b";
  map[arrayDiff(solvedHints[3], solvedHints[2])] = "f";
  map["abcdefg".split("").find((l) => !Object.keys(map).includes(l))] = "g";

  const parsed = parseInt(
    digits
      .map((d) =>
        d
          .map((s) => map[s])
          .sort((a, b) => (a < b ? -1 : 1))
          .join("")
      )
      .map((x) => toDigit[x])
      .join(""),
    10
  );

  count += ("" + parsed)
    .split("")
    .filter((x) => ["1", "7", "4", "8"].includes(x)).length;
  sum += parsed;
});

console.log(count);
console.log(sum);
