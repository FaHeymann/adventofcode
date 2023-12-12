const input = require("fs").readFileSync("inputs/2023/12.txt").toString();

// const input = `???.### 1,1,3
// .??..??...?##. 1,1,3
// ?#?#?#?#?#?#?#? 1,3,1,6
// ????.#...#... 4,1,1
// ????.######..#####. 1,6,5
// ?###???????? 3,2,1`

// const input = '?#?????#??.???#?. 2,2,3,3'

// const input = '#?.??#??.? 2,2'

// const input = '.?#?.?#..?#?##??#.?? 3,1,7'

// const input = '????#?????.???# 1,3,2,4'

// const input = '????.????? 2,1,1'

// const input = '?#?????#??.???#?. 2,2,3,3'

// const input = '?????#.??.?? 6,1'

const isSolvable = (string, hints) => {

}

const splitArray = (array, threshold) => {
  const result = [[]]
  array.forEach(v => {
    if (v === threshold) {
      result.push([v])
      result.push([])
    } else {
      result.at(-1).push(v)
    }
  })
  return result.filter(a => a.length > 0)
}

const arrayWithoutElement = (arr, index) => arr.filter((_, i) => i !== index)

const check = (string, hints) => {
  const counts = string.split('.').filter(s => s !== '').map(s => s.length)
  if (counts.length === hints.length && counts.every((x, i) => x === hints[i])) {
    return true
  }
  return false
}

const solveWithBF = (string, hints) => {
  let todo = [string]

  let count = 0

  while(todo.length > 0) {
    const cur = todo.pop()
    if (!cur.includes('?')) {
      count += check(cur, hints) ? 1 : 0
    } else {
      todo.push(cur.replace('?', '.'))
      todo.push(cur.replace('?', '#'))
    }
  }

  return count
}

const binomials = [];

const binomial = (n,k) => {
  while(n >= binomials.length) {
    let s = binomials.length;
    let nextRow = [];
    nextRow[0] = 1;
    for(let i = 1, prev = s - 1; i < s; i++) {
      nextRow[i] = binomials[prev][i - 1] + binomials[prev][i];
    }
    nextRow[s] = 1;
    binomials.push(nextRow);
  }
  return binomials[n][k];
};

const withoutFirstBlock = string => {
  let i = 0;
  while(['#', '?'].includes(string.charAt(i))) {
    i++
  }
  while(['.'].includes(string.charAt(i))) {
    i++
  }
  return string.substring(i)
}

const withoutLastBlock = string => {
  let i = string.length - 1;
  while(['#', '?'].includes(string.charAt(i))) {
    i--
  }
  while(['.'].includes(string.charAt(i))) {
    i--
  }
  return string.substring(0, i + 1)
}

const coversAll = (string, min, max) => {
  let result = string.split('').every((c, i) => c !== '#' || (min <= i && i <= max))
  for (let i = min; i <= max; i++) {
    if (string.charAt(i) === '.') {
      result = false
    }
  }
  return result
}

