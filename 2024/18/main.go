package main

import (
	"fmt"
	"os"
	"strings"
)

func getInput() string {
	rawInput, _ := os.ReadFile("../inputs/2024/18.txt")
	return string(rawInput)
}

func getExample() string {
	return `5,4
4,2
4,5
3,0
2,1
6,3
2,4
1,5
0,6
3,3
2,6
5,1
1,2
5,5
2,5
6,5
1,4
0,4
6,4
1,1
6,1
1,0
0,5
1,6
2,0`
}

type Position struct {
	y    int
	x    int
	dist int
}

func main() {
	input := getInput()

	lines := strings.Split(input, "\n")
	corrupted := map[string]bool{}

	for i, line := range lines {
		if i == 1024 {
			break
		}
		corrupted[line] = true
	}

	y, x := 0, 0

	visited := map[string]bool{}
	queue := []Position{{y: y, x: x, dist: 0}}

	maxCoord := 70

	for len(queue) > 0 {
		cur := queue[0]
		queue = queue[1:]

		if cur.x < 0 || cur.y < 0 || cur.x > maxCoord || cur.y > maxCoord {
			continue
		}

		if corrupted[fmt.Sprintf("%d,%d", cur.y, cur.x)] {
			continue
		}

		if visited[fmt.Sprintf("%d,%d", cur.y, cur.x)] {
			continue
		}
		visited[fmt.Sprintf("%d,%d", cur.y, cur.x)] = true

		if cur.x == maxCoord && cur.y == maxCoord {
			fmt.Println("done")
			fmt.Println(cur.dist)
			break
		}
		queue = append(queue, Position{y: cur.y - 1, x: cur.x, dist: cur.dist + 1})
		queue = append(queue, Position{y: cur.y + 1, x: cur.x, dist: cur.dist + 1})
		queue = append(queue, Position{y: cur.y, x: cur.x - 1, dist: cur.dist + 1})
		queue = append(queue, Position{y: cur.y, x: cur.x + 1, dist: cur.dist + 1})
	}

}
