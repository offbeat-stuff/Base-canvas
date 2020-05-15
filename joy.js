joy=function(x,y,r){
	this.pos=new vec2(x,y)
	this.spos=new vec2()
	this.r = r
	this.sr = r/3
	this.value=new vec2()
}
joy.prototype={
	"show":function(){
		ctx.fillStyle="#2226"
		circle(this.pos,this.r)
		ctx.fillStyle="#000"
		circle(this.spos.add(this.pos),this.sr)
	},
	"move":function(moves){
		let win= -1;
		let near=Math.Inf(1)
		let p=0;
		moves.forEach(x =>{
			dist=x.add(this.pos.neg()).mag()
			if(dist<near){
				win=p
				near=dist
			}
			p++
		})
		console.log(moves,win,near)
		if(win!= -1&&near<this.r+this.sr){
		this.spos=moves[win].add(this.pos.neg())
		if(this.spos.mag()>this.r-this.sr){
			this.spos=this.spos.norm().mult(this.r-this.sr)
		}
		}else{
			this.leave()
		}
	},
	"leave":function(){
		this.spos=new vec2()
	}
}