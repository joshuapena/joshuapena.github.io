// Get Canvas
var canvas = document.getElementById("canvas"), 
  ctx = canvas.getContext("2d"),
  width = 512,
  height = 480;

canvas.tabIndex = 1;
canvas.width = width;
canvas.height = height;
var state = "idle";

idleSprite = new Image();
idleSprite.src = "../image/png/joshua-sprite-idle.png";
idleSprite.frameWidth = 28;
idleSprite.frameHeight = 40;
idleSprite.frames = 12;
idleSprite.frameCount = 0;

this.draw = function() {
  if (state == "idle") {
    ctx.drawImage(idleSprite, idleSprite.frameWidth * idleSprite.frameCount, 0, idleSprite.frameWidth, idleSprite.frameHeight, xpos, ypos, idleSprite.frameWidth, idleSprite.frameHeight);
    if (idleSprite.frameCount < idleSprite.frame - 1) {
      idleSprite.frameCount++;
    } else {
      idleSprite.frameCount = 0;
    }
  }
}
