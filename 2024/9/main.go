package main

import (
	"fmt"
	"os"
	"slices"
	"strconv"
	"strings"
)

type Block struct {
	fileId int
	length int
}

func removeFromRight(slice []Block, fileId int) {
	for i := len(slice) - 1; i >= 0; i-- {
		if slice[i].fileId == fileId {
			slice[i].fileId = -1
			break
		}
	}
}

func main() {
	rawInput, _ := os.ReadFile("../inputs/2024/9.txt")
	input := string(rawInput)

	disk := []int{}
	disk2 := []Block{}
	files := []Block{}

	file := true
	fileId := 0

	for _, char := range strings.Split(input, "") {
		num, _ := strconv.Atoi(char)

		for i := 0; i < num; i++ {
			if file {
				disk = append(disk, fileId)
			} else {
				disk = append(disk, -1)
			}
		}

		if file {
			disk2 = append(disk2, Block{fileId, num})
			files = append(files, Block{fileId, num})
		} else {
			disk2 = append(disk2, Block{-1, num})
		}

		if file {
			fileId++
		}
		file = !file
	}

	// part 1
	i := 0
	for slices.Contains(disk, -1) {
		lastElement := disk[len(disk)-1]
		disk = disk[:len(disk)-1]
		for i < len(disk) {
			if disk[i] == -1 {
				disk[i] = lastElement
				break
			}
			i++
		}
	}

	checksum := 0
	for i, num := range disk {
		checksum += i * num
	}
	fmt.Println(checksum)

	// part 2
	slices.Reverse(files)

	for _, file := range files {
		for i, block := range disk2 {
			if block.fileId == -1 && block.length >= file.length {
				disk2[i].fileId = file.fileId
				disk2[i].length = file.length
				if block.length > file.length {
					disk2 = slices.Insert(disk2, i+1, Block{-1, block.length - file.length})
				}
				removeFromRight(disk2, file.fileId)
				break
			}
		}
	}

	checksum = 0
	i = 0

	for _, block := range disk2 {
		for j := 0; j < block.length; j++ {
			if block.fileId != -1 {
				checksum += i * block.fileId
			}
			i++
		}
	}

	fmt.Println(checksum)
}
