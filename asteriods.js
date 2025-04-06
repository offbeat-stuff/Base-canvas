class PhysicsBody {
  constructor(pos, vel) {
    this.pos = pos;
    this.vel = vel;
  }

  update() {
    this.pos = this.pos.add(this.vel);
  }
}

class Asteroid extends PhysicsBody {
  createPath() {
    let result = [];
    const segments = Math.floor(Math.random() * 10.5) + 5;
    const tau = Math.PI * 2;
    for (let i = 0; i < tau; i += tau / segments) {
      result.push(
          new vec2(1, 0)
              .mult(this.radius)
              .mult(Math.random() * 0.4 + 0.6)
              .rotate(i),
      );
    }
    return result;
  }

  constructor(pos, radius) {
    super(
        pos,
        pos.add(new vec2(-width / 2, -height / 2))
            .neg()
            .norm()
            .rotate((Math.random() - 0.5) * 0.25),
    );
    this.radius = radius;
    this.path = this.createPath();
  }

  show() {
    stroke('#fff');
    drawShape(this.path, this.pos, 0.0);
  }
}

class Projectile extends PhysicsBody {
  constructor(pos, angle) {
    let basePos = new vec2(20, 0);
    let baseVel = new vec2(5, 0);
    super(basePos.rotate(angle).add(pos), baseVel.rotate(angle));
  }

  show() {
    circle(this.pos, 4);
  }
}

class Player extends PhysicsBody {
  constructor() {
    super(new vec2(width / 2, height / 2), new vec2());
    this.path = [new vec2(-15, -15), new vec2(-15, 15), new vec2(30, 0)];
    this.power = 0;
    this.angle = 0;
  }

  __handle_input() {
    if (joys[0].pressed) {
      this.vel = this.vel.add(joys[0].value.mult(0.1));
    }
    if (joys[1].pressed) {
      this.angle = joys[1].spos.angle();
      if (joys[1].value.mag() > 0.8) this.shoot();
    }
    if (keycs[0].pressed()) this.vel = this.vel.add(keycs[0].value.mult(0.1));
    if (keycs[1].pressed()) {
      this.angle = keycs[1].value.angle();
      if (keycs[1].value.mag() > 0.8) this.shoot();
    }
  }

  update() {
    super.update();
    this.__handle_input();
    this.vel = this.vel.mult(0.99);
    this.pos.x = this.pos.x - width * Math.floor(this.pos.x / width);
    this.pos.y = this.pos.y - height * Math.floor(this.pos.y / height);

    this.power = Math.max(0, this.power - 1);
  }

  shoot() {
    if (this.power != 0) return;
    if (joys[1].pressed)
      GameInstance.addProjectile(
          new Projectile(this.pos, joys[1].spos.angle()),
      );
    if (keycs[1].pressed())
      GameInstance.addProjectile(
          new Projectile(this.pos, keycs[1].value.angle()),
      );
    this.power = 10;
  }

  show() {
    drawShape(this.path, this.pos, this.angle);

    // Show it at edges
    drawShape(this.path, this.pos.add(new vec2(width, 0)), this.angle);
    drawShape(this.path, this.pos.add(new vec2(-width, 0)), this.angle);
    drawShape(this.path, this.pos.add(new vec2(0, height)), this.angle);
    drawShape(this.path, this.pos.add(new vec2(0, -height)), this.angle);
  }
}

class Game {
  constructor() {
    this.player = new Player();
    this.projectiles = [];
    this.asteroids = [];
  }

  addProjectile(p) {
    this.projectiles.push(p);
  }

  update() {
    this.player.update();
    this.asteroids.forEach((x) => x.update());
    this.projectiles.forEach((x) => x.update());

    if (this.asteroids.map((x) => x.radius)
            .reduce((pv, cr, idx, list) => pv + cr, 0) < width) {
      let v = new vec2(1, 0);
      v = v.mult(Math.max(height, width) * (1 + Math.random()));
      v = v.rotate(Math.random() * 2 * Math.PI);
      v = v.add(new vec2(width / 2, height / 2));
      let r = Math.random() * 5 + 10;
      this.asteroids.push(new Asteroid(v, Math.min(width, height) / r));
    }

    this.destroyObjects();
  }

  show() {
    stroke('#fff');
    this.player.show();
    this.asteroids.forEach((x) => x.show());
    fill(255, 255, 255);
    this.projectiles.forEach((x) => x.show());
  }

  destroyObjects() {
    this.asteroids = this.asteroids.filter(
        (x) => x.pos.add(new vec2(width / 2, height / 2)).mag() <
            Math.max(height, width) * 1.5,
    );
    this.projectiles = this.projectiles.filter(
        (x) => x.pos.add(new vec2(width / 2, height / 2)).mag() <
            Math.max(height, width) * 1.5,
    );
    this.asteroids = this.asteroids.filter((x) => {
      var filtered = this.projectiles.filter((y) => {
        return x.pos.add(y.pos.neg()).mag() > x.radius;
      });
      let kept = filtered.length == this.projectiles.length;
      this.projectiles = filtered;
      return kept;
    });
  }
}

GameInstance = new Game();
objs.push(GameInstance);
