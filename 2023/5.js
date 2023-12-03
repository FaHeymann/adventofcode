const input = require("fs").readFileSync("inputs/2023/5.txt").toString();

const rawMaps = input.split('\n\n')
const seeds = rawMaps.shift().split(': ')[1].split(' ').map(n => parseInt(n, 10))

const maps = rawMaps.map(rawMap => {
  const split = rawMap.split('\n')
  const name = split.shift()
  return split.map(line => line.split(' ').map(n => parseInt(n, 10)))
})

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
