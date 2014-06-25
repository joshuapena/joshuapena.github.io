"use strict";

var FrogBoss = function(world, Bullet, audio) {
	this.world = world;
	
	this.spriteName = null; //"frogBoss";
	this.Bullet = Bullet;
	this.audio = audio;
	
	this.type = "boss";
	this.active = true;
	this.width = 100;
	this.height = 100;
	this.speed = 2;
	this.velX = 0;
	this.velY = 0;
	this.x = this.world.width / 2 - this.width / 2;
	this.y = -this.height;
	this.gravityInital = 0.3;
	this.gravityFinal = 0.5;
	this.frictionInital = 0.9;
	this.frictionFinal = 0.86;
	
	this.landed = false;
	
	this.lives = 15;
	
	this.hitboxMetrics = {
		x: 0,
		y: 0,
		width: 100,
		height: 100
	};
	
	this.hitbox = {
		x: this.x + this.hitboxMetrics.x,
		y: this.y + this.hitboxMetrics.y,
		width: this.hitboxMetrics.width,
		height: this.hitboxMetrics.height
	};
	
	this.healthBar = new HealthBar(world, this, {
		x: 350,
		lives: this.lives
	});
};

FrogBoss.prototype.update = function(player) {	
	if (this.landed) {
		var that = this;
		setTimeout(function() {
			that.velY = -5;
			that.landed = false;
		}, 450);
	}
	
	if (this.velY < 0) {
		if (player.x + player.width / 2 < this.x + this.width / 2) {
			if (this.velX > -this.speed) {
				this.velX--;
			}
		} else if (player.x + player.width / 2 == this.x + this.width / 2) {
			this.velX = 0;
		} else {
			if (this.velX < this.speed) {
				this.velX++;
			}
		}
		this.velY += this.gravityInital;
		this.velX *= this.frictionInital;
	} else {
		this.velX *= this.frictionFinal;
		this.velY += this.gravityFinal;
	}

	this.x += this.velX;
	this.y += this.velY;
	
	if (this.x < 0) {
		this.x = 0;
	} else if (this.x > this.world.width - this.width) {
		this.x = this.world.width - this.width;
	}
	
	if (this.y > this.world.height - this.height) {
		this.y = this.world.height - this.height;
		this.landed = true;
	}
	
	this.healthBar.update(this.lives);
	this.updateHitbox();
};

FrogBoss.prototype.draw = function() {
	if (this.spriteName === null) {
		this.world.drawRectangle("#008000", this.x, this.y, this.width, this.height);
	} else {
		this.world.drawSprite(this.spriteName, this.x, this.y, this.width, this.height);
	}
	this.healthBar.draw();
};

FrogBoss.prototype.updateHitbox = function() {
	this.hitbox = {
		x: this.x + this.hitboxMetrics.x,
		y: this.y + this.hitboxMetrics.y,
		width: this.hitboxMetrics.width,
		height: this.hitboxMetrics.height
	};
};

FrogBoss.prototype.explode = function(source) {
	if (source === "bullet") {
		this.lives--;
	}
	
	if (this.lives < 1) {
		this.active = false;
	}
};
