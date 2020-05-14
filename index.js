cvs = document.createElement("canvas");
width = cvs.width = window.innerWidth;
height = cvs.height = window.innerHeight;
var pressed=0;
window.onresize=function(e){
	width = cvs.width = window.innerWidth;
	height = cvs.height = window.innerHeight;
}
cvs.addEventListener("ontouchstart",function(e){
	pressed=1;
},false)
cvs.addEventListener("touchmove",function(e){

},false)
ctx = cvs.getContext("2d");
document.body.appendChild(cvs);
console.log(cvs)
console.log(ctx)
console.log([width,height])
ctx.fillStyle="#000"
rect(0,0,width,height);
function draw(){
for(var i=0;i<3;i++){
	ctx.fillStyle="#f"+Math.floor(i*4)+"f"
	rect(0,i*height/3.0,width,(i+1)*height/3.0)
}
requestAnimationFrame(draw)
}
draw();