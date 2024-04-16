package cmd

import (
	"crypto/md5"
	"encoding/hex"
	"fmt"
	"strings"

	"github.com/spf13/cobra"
)

var c201504Cmd = &cobra.Command{
	Use:   "c201504",
	Short: "",
	Long:  "",
	Run: func(cmd *cobra.Command, args []string) {
		prefix := "iwrupvqb"

		foundFiveZeros := false
		foundSixZeros := false

		i := 1
		for {
			cur := fmt.Sprintf("%s%d", prefix, i)
			hash := md5.Sum([]byte(cur))
			result := hex.EncodeToString(hash[:])

			if !foundFiveZeros && strings.HasPrefix(result, "00000") {
				fmt.Println("Answer 1", i)
				foundFiveZeros = true
			}

			if !foundSixZeros && strings.HasPrefix(result, "000000") {
				fmt.Println("Answer 2", i)
				foundSixZeros = true
			}

			if foundFiveZeros && foundSixZeros {
				break
			}

			i += 1
		}

	},
}

func init() {
	rootCmd.AddCommand(c201504Cmd)
}
