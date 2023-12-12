const input = require("fs").readFileSync("inputs/2023/12.txt").toString();

// const input = `???.### 1,1,3
// .??..??...?##. 1,1,3
// ?#?#?#?#?#?#?#? 1,3,1,6
// ????.#...#... 4,1,1
// ????.######..#####. 1,6,5
// ?###???????? 3,2,1`

const check = (string, hints) => {
  // console.log(string)
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

// const solve = (string, hints) => {
//   // console.log('solve', string, hints)
//   if (hints.length === 1) {
//     return string.length - hints[0] + 1
//   }
//   let optionsCount = 1

//   const substrings = string.split('.').filter(s => s !== '')
//   console.log(substrings)
//   if (substrings.length === hints.length) {
//     substrings.forEach((substring, i) => {
//       // console.log(solve(substring, [hints[i]]))
//       optionsCount *= solve(substring, [hints[i]])
//     })
//     return optionsCount
//   }
// }

let sum = 0;

input.split('\n').forEach(line => {
  let [string, hints] = line.split(' ')
  hints = hints.split(',').map(n => parseInt(n, 10))

  const count = solveWithBF(string, hints)

  console.log(count)

  sum += count

  console.log('\n')
})

console.log(sum)
