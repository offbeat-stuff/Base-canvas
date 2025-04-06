class Joystick {
  constructor(x, y, r) {
    this.pos = new vec2(x, y);
    this.spos = new vec2();
    this.r = r;
    this.sr = r / 3;
    this.value = new vec2();
    this.pressed = false;
  }

  show() {
    ctx.fillStyle = '#8886';
    circle(this.pos, this.r);
    ctx.fillStyle = '#000';
    circle(this.spos.add(this.pos), this.sr);
  }

  __nearest__to__(moves) {
    let result = -1;
    let bestDistance = 1000;
    for (let i = 0; i < moves.length; i++) {
      let dist = moves[i].add(this.pos.neg()).mag();
      if (dist < bestDistance) {
        result = i;
        bestDistance = dist;
      }
    }
    return {idx: result, dist: bestDistance};
  }

  __snap__() {
    if (this.spos.mag() > this.r - this.sr) {
      this.spos = this.spos.norm().mult(this.r - this.sr);
    }
  }

  __recalculate_value() {
    this.value = this.spos.mult(1 / (this.r - this.sr));
  }

  __set_spos(stick_pos) {
    this.spos = stick_pos;
    this.pressed = true;
    this.__snap__();
    this.__recalculate_value();
  }

  move(moves) {
    let nearest = this.__nearest__to__(moves);
    if (nearest.idx == -1 || nearest.dist > this.r * 2) {
      this.leave();
      return;
    }

    this.__set_spos(moves[nearest.idx].add(this.pos.neg()));
  }

  // push_key(up, down, left, right) {
  //     // if (!(up || down || left || right)) return;
  //     let move = new vec2();
  //     if (up) move.y -= 1.0;
  //     if (down) move.y += 1.0;
  //     if (left) move.x -= 1.0;
  //     if (right) move.x += 1.0;
  //     this.__set_spos(this.spos.lerp(move.mult(this.r - this.sr), 0.2));
  // }

  // pull_key(up, down, left, right) {
  //     if (up || down || left || right) this.leave();
  // }

  leave() {
    this.spos = new vec2();
    this.pressed = false;
    this.value = new vec2();
  }
}

class KeyboardController {
  constructor(up_key, down_key, left_key, right_key) {
    this.up = false;
    this.down = false;
    this.left = false;
    this.right = false;
    this.up_key = up_key;
    this.down_key = down_key;
    this.left_key = left_key;
    this.right_key = right_key;
    this.value = new vec2();
  }

  handle_keyup(evt) {
    if (evt.key == this.up_key) this.up = false;
    if (evt.key == this.down_key) this.down = false;
    if (evt.key == this.left_key) this.left = false;
    if (evt.key == this.right_key) this.right = false;
  }

  handle_keydown(evt) {
    if (evt.key == this.up_key) this.up = true;
    if (evt.key == this.down_key) this.down = true;
    if (evt.key == this.left_key) this.left = true;
    if (evt.key == this.right_key) this.right = true;
  }

  update() {
    let move = new vec2();
    if (this.up) move.y -= 1.0;
    if (this.down) move.y += 1.0;
    if (this.left) move.x -= 1.0;
    if (this.right) move.x += 1.0;
    this.value = this.value.lerp(move, 0.1);
  }

  pressed() {
    return this.up || this.down || this.left || this.right;
  }
}
