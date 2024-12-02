package utils

func IncrementMap(m map[int]int, key int) {
	val, ok := m[key]
	if ok {
		m[key] = val + 1
	} else {
		m[key] = 1
	}
}

func Abs(x int) int {
	if x < 0 {
		return -x
	}
	return x
}
