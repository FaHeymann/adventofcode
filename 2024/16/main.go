package main

import (
	"fmt"
	"os"
	"sort"
	"strings"
)

func getInput() string {
	rawInput, _ := os.ReadFile("../inputs/2024/16.txt")
	return string(rawInput)
}

func getExample() string {
	return `###############
#.......#....E#
#.#.###.#.###.#
#.....#.#...#.#
#.###.#####.#.#
#.#.#.......#.#
#.#.#####.###.#
#...........#.#
###.#.#####.#.#
#...#.....#.#.#
#.#.#.###.#.#.#
#.....#...#.#.#
#.###.#.#.#.#.#
#S..#.....#...#
###############`
}

func getExample2() string {
	return `#################
#...#...#...#..E#
#.#.#.#.#.#.#.#.#
#.#.#.#...#...#.#
#.#.#.#.###.#.#.#
#...#.#.#.....#.#
#.#.#.#.#.#####.#
#.#...#.#.#.....#
#.#.#####.#.###.#
#.#.#.......#...#
#.#.###.#####.###
#.#.#...#.....#.#
#.#.#.#####.###.#
#.#.#.........#.#
#.#.#.#########.#
#S#.............#
#################`
}

type Position struct {
	y        int
	x        int
	d        string
	distance int
	history  map[string]bool
}

func getClosest(queue []Position) Position {
	sort.Slice(queue, func(i, j int) bool {
		return queue[i].distance < queue[j].distance
	})
	element := queue[0]
	queue = queue[1:]
	return element
}

func copyAndAppendHistory(history map[string]bool, y int, x int) map[string]bool {
	newHistory := map[string]bool{}
	for k, v := range history {
		newHistory[k] = v
	}
	newHistory[fmt.Sprintf("%d-%d", y, x)] = true
	return newHistory
}

func abs(a int) int {
	if a < 0 {
		return -a
	}
	return a
}

func printSolution(grid [][]string, bestSpots map[string]bool) {
	for y, line := range grid {
		for x, char := range line {
			if _, ok := bestSpots[fmt.Sprintf("%d-%d", y, x)]; ok {
				fmt.Print("O")
			} else {
				fmt.Print(char)
			}
		}
		fmt.Println("")
	}
}

type PriorityQueue struct {
	items       map[int][]Position
	minDistance int
}

func NewPriorityQueue() *PriorityQueue {
	return &PriorityQueue{
		items:       map[int][]Position{},
		minDistance: 0,
	}
}

func (pq *PriorityQueue) Push(item Position) {
	if pq.items[item.distance] == nil {
		pq.items[item.distance] = []Position{}
	}
	pq.items[item.distance] = append(pq.items[item.distance], item)
}

func (pq *PriorityQueue) Pop() Position {
	for len(pq.items[pq.minDistance]) == 0 {
		pq.minDistance++
	}

	item := pq.items[pq.minDistance][0]
	pq.items[pq.minDistance] = pq.items[pq.minDistance][1:]
	return item
}

func main() {
	input := getInput()

	lines := strings.Split(input, "\n")
	grid := [][]string{}

	yStart, xStart, yTarget, xTarget := 0, 0, 0, 0
	d := "E"
	for y, line := range lines {
		lineArray := []string{}
		for x, char := range strings.Split(line, "") {
			if char == "S" {
				yStart, xStart = y, x
				lineArray = append(lineArray, ".")
			} else if char == "E" {
				yTarget, xTarget = y, x
				lineArray = append(lineArray, ".")
			} else {
				lineArray = append(lineArray, char)
			}
		}
		grid = append(grid, lineArray)
	}

	queue := NewPriorityQueue()
	queue.Push(Position{
		y:        yStart,
		x:        xStart,
		d:        d,
		distance: 0,
		history:  map[string]bool{fmt.Sprintf("%d-%d", yStart, xStart): true},
	})
	completed := map[string]int{}

	bestDistance := 1000000000
	foundBestDistance := false

	bestSpots := map[string]bool{}

	for true {
		current := queue.Pop()

		completedVal, ok := completed[fmt.Sprintf("%d-%d-%s", current.y, current.x, current.d)]
		if ok && completedVal <= current.distance {
			for index, q := range queue.items[current.distance+1] {
				if ((abs(q.y-current.y) == 1 && q.x == current.x) || (abs(q.x-current.x) == 1 && q.y == current.y)) && q.d == current.d {
					for key, value := range current.history {
						queue.items[current.distance+1][index].history[key] = value
					}
				}
			}
			continue
		}

		if grid[current.y][current.x] == "#" {
			continue
		}

		if current.y == yTarget && current.x == xTarget {
			fmt.Println(current.distance)

			for key, value := range current.history {
				bestSpots[key] = value
			}

			if !foundBestDistance {
				foundBestDistance = true
				bestDistance = current.distance
			}
		}

		if foundBestDistance && current.distance > bestDistance {
			break
		}

		completed[fmt.Sprintf("%d-%d-%s", current.y, current.x, current.d)] = current.distance

		if current.d == "E" {
			queue.Push(Position{
				y: current.y, x: current.x + 1, d: "E", distance: current.distance + 1,
				history: copyAndAppendHistory(current.history, current.y, current.x+1),
			})
			queue.Push(Position{
				y: current.y, x: current.x, d: "S", distance: current.distance + 1000,
				history: current.history,
			})
			queue.Push(Position{
				y: current.y, x: current.x, d: "N", distance: current.distance + 1000,
				history: current.history,
			})
		}

		if current.d == "W" {
			queue.Push(Position{
				y: current.y, x: current.x - 1, d: "W", distance: current.distance + 1,
				history: copyAndAppendHistory(current.history, current.y, current.x-1),
			})
			queue.Push(Position{
				y: current.y, x: current.x, d: "S", distance: current.distance + 1000,
				history: current.history,
			})
			queue.Push(Position{
				y: current.y, x: current.x, d: "N", distance: current.distance + 1000,
				history: current.history,
			})
		}

		if current.d == "N" {
			queue.Push(Position{
				y: current.y - 1, x: current.x, d: "N", distance: current.distance + 1,
				history: copyAndAppendHistory(current.history, current.y-1, current.x),
			})
			queue.Push(Position{
				y: current.y, x: current.x, d: "E", distance: current.distance + 1000,
				history: current.history,
			})
			queue.Push(Position{
				y: current.y, x: current.x, d: "W", distance: current.distance + 1000,
				history: current.history,
			})
		}
		if current.d == "S" {
			queue.Push(Position{
				y: current.y + 1, x: current.x, d: "S", distance: current.distance + 1,
				history: copyAndAppendHistory(current.history, current.y+1, current.x),
			})
			queue.Push(Position{
				y: current.y, x: current.x, d: "E", distance: current.distance + 1000,
				history: current.history,
			})
			queue.Push(Position{
				y: current.y, x: current.x, d: "W", distance: current.distance + 1000,
				history: current.history,
			})
		}
	}

	fmt.Println(len(bestSpots))
	// printSolution(grid, bestSpots)
}
