package cmd

import (
	"fmt"
	"os"
	"strings"

	"github.com/spf13/cobra"
)

var c201501Cmd = &cobra.Command{
	Use:   "c201501",
	Short: "",
	Long:  "",
	Run: func(cmd *cobra.Command, args []string) {
		input, _ := os.ReadFile("../inputs/2015/1.txt")

		count := 0
		printedAnswer2 := false

		for index, char := range strings.Split(string(input), "") {
			if char == "(" {
				count += 1
			} else {
				count -= 1
			}
			if count == -1 && !printedAnswer2 {
				fmt.Println("Answer 2", index)
				printedAnswer2 = true
			}
		}

		fmt.Println("Answer 1", count)
	},
}

func init() {
	rootCmd.AddCommand(c201501Cmd)
}
