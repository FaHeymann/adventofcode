package main

import (
	"fmt"
	"os"
	"strings"
)

func canMove(grid [][]string, y int, x int, dy int, dx int) bool {
	if grid[y+dy][x+dx] == "#" {
		return false
	}
	if grid[y+dy][x+dx] == "O" {
		return canMove(grid, y+dy, x+dx, dy, dx)
	}
	return true
}

func move(grid [][]string, y int, x int, dy int, dx int) (int, int) {
	if !canMove(grid, y, x, dy, dx) {
		return y, x
	}

	if grid[y+dy][x+dx] == "O" {
		move(grid, y+dy, x+dx, dy, dx)
	}
	grid[y+dy][x+dx] = grid[y][x]

	return y + dy, x + dx
}

func canMoveHorizontally(grid [][]string, y int, x int, dx int) bool {
	if grid[y][x+dx] == "#" {
		return false
	}
	if grid[y][x+dx] == "[" || grid[y][x+dx] == "]" {
		return canMoveHorizontally(grid, y, x+dx, dx)
	}
	return true
}

func moveHorizontally(grid [][]string, y int, x int, dx int) (int, int) {
	if !canMoveHorizontally(grid, y, x, dx) {
		return y, x
	}

	if grid[y][x+dx] == "[" || grid[y][x+dx] == "]" {
		moveHorizontally(grid, y, x+dx, dx)
	}
	grid[y][x+dx] = grid[y][x]

	return y, x + dx
}

func canMoveVertically(grid [][]string, y int, x int, dy int) bool {
	if grid[y+dy][x] == "#" {
		return false
	}
	if grid[y+dy][x] == "[" {
		return canMoveVertically(grid, y+dy, x, dy) &&
			canMoveVertically(grid, y+dy, x+1, dy)
	}
	if grid[y+dy][x] == "]" {
		return canMoveVertically(grid, y+dy, x-1, dy) &&
			canMoveVertically(grid, y+dy, x, dy)
	}
	return true
}

func moveVertically(grid [][]string, initialY int, initialX int, dy int) (int, int) {
	if !canMoveVertically(grid, initialY, initialX, dy) {
		return initialY, initialX
	}

	queue, stack := [][2]int{}, [][2]int{}
	queue, stack = append(queue, [2]int{initialY + dy, initialX}), append(queue, [2]int{initialY + dy, initialX})
	for len(queue) > 0 {
		y, x := queue[0][0], queue[0][1]
		queue = queue[1:]
		if grid[y][x] == "[" {
			queue = append(queue, [2]int{y + dy, x})
			queue = append(queue, [2]int{y + dy, x + 1})
			stack = append(stack, [2]int{y + dy, x})
			stack = append(stack, [2]int{y + dy, x + 1})
		}
		if grid[y][x] == "]" {
			queue = append(queue, [2]int{y + dy, x})
			queue = append(queue, [2]int{y + dy, x - 1})
			stack = append(stack, [2]int{y + dy, x})
			stack = append(stack, [2]int{y + dy, x - 1})
		}
	}
	for len(stack) > 0 {
		y, x := stack[len(stack)-1][0], stack[len(stack)-1][1]
		stack = stack[:len(stack)-1]
		if grid[y][x] == "[" {
			grid[y+dy][x] = grid[y][x]
			grid[y+dy][x+1] = grid[y][x+1]
			grid[y][x] = "."
			grid[y][x+1] = "."
		}
		if grid[y][x] == "]" {
			grid[y+dy][x] = grid[y][x]
			grid[y+dy][x-1] = grid[y][x-1]
			grid[y][x] = "."
			grid[y][x-1] = "."
		}
	}

	return initialY + dy, initialX
}

func printGrid(grid [][]string, y int, x int) {
	for curY, line := range grid {
		str := ""
		for curX, char := range line {
			if curY == y && curX == x {
				str += "@"
			} else {
				str += char
			}
		}
		fmt.Println(str)
	}
}

func calculateSum(grid [][]string) int {
	sum := 0
	for y, row := range grid {
		for x, char := range row {
			if char == "O" || char == "[" {
				sum += 100*y + x
			}
		}
	}
	return sum
}

func main() {
	rawInput, _ := os.ReadFile("../inputs/2024/15.txt")
	input := string(rawInput)

	inputSections := strings.Split(input, "\n\n")

	y, x, y2, x2 := 0, 0, 0, 0
	grid, grid2 := [][]string{}, [][]string{}

	for yGrid, line := range strings.Split(inputSections[0], "\n") {
		lineArray, lineArray2 := []string{}, []string{}
		for xGrid, char := range strings.Split(line, "") {
			if char == "@" {
				y, x = yGrid, xGrid
				y2, x2 = yGrid, xGrid*2
				lineArray = append(lineArray, ".")
				lineArray2 = append(lineArray2, ".", ".")
			} else if char == "#" {
				lineArray = append(lineArray, char)
				lineArray2 = append(lineArray2, "#", "#")
			} else if char == "O" {
				lineArray = append(lineArray, char)
				lineArray2 = append(lineArray2, "[", "]")
			} else {
				lineArray = append(lineArray, char)
				lineArray2 = append(lineArray2, ".", ".")
			}
		}
		grid = append(grid, lineArray)
		grid2 = append(grid2, lineArray2)
	}

	for _, command := range strings.Split(inputSections[1], "") {
		if command == "<" {
			y, x = move(grid, y, x, 0, -1)
			y2, x2 = moveHorizontally(grid2, y2, x2, -1)
		}
		if command == ">" {
			y, x = move(grid, y, x, 0, 1)
			y2, x2 = moveHorizontally(grid2, y2, x2, 1)
		}
		if command == "^" {
			y, x = move(grid, y, x, -1, 0)
			y2, x2 = moveVertically(grid2, y2, x2, -1)
		}
		if command == "v" {
			y, x = move(grid, y, x, 1, 0)
			y2, x2 = moveVertically(grid2, y2, x2, 1)
		}
	}

	fmt.Println(calculateSum(grid), calculateSum(grid2))
}
