package main

import (
	"fmt"
	"os"
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

func solve(result int, cur int, nums []int) bool {
	if len(nums) == 0 {
		return result == cur
	}

	return solve(result, cur+nums[0], nums[1:]) || solve(result, cur*nums[0], nums[1:])
}

func solve2(result int, cur int, nums []int) bool {
	if len(nums) == 0 {
		return result == cur
	}

	if cur > result {
		return false
	}

	next := nums[0]
	concat, _ := strconv.Atoi(fmt.Sprintf("%d%d", cur, next))

	return solve2(result, cur+next, nums[1:]) || solve2(result, cur*next, nums[1:]) || solve2(result, concat, nums[1:])
}

func main() {
	rawInput, _ := os.ReadFile("../inputs/2024/7.txt")
	input := string(rawInput)

	lines := strings.Split(input, "\n")

	sum, sum2 := 0, 0

	for _, line := range lines {
		if line == "" {
			continue
		}

		parts := strings.Split(line, ": ")
		result, _ := strconv.Atoi(parts[0])
		nums := toIntSlice(parts[1], " ")

		if solve(result, nums[0], nums[1:]) {
			sum += result
		}
		if solve2(result, nums[0], nums[1:]) {
			sum2 += result
		}
	}

	fmt.Println(sum, sum2)
}
