"use strict";

var Player = function(world, Bullet, audio) {
	this.world = world;
	this.audio = audio;
	this.idleLeftAnimation = new SpriteAnimation("connor/connorL", 2, 1, 32);
	this.idleRightAnimation = new SpriteAnimation("connor/connorR", 2, 1, 32);
	this.walkLeftAnimation = new SpriteAnimation("connor/connorL", 2, 3, 32);
	this.walkRightAnimation = new SpriteAnimation("connor/connorR", 2, 3, 32);
	this.shootLeftAnimation = new SpriteAnimation("connor/connorL", 1, 5, 32);
	this.shootRightAnimation = new SpriteAnimation("connor/connorR", 1, 5, 32);
	this.jumpLeftAnimation = new SpriteAnimation("connor/connorL", 1, 6, 32);
	this.jumpRightAnimation = new SpriteAnimation("connor/connorR", 1, 6, 32);
	this.width = 20;
	this.height = 38;
	this.x = this.world.width / 2;
	this.y = this.world.height - this.height;
	this.speed = 3;
	this.velX = 0;
	this.velY = 0;
	this.jumping = false;
	this.direction = "right";
	this.type = "player";
	this.Bullet = Bullet;
	this.shootLock = false;
	this.friction = 0.8;
	this.gravity = 0.3;
	this.state = this.idleRightAnimation;
	this.shootAudio = "pewPewBizNiss";
	this.jumpAudio = "jumpFins";
	this.alive = true;
	
	this.kills = 0;
	this.lives = 10;
	
	this.myHealth = new HealthBar (world, this, {
		x: 50,
		lives: this.lives
	});
};

var keydown = [];

Player.prototype.explode = function() {
	//alert("You died");
	if (this.kills > 1 && this.kills < 24) {
		this.kills--;
	} else {
		this.lives--;
		if (this.lives == 0) {
			this.alive = false;
		}
	}
};

Player.prototype.update = function() {
	// Jump
	if (keydown[38]) {
		if (!this.jumping) {
			this.jumping = true;
			this.velY = -this.speed * 2;
			this.audio[this.jumpAudio].stop();
			this.audio[this.jumpAudio].play();
		}
	}
	
	// Right
	if (keydown[39]) {
		if (this.velX < this.speed) {
			this.velX++;
			this.direction = "right";
		}
	}
	
	// Left
	if (keydown[37]) {
		if (this.velX > -this.speed) {
			this.velX--;
			this.direction = "left";
		}
	}
	
	// Shoot
	if (keydown[32]) {
		if (!this.shootLock) {
			this.shoot();
			this.shootLock = true;
			var that = this
			setTimeout(function() {
				that.shootLock = false;
			}, 300);
		}
	}
	
	this.velX *= this.friction;
	this.velY += this.gravity;
	
	this.x += this.velX;
	this.y += this.velY;
	
	if (this.x >= this.world.width - this.width) {
		this.x = this.world.width - this.width;
	} else if (this.x <= 0) {
		this.x = 0;
	}
	
	if (this.y >= this.world.height - this.height) {
		this.y = this.world.height - this.height;
		this.jumping = false;
	}
	
	if (this.jumping) {
		if (this.direction === "right") {
			this.state = this.jumpRightAnimation;
		} else {
			this.state = this.jumpLeftAnimation;
		}
	} else if (this.shootLock) {
		if (this.direction === "right") {
			this.state = this.shootRightAnimation;
		} else {
			this.state = this.shootLeftAnimation;
		}
	} else if (keydown[37]) {
		this.state = this.walkLeftAnimation;
	} else if (keydown[39]) {
		this.state = this.walkRightAnimation;
	} else {
		if (this.direction === "right") {
			this.state = this.idleRightAnimation;
		} else {
			this.state = this.idleLeftAnimation;
		}
	}
	
	if (this.kills >= 24) {
		this.myHealth.update(this.lives);
	}
};

Player.prototype.draw = function() {
	var that = this;
	if (this.alive) {
		this.state.draw(this.x, this.y, function(spriteName, x, y) {
			that.width = that.world.sprites[spriteName].width;
			that.world.drawSprite(spriteName, x, y, that.width, that.height);
		});
	} else {
		this.world.ctx.globalAlpha = 0.4;
		this.world.ctx.fillStyle = "#333";
		this.world.ctx.fillRect(0, 0, 600, 300);
		this.world.ctx.fillStyle = "#FFF";
		this.world.ctx.font = "50px Ubuntu Mono";
		this.world.ctx.fillText("Game Over", 300, 150);
	}
	//this.world.drawSprite(this.currentImage, this.x, this.y, this.width, this.height);
	//this.world.drawText("Happy Anniversary", 115, 90);
	if (this.kills < 24) {
		this.world.cropSprite("coverTurtleWithACrown", this.kills, this.kills, 384 - this.kills * 2, 46 - this.kills * 2, 115 + this.kills, 55 + this.kills, 384 - this.kills * 2, 46 - this.kills * 2);
	}
	
	if (this.kills >= 24 && this.alive) {
		this.myHealth.draw();
	}
};

Player.prototype.midpoint = function() {
	return {
		x: (this.x + this.width / 2),
		y: (this.y + this.height / 2)
	}
};

Player.prototype.shoot = function() {
	this.world.bullets.push (
		new this.Bullet(this.world, {
			x: this.midpoint().x,
			y: this.midpoint().y - 1,
			width: 9,
			height: 3,
			direction: this.direction,
			speed: 20,
			acceleration: 0.2,
			owner: this.type,
			kill: this
			//spriteName: 'playerBullet'
		}, this.audio
	));
	this.audio[this.shootAudio].stop();
	this.audio[this.shootAudio].play();
};

Player.prototype.kill = function() {
	if (this.kills < 24) {
		this.kills++;
	} /*
	else if (this.kills == 24) {
		this.myHealth = new HealthBar (world, this, {
			x: 50,
			lives: this.lives
		});
		this.kills++;
	}
	*/
};

document.body.addEventListener("keydown", function(e) {
	keydown[e.keyCode] = true;
});

document.body.addEventListener("keyup", function(e) {
	keydown[e.keyCode] = false;
});
