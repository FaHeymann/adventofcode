const inputP1 = `21
50
9
45
16
47
27
38
29
48
10
42
32
31
41
11
8
33
25
30
12
40
7
23
46`;

const inputP2 = `22
20
44
2
26
17
34
37
43
5
15
18
36
19
24
35
3
13
14
1
6
39
49
4
28`;

const p1 = inputP1.split('\n').map(x => parseInt(x, 10));
const p2 = inputP2.split('\n').map(x => parseInt(x, 10));

const p3 = [...p1];
const p4 = [...p2];

while (p1.length > 0 && p2.length > 0) {
  const c1 = p1.shift();
  const c2 = p2.shift();
  if (c1 > c2) {
    p1.push(c1);
    p1.push(c2);
  } else {
    p2.push(c2);
    p2.push(c1);
  }
}

console.log([...(p1.length > 0 ? p1 : p2)].reverse().reduce((sum, c, i) =>  sum + c * (i + 1), 0));

const game = (d1, d2) => { // return true <=> p1 won
  const encounteredStates = new Set();
  while (d1.length > 0 && d2.length > 0) {
    if (encounteredStates.has(`${d1.join(',')}#${d2.join(',')}`)) {
      return true;
    }
    encounteredStates.add(`${d1.join(',')}#${d2.join(',')}`);
    const c1 = d1.shift();
    const c2 = d2.shift();
    let d1Wins;
    if (d1.length >= c1 && d2.length >= c2) {
      d1Wins = game([...d1].slice(0, c1), [...d2].slice(0, c2));
    } else {
      d1Wins = c1 > c2;
    }

    if (d1Wins) {
      d1.push(c1);
      d1.push(c2);
    } else {
      d2.push(c2);
      d2.push(c1);
    }
  }
  return d1.length > 0;
}

game(p3, p4);

console.log([...(p3.length > 0 ? p3 : p4)].reverse().reduce((sum, c, i) =>  sum + c * (i + 1), 0));
