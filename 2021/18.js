const print = (root) => {
  let str = "";
  const rec = (cur) => {
    if (cur.value !== null) {
      str += cur.value;
    } else {
      str += "[";
      rec(cur.left);
      str += ",";
      rec(cur.right);
      str += "]";
    }
  };
  rec(root);
  console.log(str);
};

const parse = (str) => {
  const root = {
    parent: null,
    left: null,
    right: null,
    value: null,
  };

  let cur = root;
  let toggle = false;

  for (let i = 1; i < str.length - 1; i++) {
    if (str.charAt(i) === "[") {
      const newNode = {
        parent: cur,
        left: null,
        right: null,
        value: null,
      };
      if (!toggle) {
        cur.left = newNode;
      } else {
        cur.right = newNode;
      }
      cur = newNode;
      toggle = false;
    } else if (str.charAt(i) === "]") {
      cur = cur.parent;
    } else if (str.charAt(i) === ",") {
      toggle = true;
    } else {
      let num = str.charAt(i);
      while (/[0-9]/.test(str.charAt(i + 1))) {
        num += str.charAt(i + 1);
        i++;
      }
      if (!toggle) {
        cur.left = {
          parent: cur,
          value: parseInt(num),
        };
      } else {
        cur.right = {
          parent: cur,
          value: parseInt(num),
        };
      }
    }
  }
  return root;
};

const split = (cur) => {
  if (cur.value !== null) {
    if (cur.value > 9) {
      cur.left = {
        parent: cur,
        value: Math.floor(cur.value / 2),
      };
      cur.right = {
        parent: cur,
        value: Math.ceil(cur.value / 2),
      };
      cur.value = null;
      return true;
    }
    return false;
  } else {
    const leftResult = split(cur.left);
    if (leftResult) {
      return true;
    }
    return split(cur.right);
  }
};

const explode = (root) => {
  let previous = null;
  let addToNext = null;
  let done = false;
  const rec = (cur, depth) => {
    if (addToNext !== null && cur.value !== null) {
      cur.value += addToNext;
      addToNext = null;
      return;
    }
    if (cur.value !== null) {
      previous = cur;
      return;
    }
    if (
      done === false &&
      depth > 3 &&
      cur.left.value !== null &&
      cur.right.value !== null
    ) {
      if (previous) {
        previous.value += cur.left.value;
      }
      addToNext = cur.right.value;
      cur.value = 0;
      delete cur.right;
      delete cur.left;
      done = true;
      return;
    }
    rec(cur.left, depth + 1);
    rec(cur.right, depth + 1);
  };
  rec(root, 0);
  return done;
};

const reduce = (root) => {
  while (true) {
    if(!explode(root) && !split(root)) {
      break;
    }
  }
};

const add = (a, b) => {
  const newRoot = {
    parent: null,
    left: a,
    right: b,
    value: null,
  };
  a.parent = newRoot;
  b.parent = newRoot;
  reduce(newRoot)
  return newRoot;
};

const magnitude = (root) => root.value !== null ? root.value : 3 * magnitude(root.left) + 2 * magnitude(root.right);

const input = require("fs").readFileSync("inputs/2021/18.txt").toString().split("\n");

input.forEach((line, i) => {
  if (i === 0) {
    root = parse(line);
  } else {
    root = add(root, parse(line));
  }
});
print(root);
console.log(magnitude(root))

let max = 0;

for (let i = 0; i < input.length; i++) {
  for (let j = i; j < input.length; j++) {
    const result1 = magnitude(add(parse(input[i]), parse(input[j])))
    const result2 = magnitude(add(parse(input[j]), parse(input[i])))
    max = Math.max(result1, result2, max)
  }
}

console.log(max)
