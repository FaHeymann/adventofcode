const hasPair = x => ('' + x).split('').some((c, i, arr) => i !== 0 && arr[i - 1] === c && (i - 2 < 0 || arr[i - 2] !== c) && (i + 1 >= arr.length || arr[i + 1] !== c));

const nextAscending = x => {
  const arr = ('' + x).split('');
  for (let i = 1; i < arr.length; i++) {
    arr[i] = Math.max(arr[i], arr[i - 1]);
  }
  return parseInt(arr.join(''), 10);
}

let count = 0;
let cur = 246540;
cur = nextAscending(cur);

while (cur <= 787419) {
  if (hasPair(cur)) {
    count ++;
  }
  cur = nextAscending(cur + 1);
}

console.log(count);
