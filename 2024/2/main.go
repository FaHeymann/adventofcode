package main

import (
	"fmt"
	"os"
	"strconv"
	"strings"

	"github.com/faheymann/adventofcode/2024/utils"
)

func sign(x int) int {
	if x > 0 {
		return 1
	}
	if x < 0 {
		return -1
	}
	return 0
}

func toIntSlice(s string, separator string) []int {
	var result []int
	for _, v := range strings.Split(s, separator) {
		i, _ := strconv.Atoi(v)
		result = append(result, i)
	}
	return result
}

func isSafe(numbers []int) bool {
	safe := true
	foundSign := sign(numbers[1] - numbers[0])

	for i := 1; i < len(numbers); i++ {
		if sign(numbers[i]-numbers[i-1]) != foundSign || utils.Abs(numbers[i-1]-numbers[i]) > 3 || numbers[i] == numbers[i-1] {
			safe = false
			break
		}
	}
	return safe
}

func sliceWithoutElement(slice []int, index int) []int {
	ret := make([]int, 0)
	ret = append(ret, slice[:index]...)
	return append(ret, slice[index+1:]...)
}

func main() {
	rawInput, _ := os.ReadFile("../inputs/2024/2.txt")
	input := string(rawInput)

	lines := strings.Split(input, "\n")

	count1 := 0
	count2 := 0

	for _, line := range lines {
		if line == "" {
			continue
		}

		numbers := toIntSlice(line, " ")

		safe := isSafe(numbers)
		safe2 := false
		for i := 0; i < len(numbers); i++ {
			if isSafe(sliceWithoutElement(numbers, i)) {
				safe2 = true
				break
			}
		}

		if safe {
			count1++
		}
		if safe2 {
			count2++
		}
	}
	fmt.Println(count1)
	fmt.Println(count2)
}
