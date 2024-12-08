package main

import (
	"fmt"
	"os"
	"strconv"
	"strings"
)

func nextField(y, x int, direction string) (int, int) {
	moveMap := map[string][2]int{"U": {-1, 0}, "D": {1, 0}, "L": {0, -1}, "R": {0, 1}}
	move := moveMap[direction]

	return y + move[0], x + move[1]
}

func nextDirection(direction string) string {
	dirMap := map[string]string{"U": "R", "R": "D", "D": "L", "L": "U"}
	return dirMap[direction]
}

func visitedBefore(visited map[string]bool, y, x int, direction string) bool {
	_, ok := visited[fmt.Sprintf("%d,%d,%s", y, x, direction)]
	return ok
}

func step(grid [][]string, x, y int, direction string) (bool, int, int, string) {
	nextY, nextX := nextField(y, x, direction)
	if nextY < 0 || nextX < 0 || nextY >= len(grid) || nextX >= len(grid[0]) {
		return true, y, x, direction
	}
	if grid[nextY][nextX] == "." {
		return false, nextY, nextX, direction
	} else {
		return false, y, x, nextDirection(direction)
	}
}

func cloneGridWithObstacle(grid [][]string, obsY, obsX int) [][]string {
	newGrid := [][]string{}
	for y, line := range grid {
		newLine := []string{}
		for x, char := range line {
			if y == obsY && x == obsX {
				newLine = append(newLine, "#")
			} else {
				newLine = append(newLine, char)
			}
		}
		newGrid = append(newGrid, newLine)
	}
	return newGrid
}

func solve(grid [][]string, curY, curX int, curDirection string) (bool, map[string]bool) {
	visitedWithDir := map[string]bool{}
	visitedWithoutDir := map[string]bool{}
	done := false

	for !visitedBefore(visitedWithDir, curY, curX, curDirection) {
		visitedWithDir[fmt.Sprintf("%d,%d,%s", curY, curX, curDirection)] = true
		visitedWithoutDir[fmt.Sprintf("%d,%d", curY, curX)] = true

		done, curY, curX, curDirection = step(grid, curX, curY, curDirection)

		if done {
			return false, visitedWithoutDir
		}
	}

	return true, visitedWithoutDir
}

func main() {
	rawInput, _ := os.ReadFile("../inputs/2024/6.txt")
	input := string(rawInput)

	lines := strings.Split(input, "\n")
	grid := [][]string{}

	startY, startX, curDirection := 0, 0, "U"

	for y, line := range lines {
		if line == "" {
			continue
		}
		lineArray := []string{}
		for x, char := range strings.Split(line, "") {
			if char == "^" {
				startY, startX = y, x
				lineArray = append(lineArray, ".")
			} else {
				lineArray = append(lineArray, char)
			}
		}
		grid = append(grid, lineArray)
	}

	count := 0

	_, tiles := solve(grid, startY, startX, curDirection)

	fmt.Println(len(tiles))

	for key := range tiles {
		coords := strings.Split(key, ",")
		y, _ := strconv.Atoi(coords[0])
		x, _ := strconv.Atoi(coords[1])

		if y == startY && x == startX {
			continue
		}

		hasLoop, _ := solve(cloneGridWithObstacle(grid, y, x), startY, startX, curDirection)

		if hasLoop {
			count++
		}

	}

	fmt.Println(count)
}

func isEmpty(grid [][]string, y, x int) bool {
	if x < 0 || y < 0 || y >= len(grid) || x >= len(grid[0]) {
		return false
	}
	return grid[y][x] == "."
}
