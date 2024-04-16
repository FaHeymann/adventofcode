package cmd

import (
	"fmt"
	"os"
	"sort"
	"strconv"
	"strings"

	"github.com/spf13/cobra"
)

var c201502Cmd = &cobra.Command{
	Use:   "c201502",
	Short: "",
	Long:  "",
	Run: func(cmd *cobra.Command, args []string) {
		input, _ := os.ReadFile("../inputs/2015/2.txt")

		presents := strings.Split(string(input), "\n")

		wrappingSum := 0
		ribbonSum := 0

		for _, present := range presents {
			sides := strings.Split(present, "x")
			intSides := []int{0, 0, 0}

			for i, s := range sides {
				number, _ := strconv.Atoi(s)
				intSides[i] = number
			}

			areas := []int{intSides[0] * intSides[1], intSides[1] * intSides[2], intSides[0] * intSides[2]}

			sort.Ints(areas)
			sort.Ints(intSides)

			wrappingSum += 2 * areas[0]
			wrappingSum += 2 * areas[1]
			wrappingSum += 2 * areas[2]
			wrappingSum += areas[0]

			ribbonSum += 2 * intSides[0]
			ribbonSum += 2 * intSides[1]
			ribbonSum += intSides[0] * intSides[1] * intSides[2]
		}
		fmt.Println("Answer 1", wrappingSum)
		fmt.Println("Answer 2", ribbonSum)
	},
}

func init() {
	rootCmd.AddCommand(c201502Cmd)
}
