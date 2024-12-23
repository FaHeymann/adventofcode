package main

import (
	"fmt"
	"os"
	"slices"
	"strings"
)

func getInput() string {
	rawInput, _ := os.ReadFile("../inputs/2024/23.txt")
	return string(rawInput)
}

type Node struct {
	name      string
	neighbors map[string]*Node
}

func getExample() string {
	return `kh-tc
qp-kh
de-cg
ka-co
yn-aq
qp-ub
cg-tb
vc-aq
tb-ka
wh-tc
yn-cg
kh-ub
ta-co
de-co
tc-td
tb-wq
wh-td
ta-ka
td-qp
aq-cg
wq-ub
ub-vc
de-ta
wq-aq
wq-vc
wh-yn
ka-de
kh-ta
co-tc
wh-qp
tb-vc
td-yn`
}

func clusterID(cluster map[string]bool) string {
	keys := []string{}
	for k := range cluster {
		keys = append(keys, k)
	}
	slices.Sort(keys)
	return strings.Join(keys, ",")
}

var visited = make(map[string]bool)
var longest = ""
var count = 0

func growCluster(cluster map[string]bool, node *Node) {
	clusterID := clusterID(cluster)
	if _, ok := visited[clusterID]; ok {
		return
	}
	visited[clusterID] = true

	if len(cluster) == 3 {
		for k := range cluster {
			if strings.HasPrefix(k, "t") {
				count++
				break
			}
		}
	}
	if len(clusterID) > len(longest) {
		longest = clusterID
	}

outer:
	for _, neighbor := range node.neighbors {
		if _, ok := cluster[neighbor.name]; ok {
			continue
		}
		for clusterNode := range cluster {
			if _, ok := neighbor.neighbors[clusterNode]; !ok {
				continue outer
			}
		}

		newCluster := make(map[string]bool)
		for k := range cluster {
			newCluster[k] = true
		}
		newCluster[neighbor.name] = true
		growCluster(newCluster, neighbor)
	}
}

func main() {
	// input := getExample()
	input := getInput()

	nodes := make(map[string]*Node)

	for _, line := range strings.Split(input, "\n") {
		if line == "" {
			continue
		}

		parts := strings.Split(line, "-")

		if _, ok := nodes[parts[0]]; !ok {
			nodes[parts[0]] = &Node{name: parts[0], neighbors: make(map[string]*Node)}
		}
		if _, ok := nodes[parts[1]]; !ok {
			nodes[parts[1]] = &Node{name: parts[1], neighbors: make(map[string]*Node)}
		}
		nodes[parts[0]].neighbors[parts[1]] = nodes[parts[1]]
		nodes[parts[1]].neighbors[parts[0]] = nodes[parts[0]]
	}

	for _, node := range nodes {
		cluster := make(map[string]bool)
		cluster[node.name] = true
		growCluster(cluster, node)
	}

	fmt.Println(count)
	fmt.Println(longest)
}
