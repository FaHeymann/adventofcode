const input = require("fs").readFileSync("inputs/2023/19.txt").toString();

const [workflowsRaw, _] = input.split('\n\n')

const workflows = {}

workflowsRaw.split('\n').forEach(line => {
  const [_, key, rulesRaw] = line.match(/(.*?)\{(.*)\}/)
  const rules = rulesRaw.split(',')
  workflows[key] = {
    default: rules.pop(),
    rules: rules.map(r => {
      const [rule, target] = r.split(':')
      const [_, element, comparator, threshold] = rule.match(/^(.*?)([\<\>])(.*)$/)
      return {
        element,
        comparator,
        threshold: parseInt(threshold, 10),
        target,
      }
    })
  }
})

const start = { x: [1, 4000], m: [1, 4000], a: [1, 4000], s: [1, 4000] }

const queue = [[start, 'in']]

const accepted = []
let i = 0
while (queue.length > 0) {
  i++
  const [cur, state] = queue.pop()

  if (state === 'A') {
    accepted.push(cur)
    continue
  }
  if (state === 'R') {
    continue
  }

  const workflow = workflows[state]
  workflow.rules.forEach(rule => {
    if (rule.comparator === '>') {
      if (cur[rule.element][1] <= rule.threshold) {
        return
      }
      if (cur[rule.element][0] > rule.threshold) {
        queue.push([cur, rule.target])
        return
      }
      const copy = JSON.parse(JSON.stringify(cur))
      copy[rule.element][0] = rule.threshold + 1
      queue.push([copy, rule.target])
      cur[rule.element][1] = rule.threshold
    }
    if (rule.comparator === '<') {
      if (cur[rule.element][0] >= rule.threshold) {
        return
      }
      if (cur[rule.element][1] < rule.threshold) {
        queue.push([cur, rule.target])
        return
      }
      const copy = JSON.parse(JSON.stringify(cur))
      copy[rule.element][1] = rule.threshold - 1
      queue.push([copy, rule.target])
      cur[rule.element][0] = rule.threshold
    }
  })
  queue.push([cur, workflow.default])
}

let count = 0

accepted.forEach(el => {
  count += (el.x[1] - el.x[0] + 1) * (el.m[1] - el.m[0] + 1) * (el.a[1] - el.a[0] + 1) * (el.s[1] - el.s[0] + 1)
})

console.log(count)
