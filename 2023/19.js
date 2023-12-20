// const input = `px{a<2006:qkq,m>2090:A,rfg}
// pv{a>1716:R,A}
// lnx{m>1548:A,A}
// rfg{s<537:gd,x>2440:R,A}
// qs{s>3448:A,lnx}
// qkq{x<1416:A,crn}
// crn{x>2662:A,R}
// in{s<1351:px,qqz}
// qqz{s>2770:qs,m<1801:hdj,R}
// gd{a>3333:R,R}
// hdj{m>838:A,pv}

// {x=787,m=2655,a=1222,s=2876}
// {x=1679,m=44,a=2067,s=496}
// {x=2036,m=264,a=79,s=2244}
// {x=2461,m=1339,a=466,s=291}
// {x=2127,m=1623,a=2188,s=1013}`

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
  console.log(key, rulesRaw)
  const rules = rulesRaw.split(',')
  console.log(rules)
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

console.log(JSON.stringify(workflows, null, 2))
console.log(parts)

let sum = 0

parts.forEach(part => {
  let state = 'in'
  while (!['A', 'R'].includes(state)) {
    console.log(state)
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
  console.log(state)
})

console.log(sum)
