vec2=function(x,y){
	this.x=x||0;
	this.y=y||0;
}

vec2.prototype={
	"add":function(b){
		return new vec2(this.x+b.x,this.y+b.y)
	},
	"neg":function(){
		return new vec2(-this.x,-this.y)
	},
	"mult":function(v){
		return new vec2(this.x*v,this.y*v)
	},
	"mag":function(){
		return Math.sqrt((this.x*this.x)+(this.y*this.y))
	},
	"norm":function(){
		return this.mult(1/Math.max(0.00000001,this.mag()))
	},
	"angle":function(){
		return Math.atan2(this.y,this.x)
	},
	"rotate":function(a){
		let c=Math.cos(a)
		let s=Math.sin(a)
		return new vec2(c*this.x-s*this.y,s*this.x+c*this.y)
	}
}