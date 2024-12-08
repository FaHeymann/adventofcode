package main

import (
	"fmt"
	"os"
	"strings"
)

type Position struct {
	y int
	x int
}

func main() {
	rawInput, _ := os.ReadFile("../inputs/2024/8.txt")
	input := string(rawInput)

	antennas := map[string][]Position{}
	antinodes, antinodes2 := map[string]bool{}, map[string]bool{}
	maxY, maxX := 0, 0

	for y, line := range strings.Split(input, "\n") {
		if line == "" {
			continue
		}
		maxY = y
		for x, char := range strings.Split(line, "") {
			maxX = x
			if char != "." {
				_, ok := antennas[char]
				if ok {
					antennas[char] = append(antennas[char], Position{y, x})
				} else {
					antennas[char] = []Position{{y, x}}
				}
			}
		}
	}

	for _, positions := range antennas {
		for _, pos1 := range positions {
			for _, pos2 := range positions {
				if pos1 == pos2 {
					continue
				}
				diffY, diffX := pos1.y-pos2.y, pos1.x-pos2.x

				// part 1
				tagetY, targetX := pos1.y+diffY, pos1.x+diffX
				if tagetY >= 0 && tagetY <= maxY && targetX >= 0 && targetX <= maxX {
					antinodes[fmt.Sprintf("%d,%d", tagetY, targetX)] = true
				}

				// part 2
				curY, curX := pos1.y, pos1.x
				for curY >= 0 && curY <= maxY && curX >= 0 && curX <= maxX {
					antinodes2[fmt.Sprintf("%d,%d", curY, curX)] = true
					curY += diffY
					curX += diffX
				}
			}
		}
	}

	fmt.Println(len(antinodes), len(antinodes2))
}
