package main

import (
	"fmt"
	"os"
	"strings"
)

type robot struct {
	pX, pY, vX, vY int
}

func (robot *robot) move(maxX int, maxY int) {
	robot.pX += robot.vX
	robot.pY += robot.vY

	for robot.pX < 0 {
		robot.pX += maxX
	}
	for robot.pY < 0 {
		robot.pY += maxY
	}

	robot.pX %= maxX
	robot.pY %= maxY
}

func print(maxX int, maxY int, robots []robot) {
	for y := 0; y < maxY; y++ {
		lineString := ""
		for x := 0; x < maxX; x++ {
			found := false
			for _, robot := range robots {
				if robot.pX == x && robot.pY == y {
					lineString += "#"
					found = true
					break
				}
			}
			if !found {
				lineString += "."
			}
		}
		lineString += " " + fmt.Sprint(y)
		fmt.Println(lineString)
	}
}

func main() {
	rawInput, _ := os.ReadFile("../inputs/2024/14.txt")
	input := string(rawInput)

	maxX, maxY := 101, 103
	lines := strings.Split(input, "\n")
	robots := []robot{}

	for _, line := range lines {
		if line == "" {
			continue
		}
		var pX, pY, vX, vY int

		fmt.Sscanf(line, "p=%d,%d v=%d,%d", &pX, &pY, &vX, &vY)

		robots = append(robots, robot{pX, pY, vX, vY})
	}

	for j := 1; j < 10000; j++ {
		for i := range robots {
			robots[i].move(maxX, maxY)
		}
		countInZone := 0
		for _, robot := range robots {
			if robot.pY > 20 && robot.pY < 54 && robot.pX > 23 && robot.pX < 54 {
				countInZone++
			}
			if countInZone > 300 {
				fmt.Println(j)
				print(maxX, maxY, robots)
				break
			}
		}

		if j == 100 {
			quadrants := [4]int{0, 0, 0, 0}

			for _, robot := range robots {
				if robot.pX < maxX/2 && robot.pY < maxY/2 {
					quadrants[0]++
				} else if robot.pX > maxX/2 && robot.pY < maxY/2 {
					quadrants[1]++
				} else if robot.pX < maxX/2 && robot.pY > maxY/2 {
					quadrants[2]++
				} else if robot.pX > maxX/2 && robot.pY > maxY/2 {
					quadrants[3]++
				}
			}

			fmt.Println(quadrants[0] * quadrants[1] * quadrants[2] * quadrants[3])
		}

	}
}
