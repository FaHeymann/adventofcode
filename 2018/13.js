const input = require('fs').readFileSync('inputs/2018/13.txt').toString();

let carts = [];

let cartId = 0;

const map = input.split('\n').map((line, y) => line.split('').map((c, x) => {
  if (['>', '<', '^', 'v'].includes(c)) {
    carts.push({y, x, dir: c, turnCount: 0, id: cartId++ });
    return ['>', '<'].includes(c) ? '|' : '-';
  }
  return c;
}));

let printedStar1 = false;

const moveStraight = (cart) => {
  if (cart.dir === '^') {
    cart.y--;
  } else if (cart.dir === 'v') {
    cart.y++;
  } else if (cart.dir === '<') {
    cart.x--;
  } else if (cart.dir === '>') {
    cart.x++;
  }
  carts.forEach((c) => {
    if (c.id !== cart.id && c.y === cart.y && c.x === cart.x) {
      if (!printedStar1) {
        console.log(`${c.x},${c.y}`);
        printedStar1 = true;
      }

      carts[carts.findIndex(e => e.id === cart.id)] = 'crashed';
      carts[carts.findIndex(e => e.id === c.id)] = 'crashed';
    }
  });
};

const turnLeft = (cart) => {
  if (cart.dir === '^') {
    cart.dir = '<';
  } else if (cart.dir === 'v') {
    cart.dir = '>';
  } else if (cart.dir === '<') {
    cart.dir = 'v';
  } else if (cart.dir === '>') {
    cart.dir = '^';
  }
};

const turnRight = (cart) => {
  turnLeft(cart);
  turnLeft(cart);
  turnLeft(cart);
};

const move = cart => {
  const {y, x, dir} = cart;
  const tile = map[y][x];
  if (['|', '-'].includes(tile)) {
    moveStraight(cart);
  } else if (tile === '/' && ['^', 'v'].includes(cart.dir)) {
    turnRight(cart);
    moveStraight(cart);
  } else if (tile === '/' && ['<', '>'].includes(cart.dir)) {
    turnLeft(cart);
    moveStraight(cart);
  } else if (tile === '\\' && ['^', 'v'].includes(cart.dir)) {
    turnLeft(cart);
    moveStraight(cart);
  } else if (tile === '\\' && ['<', '>'].includes(cart.dir)) {
    turnRight(cart);
    moveStraight(cart);
  } else if (tile === '+') {
    if (cart.turnCount % 3 === 0) {
      turnLeft(cart)
    } else if (cart.turnCount % 3 === 2) {
      turnRight(cart)
    }
    cart.turnCount++;
    moveStraight(cart);
  } else {
    console.log('error');
  }
};

const step = () => {
  carts.sort((a, b) => {
    if (a === 'crashed' || b === 'crashed') {
      return -1;
    }
    if (a.y === b.y) {
      return a.x - b.x;
    }
    return a.y - b.y;
  });
  carts.forEach(cart => {
    if (cart !== 'crashed') {
      move(cart);
    }
  });
};

while (carts.filter(c => c !== 'crashed').length > 1) {
  step();
}

console.log(`${carts.filter(c => c !== 'crashed')[0].x},${carts.filter(c => c !== 'crashed')[0].y}`);

