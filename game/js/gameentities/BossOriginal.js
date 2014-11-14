"use strict";

var Boss = function(world, Bullet, audio) {
	this.world = world;
	
	this.spriteName = "catBoss";
	this.Bullet = Bullet;
	this.audio = audio;
	
	this.type = "boss";
	this.active = true;
	this.width = 60;
	this.height = 114;
	this.speed = 2;
	this.velX = 0;
	this.velY = 0;
	this.x = 50;
	this.y = this.world.height - this.height;
	this.directionX = "right";
	this.directionY = "up";
	this.lives = 15;
	this.shootAngle = 0;
	this.sound = "meow";
	this.alive = true;
	this.ate = false;
	
	this.hitboxMetrics = {
		x: 0,
		y: 0,
		width: 60,
		height: 114
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
}

Boss.prototype.update = function() {
	if (this.alive) {
		if (this.directionX === "right") {
			this.velX = this.speed;
		} else {
			this.velX = -this.speed;
		}
		if (this.directionY === "up") {
			this.velY = -this.speed;
		} else {
			this.velY = this.speed;
		}
		
		this.x += this.velX;
		this.y += this.velY;
		
		if (this.x > this.world.width - this.width - 35) {
			this.directionX = "left";
		} else if (this.x < 35) {
			this.directionX = "right";
		}
		
		if (this.y > this.world.height - this.height) {
			this.directionY = "up";
		} else if (this.y < 18) {
			this.directionY = "down";
		}
		
		if (this.y == this.world.height / 3) {
			this.shootArc();
		}
		
		if (this.x < this.world.width / 2) {
			this.shootAngle = 0;//"right";
		} else {
			this.shootAngle = Math.PI;//"left";
		}
		
		if (Math.random() < 0.8) {
		} else {
			this.shoot();
			if (Math.random() < 0.3) {
				if (Math.random() < 0.1) {
				}
			}
		}
		
		this.healthBar.update(this.lives);
		
		this.updateHitbox();
		
	} else {
		this.x = -400;
		this.y = -400;
	}
};

Boss.prototype.draw = function() {
	if (this.alive) {
		this.world.drawSprite(this.spriteName, this.x, this.y, this.width, this.height);
		this.healthBar.draw();
	} else {
		this.world.ctx.globalAlpha = 0.4;
		this.world.ctx.fillStyle = "#333";
		this.world.ctx.fillRect(0, 0, 600, 300);
		this.world.ctx.fillStyle = "#FFF";
		this.world.ctx.font = "50px Ubuntu Mono";
		this.world.ctx.globalAlpha = 1.0;
		this.world.ctx.fillText("You Win", 200, 150);
	}
};

Boss.prototype.updateHitbox = function() {
	this.hitbox = {
		x: this.x + this.hitboxMetrics.x,
		y: this.y + this.hitboxMetrics.y,
		width: this.hitboxMetrics.width,
		height: this.hitboxMetrics.height
	};
};

Boss.prototype.shoot = function() {
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
			angle: this.shootAngle,
			speed: 5,
			acceleration: 0.1,
			owner: this.type
		}, this.audio
	));
};

Boss.prototype.shootArc = function() {
	for (var i = Math.PI; i > 0; i -= Math.PI / 8) {
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
				speed: 5,
				acceleration: 0.1,
				owner: this.type
			}, this.audio
		));
	}
};

Boss.prototype.shootCircle = function() {
	for (var i = 0; i < 2 * Math.PI; i += Math.PI / 8) {
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
				speed: 5,
				acceleration: 0.1,
				owner: this.type
			}, this.audio
		));
	}
}

Boss.prototype.explode = function(source) {
	if (source === "bullet") {
		this.lives--;
	} else if (source === "player" && this.ate == false) {
		var that = this;
		this.ate = true;
		this.lives += 5;
		if (this.lives > 15) {
			this.lives = 15;
		}
		setTimeout(function() {
					that.ate = false;
		}, 300);
	}
	
	if (this.lives < 1) {
		this.alive = false;
	}
};
