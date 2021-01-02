const input = require('fs').readFileSync('inputs/2016/9.txt').toString();

const decompress = line => {
  let out = '';

  for (let i = 0; i < line.length; i++) {
    if (line.charAt(i) !== '(') {
      out += line.charAt(i);
      continue;
    }

    const [_, len, repeats] = line.substr(i).match(/^\(([0-9]+)x([0-9]+)\).*$/);
    const expressionLength = 3 + len.length + repeats.length;
    const expression = line.substr(i + expressionLength, parseInt(len, 10));
    out += expression.repeat(parseInt(repeats, 10));
    i += expressionLength + expression.length - 1;
  }

  return out;
}

console.log(decompress(input).length);

const map = {};

const decompress2 = line => {
  if (map[line]) {
    return map[line];
  }
  let count = 0;

  for (let i = 0; i < line.length; i++) {
    if (line.charAt(i) !== '(') {
      count += 1;
      continue;
    }

    const [_, len, repeats] = line.substr(i).match(/^\(([0-9]+)x([0-9]+)\).*$/);
    const expressionLength = 3 + len.length + repeats.length;
    const expression = line.substr(i + expressionLength, parseInt(len, 10));
    if (expression.includes('(')) {
      count += decompress2(expression.repeat(parseInt(repeats, 10)));
    } else {
      count += parseInt(repeats, 10) * parseInt(len, 10);
    }
    i += expressionLength + expression.length - 1;
  }

  map[line] = count;

  return count;
}

console.log(decompress2(input));
