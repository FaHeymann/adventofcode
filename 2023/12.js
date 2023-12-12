const input = require("fs").readFileSync("inputs/2023/12.txt").toString();

// const input = `???.### 1,1,3
// .??..??...?##. 1,1,3
// ?#?#?#?#?#?#?#? 1,3,1,6
// ????.#...#... 4,1,1
// ????.######..#####. 1,6,5
// ?###???????? 3,2,1`

const cache = new Map()

const solve = (string, hints) => {
  if (string === '') {
    return hints.length === 0 ? 1 : 0
  }
  if (hints.length === 0) {
    return string.includes('#') ? 0 : 1
  }

  const cacheKey = `${string}+${hints.join(',')}`

  if (cache.has(cacheKey)) {
    return cache.get(cacheKey)
  }

  let result = 0

  if (['.', '?'].includes(string.charAt(0))) {
    result += solve(string.substring(1), hints)
  }
  const [currentHint, ...remainingHints] = hints
  if (
    ['#', '?'].includes(string.charAt(0))
    && currentHint <= string.length
    && !string.slice(0, currentHint).includes('.')
    && string.charAt(currentHint) !== '#'
  ) {
    result += solve(string.substring(currentHint + 1), remainingHints)
  }
  cache.set(cacheKey, result)
  return result
}

let sum = [0, 0]


input.split('\n').forEach(line => {
  let [string, hints] = line.split(' ')
  sum[0] += solve(string, hints.split(',').map(n => parseInt(n, 10)))

  string = `${string}?${string}?${string}?${string}?${string}`.replaceAll(/\.{2,}/g, '.')
  hints = `${hints},${hints},${hints},${hints},${hints}`

  sum[1] += solve(string, hints.split(',').map(n => parseInt(n, 10)))
})

console.log(sum)
