const input = require("fs").readFileSync("inputs/2023/25.txt").toString();

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

const shortestPaths = {}

for (let i = 0; i < Object.values(nodes).length; i++) {
  const from = Object.values(nodes)[i]

  const queue = [[from.name]]
  const visited = new Set()
  while (queue.length > 0) {
    const cur = queue.pop()
    const latestName = cur.at(-1)

    if (visited.has(latestName)) {
      continue
    }

    const label = from.name < latestName ? `${from.name}-${latestName}` : `${latestName}-${from.name}`

    if (latestName !== from.name && !(label in shortestPaths)) {
      shortestPaths[label] = [...cur]
    }

    visited.add(latestName)
    nodes[latestName].neighbors.forEach(neighbor => {
      queue.unshift([...cur, neighbor])
    })
  }
}

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



filterEdge(...mostUsed[0].label.split('-'))
filterEdge(...mostUsed[1].label.split('-'))
filterEdge(...mostUsed[2].label.split('-'))

let visited = new Set()
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

console.log((Object.keys(nodes).length - visited.size) * visited.size)

