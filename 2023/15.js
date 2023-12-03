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

let count = 0

input.split(',').forEach(s => {
  count += hash(s)
})

console.log(count)
