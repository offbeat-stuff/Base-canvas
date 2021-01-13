asteroid = function (pos, r) {
    this.pos = pos;
    this.path = [];
    this.r = r;
    this.vel = this.pos
        .add(new vec2(-width / 2, -height / 2))
        .neg()
        .norm()
        .rotate((Math.random() - 0.5) * 0.25);
    for (let i = 0; i < Math.PI * 2; i += 0.5) {
        let v = new vec2(1, 0);
        v = v.mult(this.r + (Math.random() * 10 - 5));
        v = v.rotate(i);
        this.path.push(v);
    }
    this.destroyed = false;
};

asteroid.prototype = {
    update: function () {
        this.pos = this.pos.add(this.vel);
        if (
            this.pos.add(new vec2(width / 2, height / 2)).mag() >
            Math.max(height, width) * 1.5
        ) {
            this.destroyed = true;
        }
    },
    show: function () {
        let path = [];
        for (let i = 0; i < this.path.length; i++) {
            path.push(this.path[i].add(this.pos));
        }
        stroke("#fff");
        strokePath(path);
    },
};

game = {
    pos: new vec2(width / 2, height / 2),
    vel: new vec2(),
    projectiles: [],
    path: [new vec2(-15, -15), new vec2(-15, 15), new vec2(30, 0)],
    asteroids: [],
    power: 0,
    angle: 0,
    update: function () {
        this.pos = this.pos.add(this.vel);
        if (joys[0].pressed) {
            this.vel = this.vel.add(joys[0].value.mult(0.1));
        }
        if (joys[1].pressed) {
            this.angle = joys[1].spos.angle();
            if (joys[1].value.mag() > 0.8) {
                this.shoot();
            }
        }
        this.vel = this.vel.mult(0.99);
        this.pos.x = this.pos.x - width * Math.floor(this.pos.x / width);
        this.pos.y = this.pos.y - height * Math.floor(this.pos.y / height);
        this.asteroids.forEach((x) => {
            x.update();
        });
        let ast = [];
        this.asteroids.forEach((x) => {
            if (!x.destroyed) {
                ast.push(x);
            }
        });
        this.asteroids = ast;
        let proj = [];
        this.projectiles.forEach((x) => {
            if (
                x.pos.add(new vec2(width / 2, height / 2)).mag() >
                Math.max(height, width) * 1.5
            ) {
                x.destroyed = true;
            }
            if (!x.destroyed) {
                proj.push(x);
            }
        });
        this.projectiles = proj;
        if (this.asteroids.length < 10) {
            let v = new vec2(1, 0);
            v = v.mult(Math.max(height, width) * (1 + Math.random()));
            v = v.rotate(Math.random() * 2 * Math.PI);
            v = v.add(new vec2(width / 2, height / 2));
            game.asteroids.push(
                new asteroid(v, (Math.random() - 0.5) * 10 + width / 10)
            );
        }
        this.projectiles.forEach((x) => {
            x.pos = x.pos.add(x.vel);
            this.asteroids.forEach((y) => {
                if (y.pos.add(x.pos.neg()).mag() < y.r) {
                    y.destroyed = true;
                    x.destroyed = true;
                }
            });
        });
        this.power--;
        if (this.power < 0) {
            this.power = 0;
        }
    },
    shoot: function () {
        if (this.power == 0) {
            var p = {
                pos: new vec2(20, 0),
                vel: new vec2(5, 0),
                destroyed: false,
            };
            p.pos = p.pos.rotate(joys[1].spos.angle()).add(this.pos);
            p.vel = p.vel.rotate(joys[1].spos.angle());
            this.projectiles.push(p);
            this.power = 10;
        }
    },
    show: function () {
        stroke("#fff");
        drawShape(this.path, this.pos, this.angle);

        //Show it at edges
        drawShape(this.path, this.pos.add(new vec2(width, 0)), this.angle);
        drawShape(this.path, this.pos.add(new vec2(-width, 0)), this.angle);
        drawShape(this.path, this.pos.add(new vec2(0, height)), this.angle);
        drawShape(this.path, this.pos.add(new vec2(0, -height)), this.angle);
        this.asteroids.forEach((x) => {
            x.show();
        });
        fill(255, 255, 255);
        this.projectiles.forEach((x) => {
            circle(x.pos, 4);
        });
    },
};
objs.push(game);
