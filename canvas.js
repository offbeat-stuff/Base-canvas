function fill(r, g, b) {
    ctx.fillStyle = `rgb(${r},${g},${b})`;
}

function drawShape(path, pos, r) {
    let a = [];
    path.forEach((x) => {
        let p = x.rotate(r);
        a.push(p.add(pos));
    });
    strokePath(a);
}

function stroke(s) {
    ctx.strokeStyle = s;
}

function line(a, b) {
    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);
    ctx.stroke();
}

function strokePath(p) {
    ctx.beginPath();
    ctx.moveTo(p[0].x, p[0].y);
    for (let i = 1; i < p.length; i++) {
        ctx.lineTo(p[i].x, p[i].y);
    }
    ctx.closePath();
    ctx.stroke();
}

function rect(ax, ay, bx, by) {
    ctx.fillRect(ax, ay, bx, by);
}

function circle(p, r) {
    ctx.beginPath();
    ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
    ctx.fill();
}
