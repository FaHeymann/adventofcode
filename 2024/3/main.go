package main

import (
	"fmt"
	"os"
	"regexp"
	"strconv"
)

func main() {
	rawInput, _ := os.ReadFile("../inputs/2024/3.txt")
	input := string(rawInput)

	mulRegex, _ := regexp.Compile("^mul\\(([0-9]{1,3}),([0-9]{1,3})\\)")
	doRegex, _ := regexp.Compile("^do\\(\\)")
	dontRegex, _ := regexp.Compile("^don't\\(\\)")

	count1 := 0
	count2 := 0
	do := true

	for input != "" {
		match := mulRegex.FindStringSubmatch(input)
		if match != nil {
			n1, _ := strconv.Atoi(match[1])
			n2, _ := strconv.Atoi(match[2])
			count1 += n1 * n2
			if do {
				count2 += n1 * n2
			}
		}
		if doRegex.MatchString(input) {
			do = true
		}
		if dontRegex.MatchString(input) {
			do = false
		}
		input = input[1:]
	}

	fmt.Println(count1, count2)
}
