"use strict";

var StarfishEnemy = function(world, options) {
	this.world = world;
	
	// Given by options
	this.x = options.x;
	this.y = options.y;
	this.width = options.width || 30;
	this.height = options.height || 30;
	this.direction = options.direction;
	this.side = options.side;
	this.lives = options.lives;
	this.parent = options.parent || null;
	this.trigger = options.trigger || null;
	this.child = options.child || null;
	
	this.velX = 0;
	this.velY = 0;
	this.speed = 2;
	this.active = true;
	
	this.hitboxMetrics = {
		x: 0,
		y: 0,
		width: this.width,
		height: this.height,
	};
	
	this.hitbox = {
		x: this.x + this.hitboxMetrics.x,
		y: this.y + this.hitboxMetrics.y,
		width: this.hitboxMetrics.width,
		height: this.hitboxMetrics.height
	};
};

StarfishEnemy.prototype.update = function() {
	if (this.side === "right") {
		this.velX = this.speed;
	} else if (this.side === "left") {
		this.velX = -this.speed;
	}
	
	if (this.direction === "down") {
		this.velY = this.speed;
	} else if (this.direction === "up") {
		this.velY = -this.speed;
	}
	
	this.x += this.velX;
	this.y += this.velY;
	
	if (this.x > this.world.width - this.width) {
		this.x = this.world.width - this.width;
		this.side = "left";
	} else if (this.x < 0) {
		this.x = 0;
		this.side = "right";
	}
	
	if (this.y > this.world.height - this.height) {
		this.y = this.world.height - this.height;
		this.direction = "up";
	} else if (this.y < 0) {
		this.y = 0;
		this.direction = "down";
	}

	this.updateHitbox();
};

StarfishEnemy.prototype.draw = function() {
	this.world.drawRectangle("#EE82EE", this.x, this.y, this.width, this.height);
};

StarfishEnemy.prototype.explode = function(source) {
	if (source === "bullet") {
		this.lives--;
	}
	
	if (this.lives < 1) {
		this.active = false;
		if (this.parent === null) {
		} else {
			if (this.child === "one") {
				this.parent.thirdStarfishOne = true;
				this.parent.leftX = this.x;
				this.parent.leftY = this.y;
			} else if (this.child === "two") {
				this.parent.thirdStarfishTwo = true;
				this.parent.rightX = this.x;
				this.parent.rightY = this.y;
			}
		}
	}
};

StarfishEnemy.prototype.updateHitbox = function() {
	this.hitbox = {
		x: this.x + this.hitboxMetrics.x,
		y: this.y + this.hitboxMetrics.y,
		width: this.hitboxMetrics.width,
		height: this.hitboxMetrics.height
	};
};
