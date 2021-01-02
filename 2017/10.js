const star1 = () => {
  const input = [14,58,0,116,179,16,1,104,2,254,167,86,255,55,122,244];
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

  input.forEach(length => {
    step(length);
  });

  console.log(list[0] * list[1]);
};

star1();

const input = '14,58,0,116,179,16,1,104,2,254,167,86,255,55,122,244';

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


console.log(dense.map(x => ('00' + x.toString(16)).substr(-2)).join(''));


