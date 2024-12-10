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

func solve(grid [][]int, y int, x int) int {
	visited := map[string]bool{}
	return solveRec(grid, visited, y, x, -1)
}

func solveRec(grid [][]int, visited map[string]bool, y int, x int, lastHeight int) int {
	if y < 0 || y >= len(grid) || x < 0 || x >= len(grid[0]) {
		return 0
	}

	curHeight := grid[y][x]

	if lastHeight+1 != curHeight {
		return 0
	}

	if ok, _ := visited[fmt.Sprintf("%d,%d", y, x)]; ok {
		return 0
	}
	visited[fmt.Sprintf("%d,%d", y, x)] = true

	if grid[y][x] == 9 {
		return 1
	}

	return solveRec(grid, visited, y-1, x, curHeight) +
		solveRec(grid, visited, y+1, x, curHeight) +
		solveRec(grid, visited, y, x-1, curHeight) +
		solveRec(grid, visited, y, x+1, curHeight)
}

func solve2(grid [][]int, y int, x int, lastHeight int) int {
	if y < 0 || y >= len(grid) || x < 0 || x >= len(grid[0]) {
		return 0
	}

	curHeight := grid[y][x]

	if lastHeight+1 != curHeight {
		return 0
	}

	if grid[y][x] == 9 {
		return 1
	}

	return solve2(grid, y-1, x, curHeight) +
		solve2(grid, y+1, x, curHeight) +
		solve2(grid, y, x-1, curHeight) +
		solve2(grid, y, x+1, curHeight)
}

func main() {
	rawInput, _ := os.ReadFile("../inputs/2024/10.txt")
	input := string(rawInput)

	grid := [][]int{}

	lines := strings.Split(input, "\n")

	for _, line := range lines {
		if line == "" {
			continue
		}

		grid = append(grid, toIntSlice(line, ""))
	}

	count, count2 := 0, 0

	for y, row := range grid {
		for x, val := range row {
			if val == 0 {
				count += solve(grid, y, x)
				count2 += solve2(grid, y, x, -1)
			}
		}
	}

	fmt.Println(count, count2)

}
