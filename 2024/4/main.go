package main

import (
	"fmt"
	"os"
	"strings"
)

func isMatch(a string, b string) bool {
	return (a == "M" && b == "S") || (a == "S" && b == "M")
}

func checkPosition(y int, x int, array [][]string, match string) bool {
	return y >= 0 && x >= 0 && y < len(array) && x < len(array[y]) && array[y][x] == match
}

func checkRun(y int, x int, array [][]string, dy int, dx int) bool {
	return checkPosition(y+dy, x+dx, array, "M") && checkPosition(y+2*dy, x+2*dx, array, "A") && checkPosition(y+3*dy, x+3*dx, array, "S")
}

func main() {
	rawInput, _ := os.ReadFile("../inputs/2024/4.txt")
	input := string(rawInput)

	lines := strings.Split(input, "\n")
	array := [][]string{}

	for _, line := range lines {
		if line == "" {
			continue
		}
		array = append(array, strings.Split(line, ""))
	}

	count, count2 := 0, 0

	maxY := len(array) - 1
	maxX := len(array[0]) - 1

	for y := 0; y < len(array); y++ {
		for x := 0; x < len(array[y]); x++ {
			if array[y][x] == "X" {
				for dx := -1; dx <= 1; dx++ {
					for dy := -1; dy <= 1; dy++ {
						if !(dx == 0 && dy == 0) && checkRun(y, x, array, dy, dx) {
							count++
						}
					}
				}
			}

			if array[y][x] == "A" && y > 0 && x > 0 && y < maxY && x < maxX {
				if isMatch(array[y-1][x-1], array[y+1][x+1]) && isMatch(array[y-1][x+1], array[y+1][x-1]) {
					count2++
				}
			}
		}
	}

	fmt.Println(count)
	fmt.Println(count2)
}
