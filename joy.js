joy = function (x, y, r) {
    this.pos = new vec2(x, y);
    this.spos = new vec2();
    this.r = r;
    this.sr = r / 3;
    this.value = new vec2();
    this.pressed = false;
};
joy.prototype = {
    show: function () {
        ctx.fillStyle = "#8886";
        circle(this.pos, this.r);
        ctx.fillStyle = "#000";
        circle(this.spos.add(this.pos), this.sr);
    },
    move: function (moves) {
        let win = -1;
        let near = 1000;
        let p = 0;
        moves.forEach((x) => {
            dist = x.add(this.pos.neg()).mag();
            if (dist < near) {
                win = p;
                near = dist;
            }
            p++;
        });
        if (win != -1 && near < this.r * 2) {
            this.spos = moves[win].add(this.pos.neg());
            this.pressed = true;
            if (this.spos.mag() > this.r - this.sr) {
                this.spos = this.spos.norm().mult(this.r - this.sr);
            }
            this.value = this.spos.mult(1 / (this.r - this.sr));
        } else {
            this.leave();
        }
    },
    leave: function () {
        this.spos = new vec2();
        this.pressed = false;
        this.value = new vec2();
    },
};
