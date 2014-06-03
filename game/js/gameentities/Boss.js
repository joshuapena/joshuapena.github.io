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
	
	if (!(Math.random() < 0.8)) {
		this.shoot();
	}
	
	this.healthBar.update(this.lives);
};

Boss.prototype.draw = function() {
	this.world.drawSprite(this.spriteName, this.x, this.y, this.width, this.height);
	this.healthBar.draw();
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

Boss.prototype.explode = function() {
	this.lives--;
	if (this.lives === 0) {
		this.active = false;
		alert("You Win");
	}
};