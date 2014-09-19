"use strict";

var Enemy = function(world, quickness) {
    console.log('attack');
	this.world = world;
	
	this.spriteName = "enemy";
	
	this.quickness = quickness;
	this.type = "enemy";
	this.active = true;
	this.width = 80;
	this.height = 128;
	this.speed = 2;
	this.velX = 0;
	this.velY = 0;
    this.x = this.world.width;
	this.y = this.world.height - this.height;
	this.friction = 0.9;
	
	this.hitboxMetrics = {
		x: 0,
		y: 0,
		width: 80,
		height: 128
	};
	
	this.hitbox = {
		x: this.x + this.hitboxMetrics.x,
		y: this.y + this.hitboxMetrics.y,
		width: this.hitboxMetrics.width,
		height: this.hitboxMetrics.height
	};
};

Enemy.prototype.explode = function(source) {
	this.active = false;
};

Enemy.prototype.update = function() {
    if (this.velX > -this.speed) {
        this.velX--;
    }
	
	this.velX *= this.friction;
	
	this.x += this.velX;
	
	if (this.x < -this.width) {
		this.active = false;
	}
	
	this.updateHitbox();
};

Enemy.prototype.draw = function() {
	this.world.drawSprite(this.spriteName, this.x, this.y, this.width, this.height);
};

Enemy.prototype.updateHitbox = function() {
	this.hitbox = {
		x: this.x + this.hitboxMetrics.x,
		y: this.y + this.hitboxMetrics.y,
		width: this.hitboxMetrics.width,
		height: this.hitboxMetrics.height
	};
};
