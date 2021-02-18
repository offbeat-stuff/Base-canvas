function draw() {
    ctx.font = "24px 'Fira Code'";
    fill(0, 0, 0);
    rect(0, 0, width, height);
    var segments = 16;
    for (var i = 0; i < segments; i++) {
        ctx.rotate(0.4);
        var mult = 255 / 64;
        fill(i * mult, i * mult, i * mult);
        rect(0, (i * height) / segments, width, ((i + 1) * height) / segments);
        ctx.rotate(-0.4);
    }
    objs.forEach((x) => {
        x.update();
        x.show();
    });
    joys.forEach((x) => {
        x.show();
    });
    fill(16, 16, 16);
    rect(0, 0, width / 4, height / 9);
    fill(200, 200, 200);
    ctx.fillText("|> Made by Ayush Saroha", 5, 30);
    requestAnimationFrame(draw);
}
