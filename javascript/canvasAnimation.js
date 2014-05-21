// Get Canvas
var canvas = document.getElementById("canvas"), 
  ctx = canvas.getContext("2d"),
  width = 512,
  height = 480;

canvas.tabIndex = 1;
canvas.width = width;
canvas.height = height;

// Background Image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
  bgReady = true;
};
bgImage.src = "http://placekitten.com/512/480";
// Hero Image
var kittyReady = false;
var kittyImage = new Image();
kittyImage.onload = function () {
  kittyReady = true;
};
kittyImage.src = "../image/png/spaceCat.png";

// Kitty Image
var heroReady = false;
var heroImage = new Image();
heroImage.onload = function () {
  heroReady = true;
};
heroImage.frameWidth = 88;
heroImage.frameHeight = 130;
heroImage.frames = 2;
heroImage.frameCount = 0;
heroImage.src = "../image/png/joshua-sprite-idle.png";

// Game objects
var hero = {
  speed: 256,
  x: 0,
  y: 0
};

var kitty = {
  x: 0,
  y: 0
};
var kittyCaught = 0;

// Handle keyboard controls
var keysDown = {};

addEventListener("keydown", function (e) {
  keysDown[e.keyCode] = true;
  e.preventDefault();
}, false);

addEventListener("keyup", function (e) {
  delete keysDown[e.keyCode];
}, false);

var reset = function () {
  hero.x = (canvas.width / 2) - 16;
  hero.y = (canvas.height / 2) - 16;
  
  kitty.x = 32 + (Math.random() * (canvas.width - 64));
  kitty.y = 32 + (Math.random() * (canvas.height - 64));
};

// Update game objects
var update = function (modifier) {
  if (38 in keysDown) {
    hero.y -= hero.speed * modifier;
  }
  if (40 in keysDown) {
    hero.y += hero.speed * modifier;
  }
  if (37 in keysDown) {
    hero.x -= hero.speed * modifier;
  }
  if (39 in keysDown) {
    hero.x += hero.speed * modifier;
  }
  
  // Stop from going off the page
  if (hero.x >= canvas.width - 32) {
    hero.x = canvas.width - 32;
  } else if (hero.x <= 0) {
    hero.x = 0;
  }
  
  if (hero.y >= canvas.height - 32) {
    hero.y = canvas.height - 32;
  } else if (hero.y <= 0) {
    hero.y = 0;
  }
  
  // Collision
  if (hero.x <= (kitty.x + 32) && kitty.x <= (hero.x + 32) && hero.y <= (kitty.y + 32) && kitty.y <= (hero.y + 32)) {
    ++kittyCaught;
    thenSwitch = nowSwitch;
    reset();
  }
};

// Render
var render = function () {
  if (bgReady) {
    ctx.drawImage(bgImage, 0, 0);
  }
  
  if (heroReady) {
    ctx.drawImage(heroImage, heroImage.frameWidth * heroImage.frameCount, 0, heroImage.frameWidth, heroImage.frameHeight, hero.x, hero.y, heroImage.frameWidth, heroImage.frameHeight);
    if (countDownImage > 500) {
      thenImage = nowImage;
      if (heroImage.frameCount < heroImage.frames - 1) {
        heroImage.frameCount++;
      } else {
        heroImage.frameCount = 0;
      }
    }
  }
  
  if (kittyReady) {
    ctx.drawImage(kittyImage, kitty.x, kitty.y);
  }
  
  ctx.fillStyle = "#EEE";
  ctx.font = "24px Ubuntu";
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  ctx.fillText("Kitties caught : " + kittyCaught, 32, 32);
  ctx.fillText("Lives : " + lives, 365, 32);
  ctx.fillText("Timer : " + parseInt(countDown / 100), 32, 64);
};

var gameOver = function () {
  document.write("Game Over. Kitties only have nine lives. You caught " + kittyCaught + " kitties.");
};

var main = function () {
  now = Date.now();
  var delta = now - then;
  
  nowSwitch = nowImage = Date.now();
  
  update(delta / 1100);
  
  countDown = nowSwitch - thenSwitch;
  countDownImage = nowImage - thenImage;
  
  if (countDown >= 1000) {
    lives++;
    if (lives ==  0) {
      gameOver();
    }
    thenSwitch = nowSwitch;
    reset();
  }
  
  render();
  
  then = now;
  
  requestAnimationFrame(main);
};

var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

// Initalized Variables
var then, thenSwitch, nowSwitch, thenImage, nowImage;
var countDown;
var lives;

var start = function() {
  then = thenSwitch = nowSwitch = thenImage = nowImage = Date.now();
  reset();
  countDown = 0;
  lives = 9;
  kittyCaught = 0;
  //hero.x = (canvas.width / 2) - 16;
  //hero.y = (canvas.height / 2) - 16;
  main();
}

start();
