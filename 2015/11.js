const hasIncr = input => [0, 1, 2, 3, 4, 5].some(i => input.charCodeAt(i) === input.charCodeAt(i + 1) - 1 && input.charCodeAt(i) === input.charCodeAt(i + 2) - 2);

const hasPairs = input => {
  let count = 0;
  for (let i = 1; i < input.length; i++) {
    if (input.charCodeAt(i - 1) == input.charCodeAt(i)) {
      count++;
      if (count == 2) {
        return true;
      }
      i++;
    }
  }
  return false;
}

const incrementDigit = (input, digit) => {
  let replacement = input.charCodeAt(digit) + 1;
  let overflow = false;

  if (replacement > 122) {
    replacement = 97;
    overflow = true;
  }

  return [
    input.substring(0, digit) + String.fromCharCode(replacement) + input.substring(digit + 1),
    overflow,
  ];
}

const increment = input => {
  let i = 7;
  let overflow = true;
  while(overflow) {
    [input, overflow] = incrementDigit(input, i);
    i--
  }

  for (let j = 0; j < 8; j++) {
    if (['i', 'o', 'l'].includes(input.split('')[j])) {
      input = input.substring(0, j) + String.fromCharCode( input.charCodeAt(j) + 1) + 'a'.repeat(8 - j - 1);
      break;
    }
  }

  return input;
}

const nextValid = input => {
  do {
    input = increment(input);
    // console.log(input);
  } while(!hasIncr(input) || !hasPairs(input));
  return input;
}

const next = nextValid('hxbxwxba');
console.log(next);
console.log(nextValid(next));
