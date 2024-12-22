package main

import (
	"fmt"
	"os"
	"strconv"
	"strings"
)

func getInput() string {
	rawInput, _ := os.ReadFile("../inputs/2024/22.txt")
	return string(rawInput)
}

func getExample() string {
	return `1
10
100
2024`
}

func getExample2() string {
	return `1
2
3
2024`
}

func nextNumber(n int) int {
	n = (n ^ (n * 64)) % 16777216
	n = (n ^ (n / 32)) % 16777216
	n = (n ^ (n * 2048)) % 16777216

	return n
}

func setMapIfEmpty(m map[string]int, key string, value int) {
	if _, ok := m[key]; !ok {
		m[key] = value
	}
}

func calcChangeMap(n int) map[string]int {
	changeMap := map[string]int{}

	changes := [4]int{}

	for i := 0; i < 2000; i++ {
		last := n % 10
		n = nextNumber(n)
		if i > 2 {
			changes[0] = changes[1]
		}
		if i > 1 {
			changes[1] = changes[2]
		}
		if i > 0 {
			changes[2] = changes[3]
		}
		changes[3] = int((n % 10) - last)

		if i > 2 {
			setMapIfEmpty(
				changeMap,
				fmt.Sprintf("%d,%d,%d,%d", changes[0], changes[1], changes[2], changes[3]),
				n%10,
			)
		}
	}

	return changeMap
}

func main() {
	input := getInput()

	sum := 0
	changeMap := map[string]int{}

	for _, line := range strings.Split(input, "\n") {
		if line == "" {
			continue
		}

		n, _ := strconv.Atoi(line)

		monkeyChangeMap := calcChangeMap(n)
		for k, v := range monkeyChangeMap {
			changeMap[k] = changeMap[k] + v
		}

		for i := 0; i < 2000; i++ {
			n = nextNumber(n)
		}
		sum += n

	}
	fmt.Println(sum)

	max := -1000
	for _, v := range changeMap {
		if v > max {
			max = v
		}
	}
	fmt.Println(max)
}
