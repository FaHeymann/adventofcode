package main

import (
	"fmt"
	"strconv"
	"strings"
)

func incrementMap(m map[int]int, key int, amount int) {
	if _, ok := m[key]; ok {
		m[key] += amount
	} else {
		m[key] = amount
	}
}

func blink(stones map[int]int) map[int]int {
	newStones := map[int]int{}
	for stone, amount := range stones {
		s := strconv.Itoa(stone)
		if stone == 0 {
			incrementMap(newStones, 1, amount)
		} else if len(s)%2 == 0 {
			p1, _ := strconv.Atoi(s[:len(s)/2])
			p2, _ := strconv.Atoi(s[len(s)/2:])

			incrementMap(newStones, p1, amount)
			incrementMap(newStones, p2, amount)
		} else {
			incrementMap(newStones, stone*2024, amount)
		}
	}
	return newStones
}

func countStones(stones map[int]int) int {
	count := 0
	for _, amount := range stones {
		count += amount
	}
	return count
}

func main() {
	input := "28 4 3179 96938 0 6617406 490 816207"
	stones := map[int]int{}

	for _, v := range strings.Split(input, " ") {
		s, _ := strconv.Atoi(v)
		stones[s] = 1
	}

	for i := 0; i < 25; i++ {
		stones = blink(stones)
	}

	fmt.Println(countStones(stones))

	for i := 0; i < 50; i++ {
		stones = blink(stones)
	}

	fmt.Println(countStones(stones))
}
