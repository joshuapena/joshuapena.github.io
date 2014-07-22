"use strict";

var CatEnemy = function(world, direction) {
	this.world = world;
	
	this.spriteName = "enemyCat";
	
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
	
	this.hitboxMetrics = {
		x: 0,
		y: 0,
		width: 20,
		height: 38
	};
	
	this.hitbox = {
		x: this.x + this.hitboxMetrics.x,
		y: this.y + this.hitboxMetrics.y,
		width: this.hitboxMetrics.width,
		height: this.hitboxMetrics.height
	};
};

CatEnemy.prototype.explode = function(source) {
	this.active = false;
};

CatEnemy.prototype.update = function() {
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
	
	if (this.direction === "right" && this.x > this.world.width ) {
		this.active = false;
	} else if (this.direction === "left" && this.x < -this.width) {
		this.active = false;
	}
	
	this.updateHitbox();
};

CatEnemy.prototype.draw = function() {
	this.world.drawSprite(this.spriteName, this.x, this.y, this.width, this.height);
};

CatEnemy.prototype.updateHitbox = function() {
	this.hitbox = {
		x: this.x + this.hitboxMetrics.x,
		y: this.y + this.hitboxMetrics.y,
		width: this.hitboxMetrics.width,
		height: this.hitboxMetrics.height
	};
};
