let i = 20151125;

loop1: for (let y = 2; y < 100000; y++) {
  let curY = y;
  for (let x = 1; x <= y; x++) {
    i = (i * 252533) % 33554393;
    if (curY === 2947 && x === 3029) {
      console.log(i);
      break loop1;
    }
    curY--;
  }
}
