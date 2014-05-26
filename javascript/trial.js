(function() {
	var requestAnimationFrame = 
	window.requestAnimationFrame ||
	window.mozRequestAnimationFrame ||
	window.webkitRequestAnimationFrame ||
	window.msRequestAnimationFrame;
	window.requestAnimationFrame = requestAnimationFrame;
}) ();

var canvas = document.getElementById("canvas"),
	ctx = canvas.getContext("2d"),
	width = 600,
	height = 300,
	player = {
		x : width / 2,
		y : height - 5,
		width : 20,
		height : 38,
		speed : 3,
		velX : 0,
		velY : 0,
		jumping : false,
		facingRight : true,
	},
	keys = [],
	friction = 0.8,
	gravity = 0.3;

canvas.width = width;
canvas.height = height;

// Background Imgage
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
	bgReady = true;
};
bgImage.src = "http://placekitten.com/600/300";

// Player Image
var playerReady = false;
var playerImage = new Image();
playerImage.onload = function () {
	playerReady = true;
};
playerImage.src = "https://googledrive.com/host/0B9eQiXj-6puyMTZnaVNUX29rSjg/Connor%20L1.gif"; //connor.png
var currentPlayerImage = playerImage;

var playerJumpReady = false;
var playerJump = new Image();
playerJump.onload = function () {
	playerJumpReady = true;
};
playerJump.src = "https://googledrive.com/host/0B9eQiXj-6puyMTZnaVNUX29rSjg/Connor%20L6.gif"; //connorJump.png

var playerReadyRight = false;
var playerImageRight = new Image();
playerImageRight.onload = function () {
	playerReadyRight = true;
};
playerImageRight.src = "https://googledrive.com/host/0B9eQiXj-6puyMTZnaVNUX29rSjg/Connor%20R1.gif"; //connorRight.png
var playerJumpRightReady = false;
var playerJumpRight = new Image();
playerJumpRight.onload = function () {
	playerJumpRightReady = true;
};
playerJumpRight.src = "https://googledrive.com/host/0B9eQiXj-6puyMTZnaVNUX29rSjg/Connor%20R6.gif"; //connorRightJump.png

function update () {
	if (keys[38] || keys[32]) {
		if (!player.jumping) {
			player.jumping = true;
			player.velY = -player.speed * 2;
		}
	}
	if (keys[39]) {
		if(player.velX < player.speed) {
			player.velX++;
			player.facingRight = true;
		}
	}
	if (keys[37]) {
		if (player.velX > -player.speed) {
			player.velX--;
			player.facingRight = false;
		}
	}
	
	player.velX *= friction;
	player.velY += gravity;
	
	player.x += player.velX;
	player.y += player.velY;
	
	if (player.x >= width-player.width) {
		player.x = width-player.width;
	} else if (player.x <= 0) {
		player.x = 0;
	}
	
	if (player.y >= height-player.height) {
		player.y = height - player.height;
		player.jumping = false;
	}
	
	//ctx.clearRect(0, 0, width, height);
	//ctx.fillStyle = "red";
	//ctx.fillRect(player.x, player.y, player.width, player.height);
	if (bgReady) {
		ctx.drawImage(bgImage, 0, 0);
	}
	if (playerReady && playerJumpReady) {
		if (player.jumping) {
			if (player.facingRight) {
				currentPlayerImage = playerJumpRight;
			} else {
				currentPlayerImage = playerJump;
			}
		} else {
			if (player.facingRight) {
				currentPlayerImage = playerImageRight;
			} else {
				currentPlayerImage = playerImage;
			}
		}
		ctx.drawImage(currentPlayerImage, player.x, player.y);
	}
	requestAnimationFrame(update);
}

document.body.addEventListener("keydown", function(e) {
	keys[e.keyCode] = true;
});

document.body.addEventListener("keyup", function(e) {
	keys[e.keyCode] = false;
});

window.addEventListener("load", function() {
	update();
});
