package cmd

func move(y int, x int, command string) (int, int) {
	if command == "<" {
		x = x - 1
	}
	if command == ">" {
		x = x + 1
	}
	if command == "^" {
		y = y - 1
	}
	if command == "v" {
		y = y + 1
	}
	return y, x
}
