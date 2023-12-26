const input = `1,0,1~1,2,1
0,0,2~2,0,2
0,2,3~2,2,3
0,0,4~0,2,4
2,0,5~2,2,5
0,1,6~2,1,6
1,1,8~1,1,9`

// const input = require("fs").readFileSync("inputs/2023/22.txt").toString();

const blockMap = {}

const blocks = input.split('\n').map((line, i) => {
  const [min, max] = line.split('~')
  const [minX, minY, minZ] = min.split(',').map(n => parseInt(n, 10))
  const [maxX, maxY, maxZ] = max.split(',').map(n => parseInt(n, 10))
  return { x: [minX, maxX], y: [minY, maxY], z: [minZ, maxZ], i, below: [], above: [] }
  // , below: new Set(), above: new Set()
})

blocks.forEach(block => {
  blockMap[block.i] = block
})

blocks.sort((a, b) => a.z[0] < b.z[0] ? -1 : 1)

const findBlocksBelow = (block) => {
  let found = []
  blocks.forEach(otherBlock => {
    if (block.z[0] !== otherBlock.z[1] + 1) {
      return
    }
    outer: for (let y = block.y[0]; y <= block.y[1]; y++) {
      for (let x = block.x[0]; x <= block.x[1]; x++) {
        if (x >= otherBlock.x[0] && x <= otherBlock.x[1] && y >= otherBlock.y[0] && y <= otherBlock.y[1]) {
          found.push(otherBlock.i)
          break outer
        }
      }
    }
  })
  return found
}

const tryFall = (block) => {
  if (block.z[0] === 1) {
    return false
  }
  const below = findBlocksBelow(block)

  if (below.length === 0) {
    block.z[0] -= 1
    block.z[1] -= 1
    // console.log(block.i, 'fell')
    return true
  }

  block.below = below
  below.forEach(index => {
    blockMap[index].above.push(block.i)
  })

  return false
}

blocks.forEach(block => {
  while(tryFall(block)) {}
  // console.log()
})

// console.log(blocks)

let count = 0

blocks.forEach(block => {
  let canBeRemoved = true
  block.above.some(i => {
    if (blockMap[i].below.length === 1) {
      canBeRemoved = false
      return true
    }
  })
  if (canBeRemoved) {
    count++
  }
  // console.log('Block', block.i, canBeRemoved)
})

console.log(count)

// const step = () => {
//   for (let i = 0; i < blocks.length; i++) {
//     const 
//   }
// }

