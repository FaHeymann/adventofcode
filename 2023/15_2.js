const input = require("fs").readFileSync("inputs/2023/15.txt").toString();

// const input = 'rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7'

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
    console.log(found)
    if (!found) {
      map[box].push([label, parseInt(number, 10)])
    }
  } else {
    map[box] = map[box].filter(x => x[0] !== label)
  }
  // console.log(map)
})

let count = 0

Object.entries(map).forEach(([key, items]) => {
  // if (items.length === 0) {
  //   return
  // }
  items.forEach((item, i) => {
    console.log(parseInt(key, 10) + 1, i + 1, item[1])
    count += (parseInt(key, 10) + 1) * (i + 1) * item[1]
  })
})


console.log(count)
