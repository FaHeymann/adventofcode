const input = require("fs").readFileSync("inputs/2023/15.txt").toString();

const hash = string => {
  let v = 0;
  string.split('').forEach(c => {
    v += c.charCodeAt(0)
    v *= 17
    v %= 256
  })
  return v
}

const map = {}

input.split(',').forEach(s => {
  let [_, label, op, number] = s.match(/([a-zA-Z]*)([-=])(.*)/)
  const box = hash(label)

  if (!map[box]) {
    map[box] = []
  }

  if (op === '=') {
    let found = map[box].some(item => {
      if (item[0] === label) {
        item[1] = parseInt(number, 10)
        return true
      }
    })
    if (!found) {
      map[box].push([label, parseInt(number, 10)])
    }
  } else {
    map[box] = map[box].filter(x => x[0] !== label)
  }
})

let count = 0

Object.entries(map).forEach(([key, items]) => {
  items.forEach((item, i) => {
    count += (parseInt(key, 10) + 1) * (i + 1) * item[1]
  })
})


console.log(count)
