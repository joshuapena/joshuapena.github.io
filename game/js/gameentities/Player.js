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
	this.jumpDown = false;
	
	this.direction = "right";
	this.shootAngle = 0;
	this.type = "player";
	this.Bullet = Bullet;
	this.shootLock = false;
	this.friction = 0.8;
	this.gravity = 0.3;
	this.state = this.idleRightAnimation;
	this.shootAudio = "pewPewBizNiss";
	this.jumpAudio = "jumpFins";
	this.active = true;
	this.hit = false;
	
	this.hitboxMetrics = {
		x: 0,
		y: 0,
		width: 20,
		height: 38
	};
	
	this.hitbox = {
		x: this.x + this.hitboxMetrics.x,
		y: this.y + this.hitboxMetrics.y,
		width: this.hitboxMetrics.width,
		height: this.hitboxMetrics.height
	};
	
	this.kills = 20;
	this.lives = 10;
	
	this.myHealth = new HealthBar (world, this, {
		x: 50,
		lives: this.lives
	});
};

var keydown = [];

Player.prototype.explode = function(damage, object) {
	var that = this;
    if (object != "glitterCannon") {
	//if (!this.hit) {
        this.lives -= damage;
        this.hit = true;
	//	setTimeout(function() {
	//				that.hit = false;
	//			}, 500);
	//  } 
    }
    if (this.lives < 1) {
        console.log("You Died");
        this.active = false;
        this.myHealth.update();
        this.myHealth.draw();
    }
};

Player.prototype.update = function() {
	// Jump
	if (keydown[38]) {
		if (!this.jumping) {
			this.jumping = true;
			this.jumpDown = false;
			this.velY = -this.speed * 2;
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
	if (keydown[65] || keydown[87] || keydown[68]) {
		if (!this.shootLock) {
			this.shootLock = true;
			if (keydown[65] && keydown[87]) {
				this.shootAngle = 5 * Math.PI / 4;
			} else if (keydown[87] && keydown[68]) {
				this.shootAngle = 7 * Math.PI / 4;
			} else if (keydown[65]) {
				this.shootAngle = Math.PI;
			} else if (keydown[87]) {
				this.shootAngle = 3 * Math.PI / 2;
			} else if (keydown[68]) {
				this.shootAngle = 0;
			}
			this.shoot();
			var that = this
			setTimeout(function() {
				that.shootLock = false;
			}, 300);
		}
	}
			
	this.velX *= this.friction;
	this.velY += this.gravity;
	
	if (this.velY >= 0) {
		this.jumpDown = true;
	}
	
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
	
	this.updateHitbox();
	this.myHealth.update(this.lives);
};

Player.prototype.draw = function() {
	var that = this;
	this.state.draw(this.x, this.y, function(spriteName, x, y) {
		that.width = that.world.sprites[spriteName].width;
		that.world.drawSprite(spriteName, x, y, that.width, that.height);
	});

	this.myHealth.draw();
};

Player.prototype.midpoint = function() {
	return {
		x: (this.x + this.width / 2),
		y: (this.y + this.height / 2)
	}
};

Player.prototype.updateHitbox = function() {
	this.hitbox = {
		x: this.x + this.hitboxMetrics.x,
		y: this.y + this.hitboxMetrics.y,
		width: this.hitboxMetrics.width,
		height: this.hitboxMetrics.height
	};
};

Player.prototype.shoot = function() {
	this.world.bullets.push (
		new this.Bullet(this.world, {
			x: this.midpoint().x,
			y: this.midpoint().y - 3,
			width: 6,
			height: 6,
			hitboxMetrics: {
				x: 0,
				y: 0,
				width: 6,
				height: 6
			},
			angle: this.shootAngle,
			speed: 20,
			acceleration: 0.2,
			owner: this.type,
			kill: this
			//spriteName: 'playerBullet'
		}, this.audio
	));
};

Player.prototype.kill = function() {
	if (this.kills < 23) {
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
