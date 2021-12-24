const input = require("fs").readFileSync("inputs/2021/19.txt").toString();

const solved = [];
const todo = [];

const scannersRaw = input.split("\n\n");
scannersRaw.forEach((scannerRaw) => {
  const scanner = {
    readings: [],
  };
  scannerRaw.split("\n").forEach((line, i) => {
    if (i === 0) {
      scanner.id = parseInt(line.split(" ")[2]);
    } else {
      scanner.readings.push(line.split(",").map((n) => parseInt(n, 10)));
    }
  });
  if (scanner.id === 0) {
    solved.push(scanner);
  } else {
    todo.push(scanner);
  }
});

const flipForward = ([z, y, x]) => [-y, z, x];
const flipRight = ([z, y, x]) => [-x, y, z];
const rotateRight = ([z, y, x]) => [z, x, -y];

const rotations = (coords) => [
  coords,
  rotateRight(coords),
  rotateRight(rotateRight(coords)),
  rotateRight(rotateRight(rotateRight(coords))),

  flipForward(coords),
  flipForward(rotateRight(coords)),
  flipForward(rotateRight(rotateRight(coords))),
  flipForward(rotateRight(rotateRight(rotateRight(coords)))),

  flipForward(flipForward(coords)),
  flipForward(flipForward(rotateRight(coords))),
  flipForward(flipForward(rotateRight(rotateRight(coords)))),
  flipForward(flipForward(rotateRight(rotateRight(rotateRight(coords))))),

  flipForward(flipForward(flipForward(coords))),
  flipForward(flipForward(flipForward(rotateRight(coords)))),
  flipForward(flipForward(flipForward(rotateRight(rotateRight(coords))))),
  flipForward(
    flipForward(flipForward(rotateRight(rotateRight(rotateRight(coords)))))
  ),

  flipRight(coords),
  flipRight(rotateRight(coords)),
  flipRight(rotateRight(rotateRight(coords))),
  flipRight(rotateRight(rotateRight(rotateRight(coords)))),

  flipRight(flipRight(flipRight(coords))),
  flipRight(flipRight(flipRight(rotateRight(coords)))),
  flipRight(flipRight(flipRight(rotateRight(rotateRight(coords))))),
  flipRight(
    flipRight(flipRight(rotateRight(rotateRight(rotateRight(coords)))))
  ),
];

const rotationsOfScanner = (scanner) => {
  const result = [];
  for (let i = 0; i < 24; i++) {
    result.push({
      id: scanner.id,
      readings: scanner.readings.map((r) => rotations(r)[i]),
    });
  }
  return result;
};

const overlaps = (listA, listB) => {
  let count = 0;
  listA.forEach(([z1, y1, x1]) => {
    listB.forEach(([z2, y2, x2]) => {
      if (z1 === z2 && y1 === y2 && x1 === x2) {
        count++;
      }
    });
  });
  return count;
};

const checked = new Set();
const scannerPos = [];

const step = () => {
  solved.some((fixed) => {
    todo.some((curBase, i) => {
      if (curBase === null) {
        return false;
      }
      if (checked.has(`${fixed.id}#${curBase.id}`)) {
        return false;
      }

      const result = rotationsOfScanner(curBase).some((cur) => {
        return fixed.readings.some((fixPoint, fi) => {
          if (fi > fixed.readings.length - 11) {
            return false;
          }
          return cur.readings.some((transposePoint, ti) => {
            if (ti > cur.readings.length - 11) {
              return false;
            }
            const diff = [
              fixPoint[0] - transposePoint[0],
              fixPoint[1] - transposePoint[1],
              fixPoint[2] - transposePoint[2],
            ];
            const transposed = cur.readings.map((e) => [
              e[0] + diff[0],
              e[1] + diff[1],
              e[2] + diff[2],
            ]);

            const overlap = overlaps(fixed.readings, transposed);
            if (overlap >= 12) {
              solved.push({ id: cur.id, readings: transposed });
              scannerPos.push(diff);
              todo[i] = null;
              return true;
            }
          });
        });
      });

      if (!result) {
        checked.add(`${fixed.id}#${curBase.id}`);
      }
      return result;
    });
  });
};

while (todo.filter((t) => t !== null).length > 0) {
  step();
}

const coords = new Set();
solved.forEach((cur) => {
  cur.readings.forEach((c) => {
    coords.add(c.join("#"));
  });
});

console.log(coords.size);

let maxDistance = 0;
scannerPos.forEach((a) => {
  scannerPos.forEach((b) => {
    maxDistance = Math.max(
      maxDistance,
      Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]) + Math.abs(a[2] - b[2])
    );
  });
});

console.log(maxDistance);
