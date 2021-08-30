const list = [3, 7];

let e1 = 0;
let e2 = 1;

let b = '';
let len = 0;

const target = '825401';

buffer = d => {
  b += d;
  if (b.length > target.length) {
    b = b.substr(1);
    len++;
  }
  if (b === target) {
    console.log(len);
    process.exit(0);
  }
};

buffer(3);
buffer(7);

const step = () => {
  ('' + (list[e1] + list[e2])).split('').map(x => parseInt(x, 10)).forEach(d => {
    list.push(d);
    buffer(d);
  });
  e1 = (e1 + 1 + list[e1]) % list.length;
  e2 = (e2 + 1 + list[e2]) % list.length;
}

while (list.length < 825401 + 10) {
  step();
}

console.log(list.slice(825401, 825401 + 10).join(''));

while(true) {
  step();
}
