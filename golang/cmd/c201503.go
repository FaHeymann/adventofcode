package cmd

import (
	"fmt"
	"os"
	"strings"

	"github.com/spf13/cobra"
)

var c201503Cmd = &cobra.Command{
	Use:   "c201503",
	Short: "",
	Long:  "",
	Run: func(cmd *cobra.Command, args []string) {
		input, _ := os.ReadFile("../inputs/2015/3.txt")

		directions := strings.Split(string(input), "")

		visited := make(map[string]bool)
		visited2 := make(map[string]bool)
		y := 0
		x := 0
		y1 := 0
		x1 := 0
		x2 := 0
		y2 := 0
		visited[fmt.Sprintf("%d-%d", y, x)] = true
		visited2[fmt.Sprintf("%d-%d", y, x)] = true

		for index, cur := range directions {
			y, x = move(y, x, cur)
			visited[fmt.Sprintf("%d-%d", y, x)] = true

			if index%2 == 0 {
				y1, x1 = move(y1, x1, cur)
				visited2[fmt.Sprintf("%d-%d", y1, x1)] = true
			} else {
				y2, x2 = move(y2, x2, cur)
				visited2[fmt.Sprintf("%d-%d", y2, x2)] = true
			}
		}

		fmt.Println("Answer 1", len(visited))
		fmt.Println("Answer 2", len(visited2))
	},
}

func init() {
	rootCmd.AddCommand(c201503Cmd)
}
