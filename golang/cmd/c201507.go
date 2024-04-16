package cmd

import (
	"fmt"
	"os"
	"regexp"
	"strconv"
	"strings"

	"github.com/spf13/cobra"
)

var c201507Cmd = &cobra.Command{
	Use:   "c201507",
	Short: "",
	Long:  "",
	Run: func(cmd *cobra.Command, args []string) {
		input, _ := os.ReadFile("../inputs/2015/6.txt")

		grid := [1000][1000]bool{}
		grid2 := [1000][1000]int{}

		fmt.Println(grid[0][0])

		re := regexp.MustCompile(`(.*) ([0-9]+),([0-9]+) through ([0-9]+),([0-9]+)`)

		for _, line := range strings.Split(string(input), "\n") {
			matches := re.FindStringSubmatch(line)

			yMin, _ := strconv.Atoi(matches[2])
			xMin, _ := strconv.Atoi(matches[3])
			yMax, _ := strconv.Atoi(matches[4])
			xMax, _ := strconv.Atoi(matches[5])

			for y := yMin; y <= yMax; y++ {
				for x := xMin; x <= xMax; x++ {
					if matches[1] == "toggle" {
						grid[y][x] = !grid[y][x]
						grid2[y][x] = grid2[y][x] + 2
					}
					if matches[1] == "turn on" {
						grid[y][x] = true
						grid2[y][x] = grid2[y][x] + 1
					}
					if matches[1] == "turn off" {
						grid[y][x] = false
						if grid2[y][x] > 0 {
							grid2[y][x] = grid2[y][x] - 1
						}
					}
				}
			}
		}

		count := 0
		count2 := 0

		for y := 0; y < 1000; y++ {
			for x := 0; x < 1000; x++ {
				if grid[y][x] {
					count++
				}
				count2 += grid2[y][x]
			}
		}
		fmt.Println("Answer 1", count)
		fmt.Println("Answer 2", count2)

	},
}

func init() {
	rootCmd.AddCommand(c201507Cmd)
}
