"use strict";

var Boss = function(world, Bullet, audio) {
	this.world = world;
	
	this.spriteName = "catBoss";
	this.Bullet = Bullet;
	this.audio = audio;
	
	this.type = "enemy";
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
	this.directionShoot = "right";
	this.sound = "meow";
	this.alive = true;
	this.ate = false;
	
	/*
	this.world.healthBars.push(new HealthBar(world, this, {
			x: 350,
			lives: this.lives
	}));
	*/
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
		
		if (this.x > this.world.width - this.width - 50) {
			this.directionX = "left";
		} else if (this.x < 50) {
			this.directionX = "right";
		}
		
		if (this.y > this.world.height - this.height) {
			this.directionY = "up";
		} else if (this.y < 20) {
			this.directionY = "down";
		}
		
		if (this.x < this.world.width / 2) {
			this.directionShoot = "right";
		} else {
			this.directionShoot = "left";
		}
		
		if (Math.random() < 0.8) {
			this.audio[this.sound].stop();
			this.audio[this.sound].play();
		} else {
			this.shoot();
		}
		
		this.healthBar.update(this.lives);
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

Boss.prototype.shoot = function() {
	if (this.directionShoot === "right") {
		this.world.bullets.push(
			new this.Bullet(this.world, {
				x: (this.x + this.width / 2),
				y: (this.y + this.height / 2),
				width: 20,
				height: 20,
				direction: "right",
				speed: 5,
				acceleration: 0.1,
				owner: this.type
			}, this.audio
		));
	} else {
		this.world.bullets.push(
		new this.Bullet(this.world, {
			x: (this.x + this.width / 2),
			y: (this.y + this.height / 2),
			width: 20,
			height: 20,
			direction: "left",
			speed: 5,
			acceleration: 0.1,
			owner: this.type
		}, this.audio
	));
	}
};

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
