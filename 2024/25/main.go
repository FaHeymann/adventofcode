package main

import (
	"fmt"
	"os"
	"strings"
)

func getInput() string {
	rawInput, _ := os.ReadFile("../inputs/2024/25.txt")
	return string(rawInput)
}

func getExample() string {
	return `#####
.####
.####
.####
.#.#.
.#...
.....

#####
##.##
.#.##
...##
...#.
...#.
.....

.....
#....
#....
#...#
#.#.#
#.###
#####

.....
.....
#.#..
###..
###.#
###.#
#####

.....
.....
.....
#....
#.#..
#.#.#
#####`
}

func main() {
	input := getInput()
	//input := getExample()

	keys := [][]int{}
	locks := [][]int{}

	rawSchemas := strings.Split(input, "\n\n")
	for _, schema := range rawSchemas {
		lines := strings.Split(schema, "\n")
		grid := [][]string{}
		for _, line := range lines {
			grid = append(grid, strings.Split(line, ""))
		}
		isLock := lines[0] == "#####"
		ids := []int{}

		if isLock {
			for x := 0; x < len(grid[0]); x++ {
				for y := 0; y < len(grid); y++ {
					if grid[y][x] != "#" {
						ids = append(ids, y-1)
						break
					}
				}
			}
			locks = append(locks, ids)
		} else {

			for x := 0; x < len(grid[0]); x++ {
				for y := len(grid) - 1; y >= 0; y-- {
					if grid[y][x] != "#" {
						ids = append(ids, 5-y)
						break
					}
				}
			}
			keys = append(keys, ids)
		}
	}

	count := 0

	for _, key := range keys {
	locks:
		for _, lock := range locks {
			for i := 0; i < 5; i++ {
				if key[i]+lock[i] > 5 {
					continue locks
				}
			}
			count++
		}
	}
	fmt.Println(count)
}
