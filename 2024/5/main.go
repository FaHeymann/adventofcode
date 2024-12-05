package main

import (
	"fmt"
	"os"
	"slices"
	"sort"
	"strconv"
	"strings"
)

func toIntSlice(s string, separator string) []int {
	var result []int
	for _, v := range strings.Split(s, separator) {
		i, _ := strconv.Atoi(v)
		result = append(result, i)
	}
	return result
}

func hasRule(rules map[int][]int, left int, right int) bool {
	val, _ := rules[left]

	return slices.Contains(val, right)
}

func main() {
	rawInput, _ := os.ReadFile("../inputs/2024/5.txt")
	input := string(rawInput)

	parts := strings.Split(input, "\n\n")

	rawRules := strings.Split(parts[0], "\n")
	rawUpdates := strings.Split(parts[1], "\n")

	rules := map[int][]int{}
	updates := [][]int{}

	for _, rule := range rawRules {
		parts := toIntSlice(rule, "|")

		_, ok := rules[parts[0]]
		if ok {
			rules[parts[0]] = append(rules[parts[0]], parts[1])
		} else {
			rules[parts[0]] = []int{parts[1]}
		}

	}

	for _, update := range rawUpdates {
		if update == "" {
			continue
		}

		updates = append(updates, toIntSlice(update, ","))
	}

	sum, sum2 := 0, 0

	for _, line := range updates {
		valid := true
	outer:
		for right := 1; right < len(line); right++ {
			for left := 0; left < right; left++ {
				if !hasRule(rules, line[left], line[right]) {
					valid = false
					break outer
				}
			}
		}

		if valid {
			sum += line[len(line)/2]
		} else {
			sort.Slice(line, func(i, j int) bool {
				return hasRule(rules, line[i], line[j])
			})

			sum2 += line[len(line)/2]
		}
	}

	fmt.Println(sum)
	fmt.Println(sum2)
}
