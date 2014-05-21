// Get Canvas
var canvas = document.getElementById("canvas"), 
  ctx = canvas.getContext("2d"),
  width = 512,
  height = 480;

canvas.tabIndex = 1;
canvas.width = width;
canvas.height = height;

this.idleSprite = new Image();
this.idleSprite.src = "../image/png/joshua-sprite-idle.png";
this.idleSprite.frameWidth = 28;
this.idleSprite.frameHeight = 40;
this.idleSprite.frames = 12;
this.idleSprite.frameCount = 0;

this.draw = function() {
  if (this.state == "idle") {
    ctx.drawImage(this.idleSprite, this.idleSprite.frameWidth * this.idleSprite.frameCount, 0, this.idleSprite.frameWidth, this.idleSprite.frameHeight, this.xpos, this.ypos, this.idleSprite.frameWidth, this.idleSprite.frameHeight);
    if (this.idleSprite.frameCount < this.idleSprite.frame - 1) {
      this.idleSprite.frameCount++;
    } else {
      this.idleSprite.frameCount = 0;
    }
  }
}
