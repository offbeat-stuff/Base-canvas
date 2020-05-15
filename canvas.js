function rect(ax,ay,bx,by){
	ctx.fillRect(ax,ay,bx,by);
}

function circle(p,r){
	ctx.beginPath()
	ctx.arc(p.x,p.y,r,0,Math.PI*2)
	ctx.fill()
}