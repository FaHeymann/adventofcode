package main

import (
	"fmt"
	"os"
	"sort"
	"strconv"
	"strings"

	"github.com/faheymann/adventofcode/2024/utils"
)

func main() {
	rawInput, _ := os.ReadFile("../inputs/2024/1.txt")
	input := string(rawInput)

	lines := strings.Split(input, "\n")

	left := []int{}
	right := []int{}
	distribution := make(map[int]int)

	for _, line := range lines {
		if line == "" {
			continue
		}
		nums := strings.Split(line, "   ")
		num1, _ := strconv.Atoi(nums[0])
		num2, _ := strconv.Atoi(nums[1])

		utils.IncrementMap(distribution, num2)

		left = append(left, num1)
		right = append(right, num2)
	}

	sort.Slice(left, func(i, j int) bool {
		return left[i] < left[j]
	})
	sort.Slice(right, func(i, j int) bool {
		return right[i] < right[j]
	})

	diff := 0
	similarity := 0

	for i, num := range left {
		distVal, ok := distribution[num]
		if ok {
			similarity += num * distVal
		}
		diff += utils.Abs(num - right[i])
	}
	fmt.Println(diff)
	fmt.Println(similarity)
}
