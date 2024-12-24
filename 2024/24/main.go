package main

import (
	"fmt"
	"os"
	"slices"
	"strconv"
	"strings"
)

func getInput() string {
	rawInput, _ := os.ReadFile("../inputs/2024/24.txt")
	return string(rawInput)
}

type Rule struct {
	left  string
	op    string
	right string
}

func resolveWire(
	wire string,
	register map[string]bool,
	rules map[string]Rule,
	visited map[string]bool,
) bool {
	if val, ok := register[wire]; ok {
		return val
	}

	if _, ok := visited[wire]; ok {
		return false
	}
	visited[wire] = true

	result := resolveRule(rules[wire], register, rules, visited)
	register[wire] = result
	return result
}

func resolveRule(
	rule Rule,
	register map[string]bool,
	rules map[string]Rule,
	visited map[string]bool,
) bool {
	left := resolveWire(rule.left, register, rules, visited)
	right := resolveWire(rule.right, register, rules, visited)

	switch rule.op {
	case "AND":
		return left && right
	case "OR":
		return left || right
	case "XOR":
		return left != right
	default:
		panic("Unknown operator")
	}
}

func calcResult(register map[string]bool) int64 {
	number := int64(0)
	for wire, val := range register {
		if strings.HasPrefix(wire, "z") {
			pos, _ := strconv.Atoi(wire[1:])
			if val {
				number += int64(1 << pos)
			}
		}
	}
	return number
}

func testCase(
	register map[string]bool,
	rules map[string]Rule,
	digit int,
	xValue bool,
	yValue bool,
	expectedZ bool,
	expectedZ2 bool,
) bool {
	x := fmt.Sprintf("x%02d", digit)
	y := fmt.Sprintf("y%02d", digit)
	z := fmt.Sprintf("z%02d", digit)
	z2 := fmt.Sprintf("z%02d", digit+1)

	testRegister := map[string]bool{}

	for k := range register {
		testRegister[k] = false
	}
	testRegister[x] = xValue
	testRegister[y] = yValue

	resolveWire(z, testRegister, rules, map[string]bool{})
	resolveWire(z2, testRegister, rules, map[string]bool{})

	return testRegister[z] == expectedZ && testRegister[z2] == expectedZ2
}

func testDigit(register map[string]bool, rules map[string]Rule, digit int) bool {
	if !testCase(register, rules, digit, false, false, false, false) {
		return false
	}

	if !testCase(register, rules, digit, true, false, true, false) {
		return false
	}
	if !testCase(register, rules, digit, false, true, true, false) {
		return false
	}
	if !testCase(register, rules, digit, true, true, false, true) {
		return false
	}

	return true
}

func failsAtDigit(register map[string]bool, rules map[string]Rule, from int) int {
	for i := from; i <= 44; i++ {
		result := testDigit(register, rules, i)
		if !result {
			return i
		}
	}
	return -1
}

func swapRules(rules map[string]Rule, i1 string, i2 string) map[string]Rule {
	newRules := map[string]Rule{}

	for k, v := range rules {
		if k == i1 {
			newRules[i2] = Rule{v.left, v.op, v.right}
		} else if k == i2 {
			newRules[i1] = Rule{v.left, v.op, v.right}
		} else {
			newRules[k] = Rule{v.left, v.op, v.right}
		}
	}

	return newRules
}

func main() {
	input := getInput()

	inputParts := strings.Split(input, "\n\n")

	register := map[string]bool{}
	register2 := map[string]bool{}
	rules := map[string]Rule{}

	for _, line := range strings.Split(inputParts[0], "\n") {
		parsed := strings.Split(line, ": ")
		register[parsed[0]] = parsed[1] == "1"
		register2[parsed[0]] = parsed[1] == "1"
	}

	needsResolving := []string{}

	for _, line := range strings.Split(inputParts[1], "\n") {
		if line == "" {
			continue
		}
		parsed := strings.Split(line, " -> ")
		ruleParts := strings.Split(parsed[0], " ")
		rules[parsed[1]] = Rule{ruleParts[0], ruleParts[1], ruleParts[2]}
		needsResolving = append(needsResolving, parsed[1])
	}

	// part 1
	for _, wire := range needsResolving {
		resolveWire(wire, register2, rules, map[string]bool{})
	}
	fmt.Println(calcResult(register2))

	// part 2
	swapCollector := []string{}

iteration:
	for iteration := 0; iteration < 4; iteration++ {

		failsAt := failsAtDigit(register, rules, 0)

		for key := range rules {
			for key2 := range rules {
				newRules := swapRules(rules, key, key2)
				newResult := failsAtDigit(register, newRules, failsAt-1)

				if newResult == -1 {
					swapCollector = append(swapCollector, key, key2)
					break iteration
				}

				if newResult > failsAt+2 {
					rules = newRules
					swapCollector = append(swapCollector, key, key2)
					fmt.Println("Swapping", key, key2)
					continue iteration
				}
			}
		}
	}

	slices.Sort(swapCollector)
	fmt.Println(strings.Join(swapCollector, ","))
}
