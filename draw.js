function draw(){
for(var i=0;i<4;i++){
	ctx.fillStyle="#f"+Math.floor(i*2)+""+Math.floor(i*2)
	rect(0,i*height/4,width,(i+1)*height/4)
}
joys.forEach(x=>{
	x.show()
})
requestAnimationFrame(draw)
}