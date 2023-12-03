const input = require("fs").readFileSync("inputs/2023/19.txt").toString();

const [workflowsRaw, partsRaw] = input.split('\n\n')

const parts = partsRaw.split('\n').map(line => ({
  x: parseInt(line.match(/x=(.*?),/)[1], 10),
  m: parseInt(line.match(/m=(.*?),/)[1], 10),
  a: parseInt(line.match(/a=(.*?),/)[1], 10),
  s: parseInt(line.match(/s=(.*?)\}/)[1], 10),
}))

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

let sum = 0

parts.forEach(part => {
  let state = 'in'
  while (!['A', 'R'].includes(state)) {
    const workflow = workflows[state]
    const ruleMatch = workflow.rules.some(rule => {
      if (rule.comparator === '>') {
        if (part[rule.element] > rule.threshold) {
          state = rule.target
          return true
        }
      }
      if (rule.comparator === '<') {
        if (part[rule.element] < rule.threshold) {
          state = rule.target
          return true
        }
      }
    })
    if (!ruleMatch) {
      state = workflow.default
    }
  }
  if (state === 'A') {
    sum += part.x + part.m + part.a + part.s
  }
})

console.log(sum)
