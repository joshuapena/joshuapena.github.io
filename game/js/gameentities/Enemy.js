"use strict";

var Enemy = function(world, direction) {
	this.world = world;
	
	this.spriteName = "enemy";
	
	this.direction = direction;
	this.type = "enemy";
	this.active = true;
	this.width = 20;
	this.height = 38;
	this.speed = 1.5;
	this.velX = 0;
	this.velY = 0;
	if (this.direction === "right") {
		this.x = -this.width;
	} else {
		this.x = this.world.width + this.width;
	}
	this.y = this.world.height - this.height;
	this.friction = 0.8;
}

Enemy.prototype.explode = function() {
	this.active = false;
};

Enemy.prototype.update = function() {
	if (this.direction === "right") {
		if (this.velX < this.speed) {
			this.velX++;
		}
	} else {
		if (this.velX > -this.speed) {
			this.velX--;
		}
	}
	
	this.velX *= this.friction;
	
	this.x += this.velX;
};

Enemy.prototype.draw = function() {
	this.world.drawSprite(this.spriteName, this.x, this.y, this.width, this.height);
};