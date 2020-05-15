game={
	"pos":new vec2(),
	"vel":new vec2(),
	"path":[new vec2(-15,-15),new vec2(-15,15),new vec2(30,0)],
	"update":function(){
		this.pos=this.pos.add(this.vel)
		if(joys[0].pressed){
			this.vel=this.vel.add(joys[0].value.mult(0.1))
		}
		this.pos.x=this.pos.x-(width*Math.floor(this.pos.x/width))
		this.pos.y=this.pos.y-(height*Math.floor(this.pos.y/height))
	},
	"show":function(){
		stroke("#fff")
		let a=[];
		this.path.forEach(x=>{
			let p=x.rotate(joys[1].spos.angle())
			a.push(p.add(this.pos))
		})
		fillPath(a)
	}
}
objs.push(game)