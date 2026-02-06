package main

import (
	"fmt"
	"time"
)

//ecom order struct

type order struct{
	id string
	amt float32
	status string
	createdAt time.Time// nanoSconds precision
}

func main() {
	Firstorder:=order{
		id: "1",
		amt: 1444.56,
		status: "done",
	}

	Firstorder.createdAt = time.Now()
	fmt.Println(Firstorder)
}