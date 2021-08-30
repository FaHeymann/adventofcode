const rawSeq = '59790677903322930697358770979456996712973859451709720515074487141246507419590039598329735611909754526681279087091321241889537569965210074382210124927546962637736867742660227796566466871680580005288100192670887174084077574258206307557682549836795598410624042549261801689113559881008629752048213862796556156681802163843211546443228186862314896620419832148583664829023116082772951046466358463667825025457939806789469683866009241229487708732435909544650428069263180522263909211986231581228330456441451927777125388590197170653962842083186914721611560451459928418815254443773460832555717155899456905676980728095392900218760297612453568324542692109397431554';

const star1 = () => {
  const getPatternValue = (digitIndex, position) => {
    const len = digitIndex + 1;
    if ((position + 1) % (len * 4) < len) {
      return 0;
    } else if ((position + 1) % (len * 4) < 2 * len) {
      return 1;
    } else if ((position + 1) % (len * 4) < 3 * len) {
      return 0;
    } else {
      return -1;
    }
  }


  const phase = (input) => {
    const output = [];
    for (let i = 0; i < input.length; i++) {
      let sum = 0;
      for (let j = i; j < input.length; j++) {
        sum += input[j] * getPatternValue(i, j);
      }
      if (sum < 0) {
        sum *= -1;
      }
      output[i] = sum % 10;
    }
    return output;
  }

  let seq = rawSeq.split('').map(x => parseInt(x, 10));

  for (let i = 0; i < 100; i++) {
    seq = phase(seq);
  }
  console.log(seq.slice(0, 8).join(''));
}

star1();

const phase = (input) => {
  const output = [];
  let runner = 0;
  for (let i = input.length - 1; i > -1; i--) {
    runner = (runner + input[i]) % 10;
    output[i] = runner;
  }
  return output;
}

const offset = parseInt(rawSeq.substr(0, 7), 10);

if (offset < rawSeq.length * 5000) {
  console.error('Wont work');
}

let seq = rawSeq.repeat(10000).substr(offset).split('').map(x => parseInt(x, 10));

for (let i = 0; i < 100; i++) {
  seq = phase(seq);
}
console.log(seq.slice(0, 8).join(''));
