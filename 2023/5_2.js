// const input = `seeds: 79 14 55 13

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

// const maps = rawMaps.map(rawMap => {
//   const split = rawMap.split('\n')
//   const name = split.shift()
//   return split.map(line => line.split(' ').map(n => parseInt(n, 10)))
// })

const maps = rawMaps.map(rawMap => {
  let split = rawMap.split('\n')
  const name = split.shift()
  split = split.map(line => line.split(' ').map(n => parseInt(n, 10)))
  console.log(split)
  return split.map(line => [line[1], line[1] + line[2] - 1, line[0] - line[1]])
})

console.log(seeds)
console.log(maps)

const mapValue = (mapIndex, sourceInput) => {
  let sources = [sourceInput]
  const map = maps[mapIndex]
  const output = []
  for (let i = 0; i < map.length; i++) {
    const newSources = []
    while (sources.length > 0) {
      const source = sources.shift()
      const [mappingStart, mappingEnd, offset] = map[i]
      if (source[0] >= mappingStart && source[1] <= mappingEnd) {
        output.push([source[0] + offset, source[1] + offset])
      } else if (mappingStart >= source[0] && mappingEnd <= source[1]) {
        output.push([mappingStart + offset, mappingEnd + offset])
        newSources.push([source[0], mappingStart - 1])
        newSources.push([mappingEnd + 1, source[1]])
      } else if (source[0] >= mappingStart && source[0] <= mappingEnd) {
        output.push([source[0] + offset, mappingEnd + offset])
        newSources.push([mappingEnd + 1, source[1]])
      } else if (source[1] >= mappingStart && source[1] <= mappingEnd) {
        output.push([mappingStart + offset, source[1] + offset])
        newSources.push([source[0], mappingStart - 1])
      } else {
        newSources.push(source)
      }
    }
    sources = newSources
  }
  return [...output, ...sources]
}

let pairs = []

for(let i = 0; i < seeds.length; i += 2) {
  pairs.push([seeds[i], seeds[i] + seeds[i + 1] - 1])
}

// console.log(pairs)
console.log('\n\n')


for (let i = 0; i < maps.length; i++) {
  console.log(pairs)
  const newPairs = []
  pairs.forEach(pair => {
    newPairs.push(...mapValue(i, pair))
  })
  pairs = newPairs
}
console.log(pairs)
console.log(pairs.reduce((a, b) => Math.min(a, b[0]), Number.MAX_SAFE_INTEGER))


