const input = require("fs").readFileSync("inputs/2022/13.txt").toString();

const compare = (a, b) => {
  if (Number.isInteger(a) && Number.isInteger(b)) {
    if (a < b) {
      return -1
    }
    if (a > b) {
      return 1
    }
    return 0
  }
  if (Array.isArray(a) && Array.isArray(b)) {
    for (let i = 0; i < a.length; i++) {
      if (b.length - 1 < i) {
        return 1
      }
      const result = compare(a[i], b[i])
      if (result !== 0) {
        return result
      }
    }
    if (b.length > a.length) {
      return -1
    }
    return 0
  }
  if (Array.isArray(a)) {
    return compare(a, [b])
  }
  return compare([a], b)
}

const pairs = input.split('\n\n')
let count = 0

pairs.forEach((pair, index) => {
  const [one, two] = pair.split('\n').map(x => JSON.parse(x))
  if (compare(one, two) === -1) {
    count += (index + 1)
  }
})

console.log(count)

let all = input.split('\n').filter(line => line !== '')
all.push('[[2]]', '[[6]]')
all = all.map(x => JSON.parse(x))
all.sort(compare)
all = all.map(x => JSON.stringify(x))

const indices = [all.findIndex(s => s === '[[2]]'), all.findIndex(s => s === '[[6]]')]
console.log((indices[0] + 1) * (indices[1] + 1))

