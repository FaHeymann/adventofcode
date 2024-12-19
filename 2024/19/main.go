package main

import (
	"fmt"
	"os"
	"strings"
)

func getInput() string {
	rawInput, _ := os.ReadFile("../inputs/2024/19.txt")
	return string(rawInput)
}

func getExample() string {
	return `r, wr, b, g, bwu, rb, gb, br

brwrr
bggr
gbbr
rrbgbr
ubwu
bwurrg
brgr
bbrgwb`
}

func buildable(pattern string, towels []string, cache map[string]int) int {
	if v, ok := cache[pattern]; ok {
		return v
	}
	if pattern == "" {
		cache[pattern] = 1
		return 1
	}
	possibilities := 0
	for _, towel := range towels {
		if strings.HasPrefix(pattern, towel) {
			possibilities += buildable(pattern[len(towel):], towels, cache)
		}
	}

	cache[pattern] = possibilities
	return possibilities
}

func main() {
	input := getInput()

	splitInput := strings.Split(input, "\n\n")
	towels := strings.Split(splitInput[0], ", ")

	cache := map[string]int{}

	count, count2 := 0, 0
	for _, pattern := range strings.Split(splitInput[1], "\n") {
		if pattern == "" {
			continue
		}

		possibilities := buildable(pattern, towels, cache)

		if possibilities > 0 {
			count++
		}
		count2 += possibilities
	}

	fmt.Println(count, count2)
}
