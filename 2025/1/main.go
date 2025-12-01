package main

import (
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	rawInput, _ := os.ReadFile("../inputs/2025/1.txt")
	input := string(rawInput)

	lines := strings.Split(input, "\n")

	fmt.Println(lines)

	position := 50
	count := 0
	count2 := 0

	for _, line := range lines {
		if line == "" {
			continue
		}
		operation := line[0:1]
		value, _ := strconv.Atoi(line[1:])
		lastPositionZero := position == 0
		if operation == "R" {
			position += value
		} else {
			position -= value
		}
		for position < 0 {
			position += 100
			if lastPositionZero {
				lastPositionZero = false
			} else {
				count2++
			}
		}
		for position > 100 {
			position -= 100
			count2++
		}
		if position == 100 {
			position = 0
		}
		if position == 0 {
			count++
			count2++
		}
	}

	fmt.Println(count)
	fmt.Println(count2)
}
