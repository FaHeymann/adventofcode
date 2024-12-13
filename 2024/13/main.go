package main

import (
	"fmt"
	"os"
	"strings"
)

type machine struct {
	ax, ay, bx, by, prizeX, prizeY int
}

func GCD(a, b int) int {
	for b != 0 {
		t := b
		b = a % b
		a = t
	}
	return a
}

func solve(m machine) int {
	gcd := GCD(m.ax, m.ay)

	scalingFactorX := m.ay / gcd
	scalingFactorY := m.ax / gcd

	scaledAX := scalingFactorX * m.ax
	scaledAY := scalingFactorY * m.ay

	scaledBX := scalingFactorX * m.bx
	scaledBY := scalingFactorY * m.by

	scaledPX := scalingFactorX * m.prizeX
	scaledPY := scalingFactorY * m.prizeY

	if scaledBX > scaledBY {
		if (scaledPX-scaledPY)%(scaledBX-scaledBY) != 0 {
			return -1
		}
		b := (scaledPX - scaledPY) / (scaledBX - scaledBY)
		if (scaledPY-scaledBY*b)%scaledAY != 0 {
			return -1
		}
		a := (scaledPY - scaledBY*b) / scaledAY
		return 3*a + b
	} else {
		if (scaledPY-scaledPX)%(scaledBY-scaledBX) != 0 {
			return -1
		}
		b := (scaledPY - scaledPX) / (scaledBY - scaledBX)
		if (scaledPX-scaledBX*b)%scaledAX != 0 {
			return -1
		}
		a := (scaledPX - scaledBX*b) / scaledAX
		return 3*a + b
	}
}

func main() {
	rawInput, _ := os.ReadFile("../inputs/2024/13.txt")
	input := string(rawInput)

	rawMachines := strings.Split(input, "\n\n")

	sum, sum2 := 0, 0

	for _, rawMachine := range rawMachines {
		m := machine{}

		lines := strings.Split(rawMachine, "\n")
		for _, line := range lines {
			if strings.HasPrefix(line, "Button A") {
				fmt.Sscanf(line, "Button A: X+%d, Y+%d", &m.ax, &m.ay)
			} else if strings.HasPrefix(line, "Button B") {
				fmt.Sscanf(line, "Button B: X+%d, Y+%d", &m.bx, &m.by)
			} else if strings.HasPrefix(line, "Prize") {
				fmt.Sscanf(line, "Prize: X=%d, Y=%d", &m.prizeX, &m.prizeY)
			}
		}

		result := solve(m)
		if result != -1 {
			sum += result
		}

		m.prizeX += 10000000000000
		m.prizeY += 10000000000000

		result = solve(m)
		if result != -1 {
			sum2 += result
		}
	}
	fmt.Println(sum, sum2)
}
