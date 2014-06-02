"use strict";

var Bullet = function(world, options) {
	this.world = world;
	this.color = options.color || "#F00";
	
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
	
	//this.owner = options.owner;
};

Bullet.prototype.explode = function(typeOfOther) {
	this.active = false;
	if (this.player) {
		this.player.kill();
	}
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
};

Bullet.prototype.draw = function () {
	if (this.spriteName === null) {
		this.world.drawRectangle(this.color, this.x, this.y, this.width, this.height);
	} else {
		this.world.drawSprite(this.spriteName, this.x, this.y, this.width, this.height);
	}
};