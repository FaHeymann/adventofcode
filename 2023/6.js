const races = [
  [34, 204],
  [90, 1713],
  [89, 1210],
  [86, 1780],
]

let score = 1

races.forEach(([time, threshold]) => {
  let count = 0
  for (let i = 1; i < time; i++) {
    const result = i * (time - i)
    if (result > threshold) {
      count += 1
    }
  }
  score *= count
})

console.log(score)

const time = 34_90_89_86
const threshold = 204_1713_1210_1780
const min = 7430122
const max = 27478864

const test = (value) => {
  const result = value * (time - value)
  console.log(result, result > threshold)
}

test(min)
test(min - 1)
test(min + 1)

test(max)
test(max - 1)
test(max + 1)

console.log((max - 1) - (min + 1) + 1)