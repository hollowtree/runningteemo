package main

import (
	"fmt"
	"os"
	"strings"
)

// func main() {
// 	var s, sep = "", " "
// 	for i := 0; i < len(os.Args); i++ {
// 		s += sep + os.Args[i]
// 	}
// 	fmt.Println(s)
// 	time.Sleep(time.Second * 1)
// }

func main() {
	fmt.Println(strings.Join(os.Args[0:], " "))
}

// func main() {
// 	fmt.Println(os.Args)
// }
