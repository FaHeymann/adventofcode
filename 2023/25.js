// approach: find shortest paths between all pairs of nodes
// find edges that are most often part of those
// test what happens if top 3 are removed

const input = `jqt: rhn xhk nvd
rsh: frs pzl lsr
xhk: hfx
cmg: qnr nvd lhk bvb
rhn: xhk bvb hfx
bvb: xhk hfx
pzl: lsr hfx nvd
qnr: nvd
ntq: jqt hfx bvb xhk
nvd: lhk
lsr: lhk
rzs: qnr cmg lsr rsh
frs: qnr lhk lsr`

// const input = require("fs").readFileSync("inputs/2023/25.txt").toString();

const nodes = {}

input.split('\n').forEach(line => {
  const [node, edges] = line.split(': ')
  if (!(node in nodes)) {
    nodes[node] = { name: node, neighbors: [] }
  }
  edges.split(' ').forEach(edge => {
    if (!(edge in nodes)) {
      nodes[edge] = { name: edge, neighbors: [] }
    }
    nodes[node].neighbors.push(edge)
    nodes[edge].neighbors.push(node)
  })
})

console.log(nodes)

const shortestPaths = {}

for (let i = 0; i < Object.values(nodes).length; i++) {
  for (let j = 0; j < i; j++) {
    const from = Object.values(nodes)[i]
    const to = Object.values(nodes)[j]

    const queue = [[from.name]]
    const visited = new Set()
    while (true) {
      // console.log(queue)
      const cur = queue.pop()
      const latestName = cur.at(-1)
      if (latestName === to.name) {
        shortestPaths[`${from.name}-${to.name}`] = cur
        break
      }
      if (visited.has(latestName)) {
        continue
      }
      visited.add(latestName)
      nodes[latestName].neighbors.forEach(neighbor => {
        queue.unshift([...cur, neighbor])
      })
    }
  }
}

console.log(shortestPaths)

const edges = {}

Object.values(shortestPaths).forEach(path => {
  for (let i = 0; i < path.length - 1; i++) {
    const n1 = path[i]
    const n2 = path[i + 1]
    const label = n1 < n2 ? `${n1}-${n2}` : `${n2}-${n1}`
    if (!edges[label]) {
      edges[label] = { label, value: 0 }
    }
    edges[label].value += 1
  }
})

const mostUsed = Object.values(edges).sort((a, b) => a.value < b.value ? 1 : -1)

const filterEdge = (n1, n2) => {
  nodes[n1].neighbors = nodes[n1].neighbors.filter(n => n !== n2)
  nodes[n2].neighbors = nodes[n2].neighbors.filter(n => n !== n1)
}


console.log(mostUsed)

filterEdge(...mostUsed[0].label.split('-'))
filterEdge(...mostUsed[1].label.split('-'))
filterEdge(...mostUsed[2].label.split('-'))

console.log(nodes)

let visited = new Set()
// visited.add(Object.keys(nodes)[0])
const queue = [Object.keys(nodes)[0]]

while (queue.length > 0) {
  const cur = queue.pop()
  if (visited.has(cur)) {
    continue
  }
  visited.add(cur)
  nodes[cur].neighbors.forEach(neighbor => {
    queue.unshift(neighbor)
  })
}

console.log(visited.size)
console.log(Object.keys(nodes).length - visited.size)
console.log((Object.keys(nodes).length - visited.size) * visited.size)

