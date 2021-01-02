const getCandidate = arr => arr.reduce(([max, maxI], cur, i) => cur > max ? [cur, i] : [max, maxI], [0, 0])[1]

const step = arr => {
  const out = [...arr];
  let i = getCandidate(arr);
  let amount = arr[i];
  out[i] = 0;

  while (amount > 0) {
    i = (i + 1) % arr.length;
    out[i]++;
    amount--;
  }
  return out;
}

const map = {};

let current = [0, 5, 10, 0, 11, 14, 13, 4, 11, 8, 8, 7, 1, 4, 12, 11];
map[current.join('#')] = 0;
let i = 0;

while(true) {
  current = step(current);
  i++;
  if (map[current.join('#')]) {
    console.log(i);
    console.log(i - map[current.join('#')]);
    break;
  }
  map[current.join('#')] = i;
}
