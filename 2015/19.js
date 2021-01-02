const input = require('fs').readFileSync('inputs/2015/19.txt').toString();

const str = 'CRnSiRnCaPTiMgYCaPTiRnFArSiThFArCaSiThSiThPBCaCaSiRnSiRnTiTiMgArPBCaPMgYPTiRnFArFArCaSiRnBPMgArPRnCaPTiRnFArCaSiThCaCaFArPBCaCaPTiTiRnFArCaSiRnSiAlYSiThRnFArArCaSiRnBFArCaCaSiRnSiThCaCaCaFYCaPTiBCaSiThCaSiThPMgArSiRnCaPBFYCaCaFArCaCaCaCaSiThCaSiRnPRnFArPBSiThPRnFArSiRnMgArCaFYFArCaSiRnSiAlArTiTiTiTiTiTiTiRnPMgArPTiTiTiBSiRnSiAlArTiTiRnPMgArCaFYBPBPTiRnSiRnMgArSiThCaFArCaSiThFArPRnFArCaSiRnTiBSiThSiRnSiAlYCaFArPRnFArSiThCaFArCaCaSiThCaCaCaSiRnPRnCaFArFYPMgArCaPBCaPBSiRnFYPBCaFArCaSiAl';

const set = new Set();

for (let i = 0; i < str.length; i++) {
  input.split('\n').forEach(formula => {
    const [_, src, tar] = formula.match(/^([a-zA-Z]+) => ([a-zA-Z]+)$/);
    if (str.substr(i, src.length) === src) {
      set.add(str.substr(0, i) + tar + str.substring(i + src.length))
    }
  })
}

console.log(set.size);

const replacements = input.split('\n').map(formula => {
  const [_, src, tar] = formula.match(/^([a-zA-Z]+) => ([a-zA-Z]+)$/);
  return { src, tar };
});

replacements.sort((a, b) => b.tar.length - a.tar.length);

const step = molecule => {
  let result;
  replacements.find(replacement => {
    for (let i = 0; i < molecule.length; i++) {
      if (molecule.substr(i, replacement.tar.length) === replacement.tar) {
        result = molecule.substr(0, i) + replacement.src + molecule.substring(i + replacement.tar.length);
        return true;
      }
    }
  });
  return result;
}

let mol = str;

let i = 0;

while (mol !== 'e') {
  i++;
  mol = step(mol);
}

console.log(i);
