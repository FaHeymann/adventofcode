const ingredients = [
  { capacity: 4, durability: -2, flavor: 0, texture: 0, calories: 5 },
  { capacity: 0, durability: 5, flavor: -1, texture: 0, calories: 8 },
  { capacity: -1, durability: 0, flavor: 5, texture: 0, calories: 6 },
  { capacity: 0, durability: 0, flavor: -2, texture: 2, calories: 1 },
];

const rating = distribution => {
  product = ['capacity', 'durability', 'flavor', 'texture'].reduce((product, ing) => {
    const sum = distribution.reduce((sum, amount, i) => sum + amount * ingredients[i][ing], 0);
    return product * Math.max(0, sum);
  }, 1)
  return product;
}

const calories = distribution => distribution.reduce((sum, amount, i) => sum + amount * ingredients[i]['calories'], 0);

let max = 0;

for (let s1 = 0; s1 <= 100; s1++) {
  for (let s2 = s1; s2 <= 100; s2++) {
    for (let s3 = s2; s3 <= 100; s3++) {
      const distribution = [s1, s2 - s1, s3 - s2, 100 - s3];
      max = Math.max(max, rating(distribution));
    }
  }
}

console.log(max);

max = 0;

for (let s1 = 0; s1 <= 100; s1++) {
  for (let s2 = s1; s2 <= 100; s2++) {
    for (let s3 = s2; s3 <= 100; s3++) {
      const distribution = [s1, s2 - s1, s3 - s2, 100 - s3];
      if (calories(distribution) === 500) {
        max = Math.max(max, rating(distribution));
      }
    }
  }
}

console.log(max);
