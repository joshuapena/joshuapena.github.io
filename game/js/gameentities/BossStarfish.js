"use strict";

var StarfishBoss = function(world, audio, options) {
	this.world = world;
	this.audio = audio;
	
	this.type = "boss";
	this.active = true;
	this.width = 125;
	this.height = 125;
	this.speed = 2;
	this.velX = 0;
	this.velY = 0;
	this.x = this.world.width / 2 - this.width;
	this.y = 0;
	this.alive = true;
	
	this.side = "right";
	this.direction = "down";
	
	this.lives = 32;
	this.secondStarfish = false;
	this.thirdStarfishOne = false;
	this.thirdStarfishTwo = false;
	
	this.hitboxMetrics = {
		x: 0,
		y: 0,
		width: 125,
		height: 125
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

StarfishBoss.prototype.update = function(player) {
	if (this.alive) {
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
	}
	
	this.healthBar.update(this.lives);
	this.updateHitbox();
};

StarfishBoss.prototype.draw = function() {
	if (this.alive) {
		this.world.drawRectangle("#EE82EE", this.x, this.y, this.width, this.height);
	}
	this.healthBar.draw();
};

StarfishBoss.prototype.updateHitbox = function() {
	this.hitbox = {
		x: this.x + this.hitboxMetrics.x,
		y: this.y + this.hitboxMetrics.y,
		width: this.hitboxMetrics.width,
		height: this.hitboxMetrics.height
	};
};

StarfishBoss.prototype.explode = function(source) {
	if (source === "bullet") {
		this.lives--;
	}
	
	if (this.lives < 23 && !this.secondStarfish) {
		this.world.addOn.push(new StarfishEnemy(this.world, {
			x: this.x + this.width / 2,
			y: this.y + this.height / 3,
			width: this.width / 2,
			height: this.height / 2,
			direction: this.direction,
			side: "right",
			lives: 5,
			parent: this,
			child: "one"
		}), new StarfishEnemy(this.world, {
			x: this.x,
			y: this.y + this.height / 3,
			width: this.width / 2,
			height: this.height / 2,
			direction: this.direction,
			side: "left",
			lives: 5,
			parent: this,
			child: "two"
		}));
		
		this.secondStarfish = true;
		this.alive = false;
		this.x = -400;
		this.y = -400;
	}
	
	if (this.thirdStarfishOne) {
		this.world.addOn.push(new StarfishEnemy(this.world, {
			x: this.leftX + this.width / 2,
			y: this.leftY + this.height / 3,
			width: this.width / 4,
			height: this.height / 4,
			direction: this.direction,
			side: "right",
			lives: 3,
			parent: this
		}), new StarfishEnemy(this.world, {
			x: this.leftX,
			y: this.leftY + this.height / 3,
			width: this.width / 4,
			height: this.height / 4,
			direction: this.direction,
			side: "left",
			lives: 3,
			parent: this
		}));
		this.thirdStarfishOne = false;
	}

	if (this.thirdStarfishTwo) {
		this.world.addOn.push(new StarfishEnemy(this.world, {
			x: this.rightX + this.width / 2,
			y: this.rightY + this.height / 3,
			width: this.width / 4,
			height: this.height / 4,
			direction: this.direction,
			side: "right",
			lives: 3,
			parent: this
		}), new StarfishEnemy(this.world, {
			x: this.rightX,
			y: this.rightY + this.height / 3,
			width: this.width / 4,
			height: this.height / 4,
			direction: this.direction,
			side: "left",
			lives: 3,
			parent: this
		}));
		this.thirdStarfishTwo = false;
	}
	
	if (this.lives < 1) {
		this.active = false;
	}
};
