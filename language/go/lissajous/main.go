package main

import(
	"fmt"
	"image"
	"image/color"
	"image/gif"
	"io"
	"log"
	"math"
	"math/rand"
	"net/http"
	"os"
	"time"
)

var palette = []color.Color{color.Black, color.RGBA{0, 255, 0, 0xff}, color.RGBA{255, 0, 0, 0xff}}

const(
	whiteIndex = 0
	blackIndex = 1
)

func  main()  {
	rand.Seed(time.Now().UTC().UnixNano())
	fmt.Println(len(os.Args))
	if false{
		handler := func(w http.ResponseWriter, r *http.Request){
			lissajous(w)
		}
		http.HandleFunc("/", handler)
		log.Fatal(http.ListenAndServe("localhost:8080", nil))
		return
	}
	lissajous(os.Stdout)
}
func lissajous(out io.Writer)  {
	const(
		cycles = 5
		res=0.001
		size=200
		nframes = 64
		delay = 8
	)
	freq := rand.Float64() * 3.0
	anim := gif.GIF{LoopCount: nframes}
	phase := 0.0
	for i:=0;i<nframes;i++{
		rect:=image.Rect(0,0,2*size+1,2*size+1)
		img:=image.NewPaletted(rect, palette)
		for t:=0.0; t<cycles*2*math.Pi;t+=res{
			x:=math.Sin(t)
			y:=math.Sin(t*freq+phase)
			img.Set(size+int(x*size+0.5), size+int(y*size+0.5), color.RGBA{255, 0, 0, 0xff})
		}
		phase+=0.1
		anim.Delay = append(anim.Delay, delay)
		anim.Image =append(anim.Image, img)
	}
	gif.EncodeAll(out, &anim)
}