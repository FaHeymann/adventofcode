package main

import (
	"fmt"
	"strconv"
	"strings"
)

func getInput() string {
	return `965A
143A
528A
670A
973A`
}

func getExample() string {
	return `029A
980A
179A
456A
379A`
}

func calcPath(from string, to string, holeY int, holeX int, coords map[string][2]int) string {
	fromCoords := coords[from]
	toCoords := coords[to]

	paths := []string{}

	if fromCoords[1] != holeX || toCoords[0] != holeY {
		y, x := fromCoords[0], fromCoords[1]
		path := ""

		for y < toCoords[0] {
			path += "v"
			y++
		}
		for y > toCoords[0] {
			path += "^"
			y--
		}
		for x < toCoords[1] {
			path += ">"
			x++
		}
		for x > toCoords[1] {
			path += "<"
			x--
		}
		paths = append(paths, path)
	}

	if fromCoords[0] != holeY || toCoords[1] != holeX {
		y, x := fromCoords[0], fromCoords[1]
		path := ""

		for x < toCoords[1] {
			path += ">"
			x++
		}
		for x > toCoords[1] {
			path += "<"
			x--
		}
		for y < toCoords[0] {
			path += "v"
			y++
		}
		for y > toCoords[0] {
			path += "^"
			y--
		}
		paths = append(paths, path)
	}

	if len(paths) == 1 {
		return paths[0]
	}
	if toCoords[1] < fromCoords[1] {
		return paths[1]
	}
	return paths[0]
}

func numericalKeyboard(from string, to string) string {
	coords := map[string][2]int{
		"7": {0, 0},
		"8": {0, 1},
		"9": {0, 2},
		"4": {1, 0},
		"5": {1, 1},
		"6": {1, 2},
		"1": {2, 0},
		"2": {2, 1},
		"3": {2, 2},
		"0": {3, 1},
		"A": {3, 2},
	}
	return calcPath(from, to, 3, 0, coords)
}

func directionalKeyboard(from string, to string) string {
	coords := map[string][2]int{
		"^": {0, 1},
		"A": {0, 2},
		"<": {1, 0},
		"v": {1, 1},
		">": {1, 2},
	}
	return calcPath(from, to, 0, 0, coords)
}

var cache = map[string][]string{}

// resolve one sequence that returns to A
func resolveSequence(sequence string, resolver func(from string, to string) string) []string {
	if cachedResult, ok := cache[sequence]; ok {
		return cachedResult
	}

	result := []string{}
	position := "A"
	for _, c := range strings.Split(sequence, "") {
		result = append(result, resolver(position, c)+"A")
		position = c
	}

	cache[sequence] = result

	return result
}

func incrementMap(m map[string]int, key string, value int) {
	if _, ok := m[key]; !ok {
		m[key] = 0
	}
	m[key] += value
}

func run(input string, iterations int) {
	count := 0

	for _, line := range strings.Split(input, "\n") {
		if line == "" {
			continue
		}
		num, _ := strconv.Atoi(line[0:3])

		resolved := resolveSequence(line, numericalKeyboard)

		segmentsMap := map[string]int{}
		for _, segment := range resolved {
			incrementMap(segmentsMap, segment, 1)
		}

		for i := 0; i < iterations; i++ {
			newSegmentsMap := map[string]int{}
			for segment, segmentCount := range segmentsMap {
				resolved = resolveSequence(segment, directionalKeyboard)
				for _, newSegment := range resolved {
					incrementMap(newSegmentsMap, newSegment, segmentCount)
				}
			}
			segmentsMap = newSegmentsMap
		}

		length := 0
		for segment, segmentCount := range segmentsMap {
			length += len(segment) * segmentCount
		}

		count += length * num
	}
	fmt.Println(count)
}

func main() {
	input := getInput()
	// input := getExample()

	run(input, 2)
	run(input, 25)
}
