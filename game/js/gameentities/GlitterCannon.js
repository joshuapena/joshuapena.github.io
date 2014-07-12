"use strict";

var GlitterCannon = function(world, audio, Explosion, options) {
	this.world = world;
	this.Bullet = Bullet;
	this.audio = audio;
	this.Explosion = Explosion;

	this.color = options.color || "#FF0000";
	
	this.x = options.x;
	this.y = options.y;
	this.parent = options.parent;
	this.width = 44;
	this.height = 44;
	this.radiusOutside = 20;
	this.radiusInside = 10;
	this.active = true;
	this.velX = 0;
	this.velY = 0;
	this.speed = 1.5;
    this.object = "glitterCannon";
    this.type = "boss";

	this.shooting = false;

	this.hitboxMetrics = {
		x: 0,
		y: 0,
		width: 0,
		height: 0
	};
	this.hitbox = {
		x: this.x + this.hitboxMetrics.x,
		y: this.y + this.hitboxMetrics.y,
		width: this.hitboxMetrics.width,
		height: this.hitboxMetrics.height
	};
};

GlitterCannon.prototype.update = function(player) {
	if (!this.shooting) {
		if (player.x + player.width / 2 < this.x) {
			if (this.velX > -this.speed) {
				this.velX -= 0.5;
			}
		} else if (player.x + player.width / 2 > this.x) {
			if (this.velX < this.speed) {
				this.velX += 0.5;
			}
		} else {
			this.velX = 0;
		}

		if (player.y + player.height / 2 < this.y) {
			if (this.velY > -this.speed) {
				this.velY -= 0.5;
			}
		} else if (player.y + player.height / 2 > this.y) {
			if (this.velY < this.speed) {
				this.velY += 0.5;
			}
		} else {
			this.velY = 0;
		}
	} else {
		var that = this;
		this.velX = 0;
		this.velY = 0;
		setTimeout(function() {
			that.explode("self");
		}, 750);
	}

	this.x += this.velX;
	this.y += this.velY;

	this.updateHitbox();
};

GlitterCannon.prototype.draw = function() {
	this.world.drawCircle(this.color, this.x, this.y, this.radiusOutside, 0, 2 * Math.PI);
	this.world.drawCircle(this.color, this.x, this.y, this.radiusInside, 0, 2 * Math.PI);
	this.world.drawRectangle(this.color, this.x - 2, this.y - 22, 4, 44);
	this.world.drawRectangle(this.color, this.x - 22, this.y - 2, 44, 4);
};

GlitterCannon.prototype.explode = function(source) {
	if (source === "player") {
		this.shooting = true;
	}

	if (source === "self") {
		this.active = false;
		this.world.explosions.push(new this.Explosion(this.world, this.audio, {
			x: this.x - 50,
			y: this.y - 50,
			width: 100,
			height: 100,
			parent: this.parent
		}));
	}
};

GlitterCannon.prototype.updateHitbox = function() {
	this.hitbox = {
		x: this.x + this.hitboxMetrics.x,
		y: this.y + this.hitboxMetrics.y,
		width: this.hitboxMetrics.width,
		height: this.hitboxMetrics.height
	};
};
