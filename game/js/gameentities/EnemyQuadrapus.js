"use strict";

var QuadrapusEnemy = function(world, options, audio) {
	this.world = world;
	this.audio = audio;
	
	this.spriteName = options.spriteName || null;
	this.color = "#00FFFF";
	
	this.side = options.side;
	this.type = "enemy";
	this.active = true;
	this.width = 55;
	this.height = 30;
	this.speed = 1.4;
	this.velX = 0;
	this.velY = 0;
	if (this.side === "right") {
		this.x = -this.width;
	} else {
		this.x = this.world.width + this.width;
	}
	this.direction = "down";
	this.y = this.world.height / 2 - this.width / 2;
	
	this.hitboxMetrics = {
		x: 0,
		y: 0,
		width: 55,
		height: 30
	};
	
	this.hitbox = {
		x: this.x + this.hitboxMetrics.x,
		y: this.y + this.hitboxMetrics.y,
		width: this.hitboxMetrics.width,
		height: this.hitboxMetrics.height
	};
};

QuadrapusEnemy.prototype.explode = function(source) {
	this.active = false;
};

QuadrapusEnemy.prototype.update = function() {
	if (this.side === "right") {
		this.velX = this.speed;
	} else {
		this.velX = -this.speed;
	}
	
	if (this.direction === "down") {
		this.velY = 0.5;
		if (this.y > this.world.height / 2 + this.height / 2) {
			this.direction = "up";
		}
	} else {
		this.velY = -0.5;
		if (this.y < this.world.height / 2 - this.width / 2) {
			this.direction = "down";
		}
	}
	
	this.x += this.velX;
	this.y += this.velY;
	
	if (this.side === "right" && this.x > this.world.width) {
		this.active = false;
	} else if (this.side === "left" && this.x < -this.width) {
		this.active = false;
	}

	this.updateHitbox();
};

QuadrapusEnemy.prototype.draw = function() {
	if (this.spriteName === null) {
		this.world.drawRectangle(this.color, this.x, this.y, this.width, this.height);
	} else {
		this.world.drawSprite(this.spriteName, this.x, this.y, this.width, this.height);
	}
};

QuadrapusEnemy.prototype.updateHitbox = function() {
	this.hitbox = {
		x: this.x + this.hitboxMetrics.x,
		y: this.y + this.hitboxMetrics.y,
		width: this.hitboxMetrics.width,
		height: this.hitboxMetrics.height
	};
};