const solve = (string, hints) => {
  console.log('solve', string, hints)


  if (string.startsWith('.')) {
    return solve(string.substring(1), hints)
  }
  if (string.endsWith('.')) {
    return solve(string.substring(0, string.length - 1), hints)
  }

  if (hints.length === 1) {
    let count = 0;
    for (let i = 0; i <= string.length - hints[0]; i++) {
      count += coversAll(string, i, i + hints[0] - 1) ? 1 : 0
    }
    return count
  }

  const minRequiredSpace = hints.reduce((a, b) => a + b) + hints.length - 1

  if (string.length === minRequiredSpace) {
    return 1
  }

  if (string.startsWith('#')) {
    console.log('this')
    return solve(string.substring(hints[0] + 1), arrayWithoutElement(hints, 0))
  }
  if (string.endsWith('#')) {
    return solve(string.substring(0, string.length - hints.at(-1) - 1), arrayWithoutElement(hints, hints.length - 1))
  }

  if (string.match(/^\?*$/)) {
    return binomial(string.length - hints.reduce((a, b) => a + b) + 1, hints.length)
  }

  if (string.match(/^\?+\#+/)) {
    const lens = [0, 0]
    let i = 0
    while(string.charAt(i) === '?') {
      lens[0]++
      i += 1
    }
    while(string.charAt(i) === '#') {
      lens[1]++
      i += 1
    }
    // console.log(lens)
    const range = hints[0] - lens[1]
    const remove = lens[0] - range
    if (hints[0] >= lens[0] && remove > 0) {
      return solve(string.substring(remove), hints)
    }
  }


  if (string.match(/\#+\?+$/)) {
    const lens = [0, 0]
    let i = string.length - 1
    while(string.charAt(i) === '?') {
      lens[0]++
      i -= 1
    }
    while(string.charAt(i) === '#') {
      lens[1]++
      i -= 1
    }
    const range = hints.at(-1) - lens[1]
    const remove = lens[0] - range
    if (hints.at(-1) >= lens[0] && remove > 0) {
      return solve(string.substring(0, string.length - remove), hints)
    }
  }

  const substrings = string.split('.').filter(s => s !== '')

  if (substrings[0].length < hints[0]) {
    return solve(string.substring(substrings[0].length + 1), hints)
  }

  if (substrings.at(-1).length < hints.at(-1)) {
    return solve(string.substring(0, string.length - substrings.at(-1).length - 1), hints)
  }

  if (substrings.length > 1) {
    if (withoutFirstBlock(string).length < minRequiredSpace && hints[0] + hints[1] + 1 > substrings[0].length) {
      // console.log('used untested')
      return solve(substrings[0], [hints[0]])
        * solve(string.substring(string.length - withoutFirstBlock(string).length), arrayWithoutElement(hints, 0))
    }

    // console.log(withoutLastBlock(string), minRequiredSpace)

    if (withoutLastBlock(string).length < minRequiredSpace && hints.at(-1) + hints.at(-2) + 1 > substrings.at(-1).length) {
      // console.log('used untested 2')
      return solve(substrings.at(-1), [hints.at(-1)])
        * solve(string.substring(0, withoutLastBlock(string).length), arrayWithoutElement(hints, hints.length - 1))
    }
  }

  // if (substrings[0].match(/^\?*$/)) {
  //   return binomial()
  // }
  // console.log('Failed', string, hints)
  // console.log('Solving with brute force: length', string.length)
  // return solveWithBF(string, hints)
  const maxValue = hints.reduce((a, b) => Math.max(a, b), 0)
  console.log(substrings.filter(s => s.length >= maxValue))
  console.log(hints.filter(h => h === maxValue))
  if (hints.filter(h => h === maxValue).length === substrings.filter(s => s.length === maxValue).length) {
    console.log('complicated 1')
    let i = 0
    let result = 1
    let curString = ''
    const splitHints = splitArray(hints, maxValue)

    substrings.forEach(s => {
      if (s.length >= maxValue) {
        if (curString !== '') {
          result *= solve(curString, splitHints[i++])
          curString = ''
        }
        result *= solve(s, splitHints[i++])
      } else {
        curString += s + '.'
      }
    })
    if (curString !== '') {
      result *= solve(curString, splitHints[i++])
    }
    return result
  }

  if (substrings.length === 1) {
    const blocks = string.match(/(.)\1*/g).map((block, i, arr) => {
      if (block.charAt(0) === '#') {
        return block
      }
      if (i === 0 || i === arr.length - 1) {
        return block.substring(1)
      }
      return block.substring(2)
    })
    console.log(blocks)
    if (hints.filter(h => h === maxValue).length === blocks.filter(s => s.length === maxValue).length) {
      console.log('complicated 2')
      let result = 1
      const splitHints = splitArray(hints, maxValue)
      splitHints.forEach((newHints, i) => {
        const partResult = solve(blocks[i], newHints)
        console.log(partResult)
        result *= partResult
      })
      return result
    }
  }


  // console.log('failed')
  // console.log('Solving with brute force: length', string.length)
  // return solveWithBF(string, hints)

}

let sum = 0

// console.log('??..??...?##.?.??..??...?##.?.??..??...?##.?.??..??...?##.?.??..??..')
// console.log('??..??...?##.?.??..??...?##.?.??..??...?##.?.??..??...?##.?.??..??..'.replaceAll(/\.{2,}/g, '.'))

input.split('\n').forEach(line => {
  let [string, hints] = line.split(' ')
  string = `${string}?${string}?${string}?${string}?${string}`.replaceAll(/\.{2,}/g, '.')
  hints = `${hints},${hints},${hints},${hints},${hints}`
  hints = hints.split(',').map(n => parseInt(n, 10))
  // console.log(string, hints)
  const result = solve(string, hints)
  console.log('found result', result)
  // console.log('correct result', solveWithBF(string, hints))
  console.log('')

  sum += result
})

console.log(sum)


// ?.#?.??#?.??##?????.#?.??#?.??##?????.#?.??#?.??##?????.#?.??#?.??##?????.#?.??#?.??##???
// 1 22  22  1 55555 1 22  22  1 55555 1 22  22  1 55555 1 22  22  1 55555 1 22  22  1 55555
