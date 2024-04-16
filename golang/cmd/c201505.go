package cmd

import (
	"fmt"
	"os"
	"slices"
	"strings"

	"github.com/spf13/cobra"
)

func isNice(input string) bool {
	forbidden := [4][2]string{{"a", "b"}, {"c", "d"}, {"p", "q"}, {"x", "y"}}

	vowelCount := 0
	doubleChar := false
	lastChar := ""
	for index, char := range strings.Split(input, "") {
		if slices.Contains([]string{"a", "e", "i", "o", "u"}, char) {
			vowelCount++
		}
		if index > 0 {
			if lastChar == char {
				doubleChar = true
			}
			for _, forbiddenPair := range forbidden {
				if lastChar == forbiddenPair[0] && char == forbiddenPair[1] {
					return false
				}
			}
		}

		lastChar = char
	}

	return doubleChar && vowelCount > 2
}

func isNice2(input string) bool {
	foundPair := false
	foundRepeat := false

	chars := strings.Split(input, "")

outer:
	for i := 3; i < len(chars); i++ {
		for j := 1; j < i-1; j++ {
			if chars[i] == chars[j] && chars[i-1] == chars[j-1] {
				foundPair = true
				break outer
			}
		}
	}

	for i := 2; i < len(chars); i++ {
		if chars[i] == chars[i-2] {
			foundRepeat = true
			break
		}
	}
	return foundPair && foundRepeat
}

var c201505Cmd = &cobra.Command{
	Use:   "c201505",
	Short: "",
	Long:  "",
	Run: func(cmd *cobra.Command, args []string) {
		input, _ := os.ReadFile("../inputs/2015/5.txt")

		count := 0
		count2 := 0

		for _, cur := range strings.Split(string(input), "\n") {
			if isNice(cur) {
				count++
			}
			if isNice2(cur) {
				count2++
			}
		}
		fmt.Println("Answer 1", count)
		fmt.Println("Answer 2", count2)
	},
}

func init() {
	rootCmd.AddCommand(c201505Cmd)
}
