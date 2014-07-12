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
	
    this.shooting = false;
    this.bulletsShot = 0;
	this.lives = 5;
	this.livesParent = options.parent.lives;
	this.parent = options.parent;
	
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
				}, this.audio));
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
				}, this.audio));
		}
	}
};

QuadrapusArm.prototype.shootStream = function(player) {
    //for (var bulletsShot = 0; bulletsShot < 25; bulletsShot++) {
    var that = this;
    if (this.bulletsShot < 25) {
            this.shotX = this.x + this.width / 2;
            this.shotY = this.y + this.height / 2;

            if (this.shotX < player.x) {
                this.world.bullets.push(
                    new this.Bullet(this.world, {
                    x: this.shotX,
                    y: this.shotY,
                    width: 20,
                    height: 20,
                    hitboxMetrics: {
                        x: 0,
                        y: 0,
                        width: 20,
                        height: 20,
                    },
                    angle: Math.atan((this.shotY - player.y) / (this.shotX - player.x)),
                    speed: 3,
                    acceleration: 0.1,
                    owner: this.type
                }, this.audio));
            } else {
                this.world.bullets.push(
                    new this.Bullet(this.world, {
                    x: this.shotX,
                    y: this.shotY,
                    width: 20,
                    height: 20,
                    hitboxMetrics: {
                        x: 0,
                        y: 0,
                        width: 20,
                        height: 20,
                    },
                    angle: Math.atan((this.shotY - player.y) / (this.shotX - player.x)) + Math.PI,
                    speed: 3,
                    acceleration: 0.1,
                    owner: this.type
                }, this.audio));

            }
            this.bulletsShot++;
    }
    /*
    if (this.bulletsShot > 24){
        setTimeout(function() {
            that.bulletsShot = 0;
        }, 3000);
    }
    */
    /*
    setTimeout(function() {
        that.shooting = false;
    }, 1000);
    */
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
		this.livesParent--;
	}
	
	if (this.lives < 1) {
		this.active = false;
	}
};
