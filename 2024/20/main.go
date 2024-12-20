package main

import (
	"fmt"
	"os"
	"strings"
)

func getInput() string {
	rawInput, _ := os.ReadFile("../inputs/2024/20.txt")
	return string(rawInput)
}

func getExample() string {
	return `###############
#...#...#.....#
#.#.#.#.#.###.#
#S#...#.#.#...#
#######.#.#.###
#######.#.#...#
#######.#.###.#
###..E#...#...#
###.#######.###
#...###...#...#
#.#####.#.###.#
#.#...#.#.#...#
#.#.#.#.#.#.###
#...#...#...###
###############`
}

type Point struct {
	y, x int
}

func abs(a int) int {
	if a < 0 {
		return -a
	}
	return a
}

func calcDistances(distances map[Point]int, y, x, d int, grid [][]string) {
	if y < 0 || y >= len(grid) || x < 0 || x >= len(grid[0]) {
		return
	}

	if grid[y][x] == "#" {
		return
	}

	if _, ok := distances[Point{y, x}]; ok {
		return
	}

	distances[Point{y, x}] = d

	calcDistances(distances, y+1, x, d+1, grid)
	calcDistances(distances, y-1, x, d+1, grid)
	calcDistances(distances, y, x+1, d+1, grid)
	calcDistances(distances, y, x-1, d+1, grid)
}

func main() {
	input := getInput()
	//input := getExample()
	yStart, xStart, yEnd, xEnd := 0, 0, 0, 0

	grid := [][]string{}
	for y, line := range strings.Split(input, "\n") {
		if line == "" {
			continue
		}
		lineArr := []string{}
		for x, char := range line {
			if char == 'S' {
				yStart, xStart = y, x
				lineArr = append(lineArr, ".")
			} else if char == 'E' {
				yEnd, xEnd = y, x
				lineArr = append(lineArr, ".")
			} else {
				lineArr = append(lineArr, string(char))
			}
		}
		grid = append(grid, lineArr)
	}

	distancesStart := map[Point]int{}
	distancesEnd := map[Point]int{}

	calcDistances(distancesStart, yStart, xStart, 0, grid)
	calcDistances(distancesEnd, yEnd, xEnd, 0, grid)
	normalDistance := distancesStart[Point{yEnd, xEnd}]

	count, count2 := 0, 0

	for pStart, dStart := range distancesStart {
		for pEnd, dEnd := range distancesEnd {
			directDistance := abs(pStart.y-pEnd.y) + abs(pStart.x-pEnd.x)
			if directDistance <= 20 {
				totalDistance := dStart + dEnd + directDistance
				distanceSaved := normalDistance - totalDistance
				if distanceSaved >= 100 {
					if directDistance == 2 {
						count++
					}
					count2++
				}
			}
		}
	}

	fmt.Println(count, count2)
}
