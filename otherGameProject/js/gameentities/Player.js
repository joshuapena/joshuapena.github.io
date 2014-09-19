"use strict";

var Player = function(world, Bullet, audio) {
	this.world = world;
	this.audio = audio;
	this.jumpAnimation = new SpriteAnimation("joshua/joshua", 1, 2, 32);
	this.walkAnimation = new SpriteAnimation("joshua/joshua", 2, 3, 32);
	this.width = 80;
	this.height = 128
	this.x = this.world.width / 10;
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
	this.gravity = 0.4;
	this.state = this.walkAnimation;
	//this.shootAudio = "pewPewBizNiss";
	//this.jumpAudio = "jumpFins";
	this.active = true;
	this.hit = false;
	
	this.hitboxMetrics = {
		x: 0,
		y: 0,
		width: this.width,
		height: this.height
	};
	
	this.hitbox = {
		x: this.x + this.hitboxMetrics.x,
		y: this.y + this.hitboxMetrics.y,
		width: this.hitboxMetrics.width,
		height: this.hitboxMetrics.height
	};
	
	this.score = 0;
	this.lives = 10;
};

var keydown = [];

Player.prototype.explode = function(damage, object) {
	var that = this;
	if (!this.hit) {
        this.lives -= damage;
        this.hit = true;
		setTimeout(function() {
            that.hit = false;
        }, 500);
    } 
    if (this.lives < 1) {
        console.log("You Died");
        this.active = false;
    }
};

Player.prototype.update = function() {
	// Jump
	if (keydown[38]) {
		if (!this.jumping) {
			this.jumping = true;
			this.jumpDown = false;
			this.velY = -this.speed * 4 + 0.68;
			//this.audio[this.jumpAudio].stop();
			//this.audio[this.jumpAudio].play();
		}
	}
	
	// Shoot
	if (keydown[32] && !this.shootLock) {
        this.shootLock = true;
        this.shoot();
        var that = this;
        setTimeout(function() {
            that.shootLock = false;
        }, 525); 
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
        this.state = this.jumpAnimation;
	} else {
        this.state = this.walkAnimation;
	}
	
	this.updateHitbox();
};

Player.prototype.draw = function() {
	var that = this;
	this.state.draw(this.x, this.y, function(spriteName, x, y) {
		that.width = that.world.sprites[spriteName].width;
		that.height = that.world.sprites[spriteName].height;
		that.world.drawSprite(spriteName, x, y, that.width, that.height);
	});

    this.world.ctx.fillStyle = "#FFF";
    this.world.ctx.font = "30px Ubunto Mono";
    this.world.ctx.fillText("Score : " + this.score, 425, 60);
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
			x: this.midpoint().x + 20,
			y: this.midpoint().y + 19,
			width: 20,
			height: 20,
			hitboxMetrics: {
				x: 0,
				y: 0,
				width: 20,
				height: 20
			},
			angle: this.shootAngle,
			speed: 15,
			acceleration: 0.001,
			owner: this.type,
			kill: this,
            bulletColor: Math.floor(Math.random() * 3)
			//spriteName: 'playerBullet'
		}, this.audio
	));

    //this.audio[this.shootAudio].stop();
	//this.audio[this.shootAudio].play();
};

Player.prototype.kill = function() {
    this.score++;
};

document.body.addEventListener("keydown", function(e) {
	keydown[e.keyCode] = true;
});

document.body.addEventListener("keyup", function(e) {
	keydown[e.keyCode] = false;
});
