const resolve = input => {
  if (typeof input === 'number') {
    return input;
  }
  if (Array.isArray(input)) {
    return input.reduce((sum, cur) => sum + resolve(cur), 0);
  }
  if (typeof input === 'object') {
    return resolve(Object.values(input));
  }
  return 0;
};

console.log(resolve(require('../inputs/2015/12.json')));

const resolve2 = input => {
  if (typeof input === 'number') {
    return input;
  }
  if (Array.isArray(input)) {
    return input.reduce((sum, cur) => sum + resolve2(cur), 0);
  }
  if (typeof input === 'object') {
    return Object.values(input).includes('red') ? 0: resolve2(Object.values(input));
  }
  return 0;
};

console.log(resolve2(require('../inputs/2015/12.json')));
