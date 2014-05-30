"use strict";

var Player = function(world) {
	this.world = world;
	this.width = 20;
	this.height = 38;
	this.x = this.world.width / 2;
	this.y = this.world.height - this.height;
	this.speed = 3;
	this.velX = 0;
	this.velY = 0;
	this.jumping = false;
	this.facing = "right";
	this.friction = 0.8;
	this.gravity = 0.3;
}

var keydown = [];

Player.prototype.update = function() {
	if (keydown[38] || keydown[32]) {
		if (!this.jumping) {
			this.jumping = true;
			this.velY = -this.speed * 2;
		}
	}
	
	if (keydown[39]) {
		if (this.velX < this.speed) {
			this.velX++;
			this.facing = "right";
		}
	}
	
	if (keydown[37]) {
		if (this.velX > -this.speed) {
			this.velX--;
			this.facing = "left";
		}
	}
	
	this.velX *= this.friction;
	this.velY += this.gravity;
	
	this.x += this.velX;
	this.y += this.velY;
	
	if (this.x >= this.world.width - this.width) {
		this.x = this.world.width - this.width;
	} else if (this.x <= 0) {
		this.x = 0;
	}
	
	if (this.y >= this.world.height - this.height) {
		this.y = this.world.height - this.height;
		this.jumping = false;
	}
	
	if (this.jumping) {
		if (this.facing === "right") {
			this.currentImage = "connorR6";
		} else {
			this.currentImage = "connorL6";
		}
	} else {
		if (this.facing === "left") {
			this.currentImage = "connorL1";
		} else {
			this.currentImage = "connorR1";
		}
	}
	this.width = this.world.sprites[this.currentImage].width;
	this.height = this.world.sprites[this.currentImage].height;
}

Player.prototype.draw = function() {
	//this.world.drawRectangle("#f00", this.x, this.y, 10, 10);
	this.world.drawSprite(this.currentImage, this.x, this.y, this.width, this.height);
}

document.body.addEventListener("keydown", function(e) {
	keydown[e.keyCode] = true;
});

document.body.addEventListener("keyup", function(e) {
	keydown[e.keyCode] = false;
});