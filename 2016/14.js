const crypto = require('crypto');

const salt = 'zpqevtbw';

let hashes = new Map();
const getHash = i => {
  if (hashes.has(i)) {
    return hashes.get(i);
  }
  let hash = crypto.createHash('md5').update(`${salt}${i}`).digest("hex");
  hashes.set(i, hash);
  return hash;
};

const getHash2 = i => {
  if (hashes.has(i)) {
    return hashes.get(i);
  }
  let hash = crypto.createHash('md5').update(`${salt}${i}`).digest("hex");
  for (let i = 0; i < 2016; i++) {
    hash = crypto.createHash('md5').update(hash).digest("hex");
  }
  hashes.set(i, hash);
  return hash;
};

const hasTriple = str => {
  for (let i = 0; i < str.length - 2; i++) {
    if (str.charAt(i) === str.charAt(i + 1) && str.charAt(i) === str.charAt(i + 2)) {
      return str.charAt(i);
    }
  }
  return false;
}

const hasQuintuple = (str, char) => {
  for (let i = 0; i < str.length - 4; i++) {
    if (str.charAt(i) === char && str.charAt(i + 1) === char  && str.charAt(i + 2) === char  && str.charAt(i + 3) === char  && str.charAt(i + 4) === char) {
      return true;
    }
  }
  return false;
}

let i = 0;
let keys = [];

while (keys.length < 64) {
  const hash = getHash(i);
  const triple = hasTriple(hash);
  if (triple) {
    for (let j = i + 1; j <= i + 1001; j++) {
      const innerHash = getHash(j);
      if (hasQuintuple(innerHash, triple)) {
        keys.push(i);
        break;
      }
    }
  }
  i++;
}

console.log(keys[63]);

// star2
i = 0;
keys = [];
hashes = new Map();

while (keys.length < 64) {
  const hash = getHash2(i);
  const triple = hasTriple(hash);
  if (triple) {
    for (let j = i + 1; j <= i + 1001; j++) {
      const innerHash = getHash2(j);
      if (hasQuintuple(innerHash, triple)) {
        keys.push(i);
        console.log(keys.length, '/', '64');
        break;
      }
    }
  }
  i++;
}

console.log(keys[63]);
