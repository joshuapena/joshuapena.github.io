"use strict";

var Bullet = function(world, options, audio) {
	this.world = world;
	this.color = options.color || "#F00";
	this.audio = audio;
	this.hitAudio = "enemyDamageBraqoon";
	
	this.x = options.x;
	this.y = options.y;
	this.width = options.width;
	this.height = options.height;
	
	this.speed = options.speed || 4;
	this.acceleration = options.acceleration || 0;
	this.direction = options.direction;
	
	this.spriteName = options.spriteName || null;
	this.active = true;
	
	this.velX = this.speed;
	this.velY = 0;
	
	this.player = options.kill;
	
	this.owner = options.owner;
	
	//this.owner = options.owner;
};

Bullet.prototype.explode = function(typeOfOther) {
	this.active = false;
	if (this.player) {
		this.player.kill();
	}
	this.audio[this.hitAudio].stop();
	//this.audio[this.hitAudio].play();
}

Bullet.prototype.update = function () {
	this.y += this.velY;
	
	if (this.direction === "right") {	
		this.x += this.velX;
		this.velX += this.acceleration;
	} else {
		this.x -= this.velX;
		this.velX += this.acceleration;
	}
	
	if (this.x - this.width < 0 || this.x > this.world.width) {
		this.active = false;
	}
};

Bullet.prototype.draw = function () {
	if (this.spriteName === null) {
		this.world.drawRectangle(this.color, this.x, this.y, this.width, this.height);
	} else {
		this.world.drawSprite(this.spriteName, this.x, this.y, this.width, this.height);
	}
};