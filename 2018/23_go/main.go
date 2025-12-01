package main

import (
	"fmt"
	"math"
	"os"
	"strings"
)

func getExample() string {
	return `pos=<10,12,12>, r=2
pos=<12,14,12>, r=2
pos=<16,12,12>, r=4
pos=<14,14,14>, r=6
pos=<50,50,50>, r=200
pos=<10,10,10>, r=5`
}

func getInput() string {
	rawInput, _ := os.ReadFile("../inputs/2018/23.txt")
	return string(rawInput)
}

type NanoBot struct {
	x, y, z, r int
}

func abs(x int) int {
	if x < 0 {
		return -x
	}
	return x
}

func min(x, y int) int {
	if x < y {
		return x
	}
	return y
}

func main() {
	//input := getExample()
	input := getInput()

	bots := []NanoBot{}

	for _, line := range strings.Split(input, "\n") {
		x, y, z, r := 0, 0, 0, 0
		fmt.Sscanf(line, "pos=<%d,%d,%d>, r=%d", &x, &y, &z, &r)

		bots = append(bots, NanoBot{x, y, z, r})
	}

	gxMin, gxMax, gyMin, gyMax, gzMin, gzMax := math.MinInt, math.MaxInt, math.MinInt, math.MaxInt, math.MinInt, math.MaxInt

	for i, b1 := range bots {
		for j := 0; j < i; j++ {
			b2 := bots[j]
			distance := abs(b1.x-b2.x) + abs(b1.y-b2.y) + abs(b1.z-b2.z)
			if distance == b1.r+b2.r {
				fmt.Println("Perfect distance:", b1, b2)
				fmt.Println(i, j)

				if b1.x < b2.x {
					xMin := max(b1.x, b2.x-b2.r)
					xMax := min(b2.x, b1.x+b1.r)
					fmt.Println(xMin, xMax)
					gxMin = max(gxMin, xMin)
					gxMax = min(gxMax, xMax)
				} else {
					xMin := max(b2.x, b1.x-b1.r)
					xMax := min(b1.x, b2.x+b2.r)
					fmt.Println(xMin, xMax)
					gxMin = max(gxMin, xMin)
					gxMax = min(gxMax, xMax)
				}
				if b1.y < b2.y {
					yMin := max(b1.y, b2.y-b2.r)
					yMax := min(b2.y, b1.y+b1.r)
					fmt.Println(yMin, yMax)
					gyMin = max(gyMin, yMin)
					gyMax = min(gyMax, yMax)
				} else {
					yMin := max(b2.y, b1.y-b1.r)
					yMax := min(b1.y, b2.y+b2.r)
					fmt.Println(yMin, yMax)
					gyMin = max(gyMin, yMin)
					gyMax = min(gyMax, yMax)
				}
				if b1.z < b2.z {
					zMin := max(b1.z, b2.z-b2.r)
					zMax := min(b2.z, b1.z+b1.r)
					fmt.Println(zMin, zMax)
					gzMin = max(gzMin, zMin)
					gzMax = min(gzMax, zMax)
				} else {
					zMin := max(b2.z, b1.z-b1.r)
					zMax := min(b1.z, b2.z+b2.r)
					fmt.Println(zMin, zMax)
					gzMin = max(gzMin, zMin)
					gzMax = min(gzMax, zMax)
				}
			}
		}
	}
	fmt.Println(gxMin, gxMax, gyMin, gyMax, gzMin, gzMax)
}
