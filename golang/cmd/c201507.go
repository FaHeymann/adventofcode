package cmd

import (
	"fmt"
	"os"
	"regexp"
	"strconv"
	"strings"

	"github.com/spf13/cobra"
)

type Gate struct {
	result  int
	resolve func() int
}

func resolve(value string, register map[string]Gate) int {
	literalRegex := regexp.MustCompile(`^[0-9]+$`)
	if literalRegex.MatchString(value) {
		result, _ := strconv.Atoi(value)
		return result
	}
	return register[value].resolve()
}

var c201507Cmd = &cobra.Command{
	Use:   "c201507",
	Short: "",
	Long:  "",
	Run: func(cmd *cobra.Command, args []string) {
		input, _ := os.ReadFile("../inputs/2015/7.txt")

		literalRegex := regexp.MustCompile(`^[0-9a-z]+$`)
		andRegex := regexp.MustCompile(`(.+) AND (.+)`)
		orRegex := regexp.MustCompile(`(.+) OR (.+)`)
		notRegex := regexp.MustCompile(`NOT (.+)`)
		lshiftRegex := regexp.MustCompile(`(.+) LSHIFT (.+)`)
		rshiftRegex := regexp.MustCompile(`(.+) RSHIFT (.+)`)

		register := make(map[string]Gate)

		for _, line := range strings.Split(string(input), "\n") {
			parts := strings.Split(line, " -> ")

			if literalRegex.MatchString(parts[0]) {
				gate := Gate{
					result: -1,
				}
				gate.resolve = func() int {
					if gate.result > -1 {
						return gate.result
					}
					gate.result = resolve(parts[0], register)

					return gate.result
				}
				register[parts[1]] = gate
			}

			if andRegex.MatchString(parts[0]) {
				gate := Gate{
					result: -1,
				}
				gate.resolve = func() int {
					if gate.result > -1 {
						return gate.result
					}
					subParts := andRegex.FindStringSubmatch(parts[0])
					gate.result = resolve(subParts[1], register) & resolve(subParts[2], register)

					return gate.result
				}
				register[parts[1]] = gate
			}

			if orRegex.MatchString(parts[0]) {
				gate := Gate{
					result: -1,
				}
				gate.resolve = func() int {
					if gate.result > -1 {
						return gate.result
					}
					subParts := orRegex.FindStringSubmatch(parts[0])
					gate.result = resolve(subParts[1], register) | resolve(subParts[2], register)

					return gate.result
				}
				register[parts[1]] = gate
			}

			if notRegex.MatchString(parts[0]) {
				gate := Gate{
					result: -1,
				}
				gate.resolve = func() int {
					if gate.result > -1 {
						return gate.result
					}
					subParts := notRegex.FindStringSubmatch(parts[0])
					gate.result = resolve(subParts[1], register) ^ 0xFFFF

					return gate.result
				}
				register[parts[1]] = gate
			}

			if lshiftRegex.MatchString(parts[0]) {
				gate := Gate{
					result: -1,
				}
				gate.resolve = func() int {
					if gate.result > -1 {
						return gate.result
					}
					subParts := lshiftRegex.FindStringSubmatch(parts[0])
					gate.result = resolve(subParts[1], register) << resolve(subParts[2], register)

					return gate.result
				}
				register[parts[1]] = gate
			}

			if rshiftRegex.MatchString(parts[0]) {
				gate := Gate{
					result: -1,
				}
				gate.resolve = func() int {
					if gate.result > -1 {
						return gate.result
					}
					subParts := rshiftRegex.FindStringSubmatch(parts[0])
					gate.result = resolve(subParts[1], register) >> resolve(subParts[2], register)

					return gate.result
				}
				register[parts[1]] = gate
			}

		}

		fmt.Println(register)
		// fmt.Println(register["x"].resolve())
		// fmt.Println(register["y"].resolve())
		// fmt.Println(register["d"].resolve())
		// fmt.Println(register["e"].resolve())
		// fmt.Println(register["h"].resolve())
		// fmt.Println(register["i"].resolve())
		// fmt.Println(register["f"].resolve())
		// fmt.Println(register["g"].resolve())

		answer1 := register["a"].resolve()

		fmt.Println("Answer 1", answer1)

		for key, value := range register {
			fmt.Println(key)
			fmt.Println(key == "b")
			if key == "b" {
				value.result = answer1
			} else {
				value.result = -1
			}
			fmt.Println(value)
		}

		fmt.Println(register["a"])
		fmt.Println(register["b"])

		fmt.Println("Answer 2", register["a"].resolve())

	},
}

func init() {
	rootCmd.AddCommand(c201507Cmd)
}
