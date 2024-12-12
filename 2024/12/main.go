package main

import (
	"fmt"
	"os"
	"strings"
)

type region struct {
	crop      string
	perimeter int
	area      int
	corners   int
}

func getCrop(grid [][]string, y int, x int) string {
	if y < 0 || y >= len(grid) || x < 0 || x >= len(grid[0]) {
		return "_"
	}
	return grid[y][x]
}

func isOuterCorner(grid [][]string, y int, x int, dy int, dx int, regionCrop string) bool {
	return regionCrop != getCrop(grid, y+dy, x) && regionCrop != getCrop(grid, y, x+dx)
}

func isInnerCorner(grid [][]string, y int, x int, dy int, dx int, regionCrop string) bool {
	return getCrop(grid, y+dy, x) == regionCrop &&
		getCrop(grid, y, x+dx) == regionCrop &&
		getCrop(grid, y+dy, x+dx) != regionCrop
}

func solve(grid [][]string, region *region, y int, x int, visited map[string]bool) {
	if getCrop(grid, y, x) != region.crop {
		return
	}
	if ok, _ := visited[fmt.Sprintf("%d,%d", y, x)]; ok {
		return
	}

	visited[fmt.Sprintf("%d,%d", y, x)] = true

	region.area++

	for _, d := range [][2]int{{-1, 0}, {1, 0}, {0, -1}, {0, 1}} {
		if getCrop(grid, y+d[0], x+d[1]) != region.crop {
			region.perimeter++
		}
	}

	for _, d := range [][2]int{{-1, -1}, {-1, 1}, {1, -1}, {1, 1}} {
		if isOuterCorner(grid, y, x, d[0], d[1], region.crop) {
			region.corners++
		}
		if isInnerCorner(grid, y, x, d[0], d[1], region.crop) {
			region.corners++
		}
	}

	for _, d := range [][2]int{{-1, 0}, {1, 0}, {0, -1}, {0, 1}} {
		solve(grid, region, y+d[0], x+d[1], visited)
	}
}

func main() {
	rawInput, _ := os.ReadFile("../inputs/2024/12.txt")
	input := string(rawInput)

	grid := [][]string{}
	visited := map[string]bool{}
	regions := []region{}

	for _, line := range strings.Split(input, "\n") {
		if line == "" {
			continue
		}
		grid = append(grid, strings.Split(line, ""))
	}

	for y, row := range grid {
		for x, cell := range row {
			if ok, _ := visited[fmt.Sprintf("%d,%d", y, x)]; ok {
				continue
			}

			region := region{crop: cell, perimeter: 0, area: 0, corners: 0}
			solve(grid, &region, y, x, visited)
			regions = append(regions, region)
		}
	}

	sum, sum2 := 0, 0
	for _, region := range regions {
		sum += region.area * region.perimeter
		sum2 += region.area * region.corners
	}
	fmt.Println(sum, sum2)
}
