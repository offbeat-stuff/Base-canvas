cvs = document.createElement("canvas");
width = cvs.width = window.innerWidth;
height = cvs.height = window.innerHeight;
var joys=[];
var objs=[];
joys.push(new joy(width*0.15,height*0.7,Math.min(width,height)/6))
joys.push(new joy(width*0.85,height*0.7,Math.min(width,height)/6))
window.onresize=function(e){
	width = cvs.width = window.innerWidth;
	height = cvs.height = window.innerHeight;
	joys[0]=new joy(width*0.15,height*0.7,Math.min(width,height)/6)
	joys[1]=new joy(width*0.85,height*0.7,Math.min(width,height)/6)
}
ctx = cvs.getContext("2d");

function handleJoystick(e){
	var touches=[]
	for(let i=0;i<e.touches.length;i++){
	touches.push(new vec2(e.touches[i].clientX,e.touches[i].clientY))
	}
	joys.forEach(x=>{
		x.move(touches)
	})
}
cvs.addEventListener("touchstart",handleJoystick,false)

cvs.addEventListener("touchmove",handleJoystick,false)

cvs.addEventListener("touchend",handleJoystick,false)

document.body.appendChild(cvs);
draw();