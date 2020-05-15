function draw(){
fill("#000")
rect(0,0,width,height)
//for(var i=0;i<4;i++){
//	fill("#f"+Math.floor(i*2)+""+Math.floor(i*2))
//	rect(0,i*height/4,width,(i+1)*height/4)
//}
objs.forEach(x=>{
	x.update()
	x.show()
})
joys.forEach(x=>{
	x.show()
})
requestAnimationFrame(draw)
}