const knotHash = input => {
  const lengths = input.split('').map(c => c.charCodeAt(0)).concat([17, 31, 73, 47, 23]);

  let list = [...Array(256).keys()];
  let pos = 0;
  let skipSize = 0;

  const reverseSubArray = (array, pos, length) => {
    const out = [...array];
    let high = pos + length - 1;
    while (high > pos) {
      out[high % array.length] = array[pos % array.length];
      out[pos % array.length] = array[high % array.length];
      high--;
      pos++;
    }
    return out;
  }

  const step = (length) => {
    if (length > list.length) {
      return;
    }
    list = reverseSubArray(list, pos, length);
    pos = (pos + length + skipSize) % list.length;
    skipSize++;
  };

  for (let i = 0; i < 64; i++) {
    lengths.forEach(length => {
      step(length);
    });
  }

  const dense = Array(16).fill(0);

  for (let i = 0; i < 256; i++) {
    dense[Math.floor(i / 16)] ^= list[i];
  }

  return dense.map(x => ('00' + x.toString(16)).substr(-2)).join('');
}

let count = 0;

const grid = [];

for(let i = 0; i < 128; i++) {
  const hash = knotHash(`nbysizxe-${i}`);
  const binary = hash.split('').map(bits => parseInt(bits, 16).toString(2).padStart(4, '0')).join('');
  grid.push(binary.split(''));
  count += binary.split('').filter(x => x === '1').length;
}

console.log(count);

const map = {};

const regions = {};

let regionIndex = 1;

const getRegion = (y, x) => map[`${y}#${x}`];

const merge = (from, to) => {
  regions[from].forEach(index => {
    map[index] = to;
    regions[to].push(index);
  });
  regions[from] = 'merged';
}

for (let y = 0; y < 128; y++) {
  for (let x = 0; x < 128; x++) {
    if (grid[y][x] === '0') {
      continue;
    }
    const regionAbove = getRegion(y, x - 1);
    const regionLeft = getRegion(y - 1, x);

    if (regionAbove && regionLeft) {
      map[`${y}#${x}`] = regionLeft;
      regions[regionLeft].push(`${y}#${x}`);
      if (regionLeft != regionAbove) {
        merge(regionAbove, regionLeft);
      }
    } else if (regionAbove) {
      map[`${y}#${x}`] = regionAbove;
      regions[regionAbove].push(`${y}#${x}`);
    } else if (regionLeft) {
      map[`${y}#${x}`] = regionLeft;
      regions[regionLeft].push(`${y}#${x}`);
    } else {
      regions[regionIndex] = [];
      map[`${y}#${x}`] = regionIndex;
      regions[regionIndex].push(`${y}#${x}`);
      regionIndex++;
    }
  }
}

console.log(Object.entries(regions).filter(([key, value]) => value !== 'merged').length);
