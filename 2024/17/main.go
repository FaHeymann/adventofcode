package main

import (
	"fmt"
	"math"
	"strconv"
	"strings"
)

//func getInput() string {
//	rawInput, _ := os.ReadFile("../inputs/2024/17.txt")
//	return string(rawInput)
//}

func getInput() string {
	return `Register A: 28066687
Register B: 0
Register C: 0

Program: 2,4,1,1,7,5,4,6,0,3,1,4,5,5,3,0`
}

func getExample() string {
	return `Register A: 729
Register B: 0
Register C: 0

Program: 0,1,5,4,3,0`
}

func getComboOperand(operand int, a int, b int, c int) int {
	if operand < 4 {
		return operand
	} else if operand == 4 {
		return a
	} else if operand == 5 {
		return b
	} else if operand == 6 {
		return c
	}

	panic("Invalid operand")
}

func run(a int, program []int) []int {
	pointer := 0

	output := []int{}
	b, c := 0, 0

	for pointer < len(program) {
		instruction := program[pointer]
		operand := program[pointer+1]

		if instruction == 0 {
			a = a / int(math.Pow(2.0, float64(getComboOperand(operand, a, b, c))))
			pointer += 2
		} else if instruction == 1 {
			b = b ^ operand
			pointer += 2
		} else if instruction == 2 {
			b = getComboOperand(operand, a, b, c) % 8
			pointer += 2
		} else if instruction == 3 {
			if a != 0 {
				pointer = operand
			} else {
				pointer += 2
			}
		} else if instruction == 4 {
			b = b ^ c
			pointer += 2
		} else if instruction == 5 {
			output = append(output, getComboOperand(operand, a, b, c)%8)
			pointer += 2
		} else if instruction == 6 {
			b = a / int(math.Pow(2.0, float64(getComboOperand(operand, a, b, c))))
			pointer += 2
		} else if instruction == 7 {
			c = a / int(math.Pow(2.0, float64(getComboOperand(operand, a, b, c))))
			pointer += 2
		}
	}
	return output
}

func main() {
	input := getInput()

	program := []int{}
	a, b, c := 0, 0, 0

	for _, line := range strings.Split(input, "\n") {
		if strings.HasPrefix(line, "Register A:") {
			fmt.Sscanf(line, "Register A: %d", &a)
		} else if strings.HasPrefix(line, "Register B:") {
			fmt.Sscanf(line, "Register B: %d", &b)
		} else if strings.HasPrefix(line, "Register C:") {
			fmt.Sscanf(line, "Register C: %d", &c)
		} else if strings.HasPrefix(line, "Program:") {
			programString := ""
			fmt.Sscanf(line, "Program: %s", &programString)
			for _, numStr := range strings.Split(programString, ",") {
				num, _ := strconv.Atoi(numStr)
				program = append(program, num)
			}
		}
	}

	resultStr := ""
	for i, val := range run(a, program) {
		if i > 0 {
			resultStr += ","
		}
		resultStr += strconv.Itoa(val)
	}
	fmt.Println(resultStr)

	i := int(math.Pow(2.0, 3.0*float64(len(program)-1)))
outer:
	for true {
		result := run(i, program)

		for j := len(program) - 1; j >= 0; j-- {
			if result[j] != program[j] {
				i += int(math.Pow(2.0, 3.0*float64(j)))
				continue outer
			}
		}

		fmt.Println(i)
		break
	}
}
