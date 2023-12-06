{// const input = `seeds: 79 14 55 13

// seed-to-soil map:
// 50 98 2
// 52 50 48

// soil-to-fertilizer map:
// 0 15 37
// 37 52 2
// 39 0 15

// fertilizer-to-water map:
// 49 53 8
// 0 11 42
// 42 0 7
// 57 7 4

// water-to-light map:
// 88 18 7
// 18 25 70

// light-to-temperature map:
// 45 77 23
// 81 45 19
// 68 64 13

// temperature-to-humidity map:
// 0 69 1
// 1 0 69

// humidity-to-location map:
// 60 56 37
// 56 93 4`

const input = require("fs").readFileSync("inputs/2023/5.txt").toString();

const rawMaps = input.split('\n\n')
const seeds = rawMaps.shift().split(': ')[1].split(' ').map(n => parseInt(n, 10))

const maps = rawMaps.map(rawMap => {
  const split = rawMap.split('\n')
  const name = split.shift()
  return split.map(line => line.split(' ').map(n => parseInt(n, 10)))
})

console.log(seeds)
console.log(maps)

const mapValue = (mapIndex, source) => {
  const map = maps[mapIndex]
  for (let i = 0; i < map.length; i++) {
    const line = map[i]
    // console.log(line)
    if (source >= line[1] && source < line[1] + line[2]) {
      return source + (line[0] - line[1])
    }
  }
  return source
}

const values = seeds.map(seed => {
  // console.log(seed)
  for (let i = 0; i < maps.length; i++) {
    seed = mapValue(i, seed)
  }
  return seed
})

console.log(values.reduce((a, b) => Math.min(a, b), Number.MAX_SAFE_INTEGER))

// for (let i = 0; i <= 100; i++) {
//   console.log(i, mapValue(0, i))
// }
}