for (let house = 1; house < 1000000; house++) {
  let sum = 0;
  for (let i = 1; i < Math.sqrt(house); i++) {
    if (house % i === 0) {
      sum += 10 * i;
      sum += 10 * (house / i);
    }
  }

  if (Math.sqrt(house) - Math.floor(Math.sqrt(house)) < Number.EPSILON) {
    sum += 10 * Math.floor(Math.sqrt(house));
  }

  if (sum >= 34000000) {
    console.log(house);
    break;
  }
}

for (let house = 1; house < 1000000; house++) {
  let sum = 0;
  for (let i = 1; i < Math.sqrt(house); i++) {
    if (house % i === 0) {
      if (i * 50 >= house) {
        sum += 11 * i;
      }
      if ((house / i) * 50 >= house) {
        sum += 11 * (house / i);
      }
    }
  }

  if (Math.sqrt(house) - Math.floor(Math.sqrt(house)) < Number.EPSILON && Math.floor(Math.sqrt(house)) * 50 >= house) {
    sum += 11 * Math.floor(Math.sqrt(house));
  }

  if (sum >= 34000000) {
    console.log(house);
    break;
  }
}
