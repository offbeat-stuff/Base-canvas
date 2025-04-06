cvs = document.createElement('canvas');
width = cvs.width = window.innerWidth;
height = cvs.height = window.innerHeight;
var joys = [];
var objs = [];
var keycs = [];
joys.push(
    new Joystick(width * 0.15, height * 0.7, Math.min(width, height) / 6),
);
joys.push(
    new Joystick(width * 0.85, height * 0.7, Math.min(width, height) / 6),
);
keycs.push(new KeyboardController('w', 's', 'a', 'd'));
keycs.push(new KeyboardController('i', 'k', 'j', 'l'));
window.onresize = function(e) {
  width = cvs.width = window.innerWidth;
  height = cvs.height = window.innerHeight;
  joys[0] = new Joystick(
      width * 0.15,
      height * 0.7,
      Math.min(width, height) / 6,
  );
  joys[1] = new Joystick(
      width * 0.85,
      height * 0.7,
      Math.min(width, height) / 6,
  );
};
ctx = cvs.getContext('2d');

function handleJoystick(e) {
  var touches = [];
  for (let i = 0; i < e.touches.length; i++) {
    touches.push(new vec2(e.touches[i].clientX, e.touches[i].clientY));
  }
  joys.forEach((x) => {
    x.move(touches);
  });
}

function handleKeyDown(evt) {
  keycs.forEach((x) => {
    x.handle_keydown(evt);
  });
}

function handleKeyUp(evt) {
  keycs.forEach((x) => {
    x.handle_keyup(evt);
  });
}

cvs.addEventListener('touchstart', handleJoystick, false);
cvs.addEventListener('touchmove', handleJoystick, false);
cvs.addEventListener('touchend', handleJoystick, false);

window.addEventListener('keydown', handleKeyDown, false);
window.addEventListener('keyup', handleKeyUp, false);

document.body.appendChild(cvs);
draw();
