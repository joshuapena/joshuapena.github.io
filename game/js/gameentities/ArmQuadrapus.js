"use strict";

var QuadrapusArm = function(world, Bullet, options, audio) {
	this.world = world;
	this.color = options.color || "#800080";
	this.Bullet = Bullet;
	this.audio = audio;
	this.spriteName = options.spriteName || null;
	
	this.type = "boss";
	this.active = true;
	this.width = options.width;
	this.height = 13;
	this.x = options.x;
	this.y = options.y;
	this.side = options.side;
	this.section = options.section;
	
	this.lives = 7;
	
	this.hitboxMetrics = {
		x: 0,
		y: 0,
		width: 90,
		height: 13
	};
	
	this.hitbox = {
		x: this.x + this.hitboxMetrics.x,
		y: this.y + this.hitboxMetrics.y,
		width: this.hitboxMetrics.width,
		height: this.hitboxMetrics.height
	};
};

QuadrapusArm.prototype.update = function() {
	this.updateHitbox();
};

QuadrapusArm.prototype.shotArc = function(start, end, step) {
	if (start < end) {
		for (var i = start; i < end; i += step) {
			this.world.bullets.push(
				new this.Bullet(this.world, {
					x: (this.x + this.width / 2),
					y: (this.y + this.height / 2),
					width: 20,
					height: 20,
					hitboxMetrics: {
						x: 0,
						y: 0,
						width: 20,
						height: 20
					},
					angle: i,
					speed: 3,
					acceleration: 0.1,
					owner: this.type
				}, this.audio
			));
		}
	} else {
		for (var i = start; i > end; i += step) {
			this.world.bullets.push(
				new this.Bullet(this.world, {
					x: (this.x + this.width / 2),
					y: (this.y + this.height / 2),
					width: 20,
					height: 20,
					hitboxMetrics: {
						x: 0,
						y: 0,
						width: 20,
						height: 20
					},
					angle: i,
					speed: 3,
					acceleration: 0.1,
					owner: this.type
				}, this.audio
			));
		}
	}
};

QuadrapusArm.prototype.draw = function() {
	if (this.spriteName === null) {
		this.world.drawRectangle(this.color, this.x, this.y, this.width, this.height);
	} else {
		this.world.drawSprite(this.spriteName, this.x, this.y, this.width, this.height);
	}
};

QuadrapusArm.prototype.updateHitbox = function() {
	this.hitbox = {
		x: this.x + this.hitboxMetrics.x,
		y: this.y + this.hitboxMetrics.y,
		width: this.hitboxMetrics.width,
		height: this.hitboxMetrics.height
	};
};

QuadrapusArm.prototype.explode = function(source) {
	if (source === "bullet") {
		this.lives--;
	}
	
	if (this.lives < 1) {
		this.active = false;
	}
};
