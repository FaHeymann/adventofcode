package cmd

import (
	"fmt"
	"os"
	"strings"

	"github.com/spf13/cobra"
)

var c201508Cmd = &cobra.Command{
	Use:   "c201508",
	Short: "",
	Long:  "",
	Run: func(cmd *cobra.Command, args []string) {
		input, _ := os.ReadFile("../inputs/2015/8.txt")

		sum, sum2 := 0, 0

		for _, line := range strings.Split(string(input), "\n") {
			chars := strings.Split(line, "")
			count, count2 := 0, 2
			for i := 0; i < len(chars); i++ {
				if chars[i] == "\"" {
					continue
				}
				if chars[i] == "\\" && chars[i+1] == "x" {
					i += 3
				} else if chars[i] == "\\" {
					i += 1
				}
				count++
			}
			for i := 0; i < len(chars); i++ {
				if chars[i] == "\"" || chars[i] == "\\" {
					count2 += 1
				}
				count2 += 1
			}
			sum += len(chars) - count
			sum2 += count2 - len(chars)
		}
		fmt.Println("Answer 1", sum)
		fmt.Println("Answer 2", sum2)
	},
}

func init() {
	rootCmd.AddCommand(c201508Cmd)
}
