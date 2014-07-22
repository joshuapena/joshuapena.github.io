"use strict";

var QuadrapusBoss = function(world, Bullet, audio, Explosion) {
	this.world = world;
	this.Explosion = Explosion;
	
	this.spriteName = null;//"quadrapusBoss";
	this.Bullet = Bullet;
	this.audio = audio;
	
	this.type = "boss";
	this.active = true;
	this.width = 114;
	this.height = 114;
	this.x = this.world.width / 2 - this.width / 2;
	this.y = this.world.height - this.height - 100;
	
	this.hitboxMetrics = {
		x: 0,
		y: 0,
		width: 114,
		height: 114
	};
	
	this.hitbox = {
		x: this.x + this.hitboxMetrics.x,
		y: this.y + this.hitboxMetrics.y,
		width: this.hitboxMetrics.width,
		height: this.hitboxMetrics.height
	};

	this.cannonFired = false;
    this.streamReset = false;
	
	this.armUpperRight = new QuadrapusArm(this.world, Bullet, {
		x: this.x + this.width,
		y: this.y + 40,
		width: 100,
		side: "right",
		section: "upper",
		parent: this
	}, this.audio);
	this.armUpperLeft = new QuadrapusArm(this.world, Bullet, {
		x: this.x - 100,
		y: this.y + 40,
		width: 100,
		side: "left",
		section: "upper",
		parent: this
	}, this.audio);
	this.armLowerRight = new QuadrapusArm(this.world, Bullet, {
		x: this.x + this.width,
		y: this.y + 100,
		width: 80,
		side: "right",
		section: "lower",
		parent: this
	}, this.audio);
	this.armLowerLeft = new QuadrapusArm(this.world, Bullet, {
		x: this.x - 80,
		y: this.y + 100,
		width: 80,
		side: "left",
		section: "lower",
		parent: this
	}, this.audio);
	
	this.world.addOn.push(this.armUpperRight, this.armUpperLeft, this.armLowerRight, this.armLowerLeft);
	
	this.lives = 35;
	
	this.healthBar = new HealthBar(world, this, {
		x: 350,
		lives: this.lives
	});
};

QuadrapusBoss.prototype.update = function (player) {
    var that = this;

    // The Shooting Pattern for the Upper Left Arm
    if (this.armUpperLeft.bulletsShot === 0) {
        var shootStream = setInterval(function() {
            that.armUpperLeft.shootStream(player);
        }, 3000);
    }// else {
    if ((this.armUpperLeft.bulletsShot > 24) && !this.streamReset) {
        this.streamReset = true;
        clearInterval(shootStream);
        setTimeout(function() {
            that.armUpperLeft.bulletsShot = 0;
            that.streamReset = false;
        }, 2000);
    }
    //}
    //console.log(this.world.bullets.length);
    /*
	if (Math.random() < 0.5) {
		if (Math.random() < 0.5) {
			if (Math.random() < 0.01) {
				if (this.armUpperRight.active) {
					this.armUpperRight.shotArc(0, Math.PI, Math.PI / 8);
				}
			} else if (Math.random() < 0.01) {
				this.shotCircle();
			}
		} else {
			if (Math.random() < 0.91) {
				if (this.armUpperLeft.active && !this.armUpperLeft.shooting) {
                    this.armUpperLeft.shooting = true;
					this.armUpperLeft.shootStream(player);
				}
			} else if (Math.random() < 0.01) {
				this.shotCircle();
			}
		}
	} else {
		if (Math.random() < 0.5) {
			if (Math.random() < 0.01) {
				if (this.armLowerRight.active) {
					this.armLowerRight.shotArc(Math.PI / 2, -Math.PI / 2, -Math.PI / 8);
				}
			} else if (Math.random() < 0.01) {
				this.shotCircle();
			}
		} else {
			if (Math.random() < 0.01) {
				if (this.armLowerLeft.active) {
					this.armLowerLeft.shotArc(Math.PI / 2, 3 * Math.PI / 2, Math.PI / 8);
				}
			} else if (Math.random() < 0.012) {
				this.shotCircle();
			}
		}
	}
    */

   // the Fighting Pattern for the Quadrapus Body
	if (!this.cannonFired) {
        this.cannonFired = true;
        var that = this;
        setTimeout(function() {
            if (that.world.explosions.length + that.world.addOn.length < 5) {
                that.world.addOn.push(new GlitterCannon(that.world, that.audio, that.Explosion, {
                    x: that.x + that.width / 2,
                    y: that.y + that.height / 2,
                    parent: that
                }));
            }
        }, 1000);
    }

	this.healthBar.update(this.lives);
	this.updateHitbox();
};

QuadrapusBoss.prototype.draw = function() {
	if (this.spriteName === null) {
		this.world.drawRectangle("#580058", this.x, this.y, this.width, this.height);
	} else {
		this.world.drawSprite(this.spriteName, this.x, this.y, this.width, this.height);
	}
	this.healthBar.draw();
};

QuadrapusBoss.prototype.shotCircle = function() {
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
				speed: 3,
				acceleration: 0.1,
				owner: this.type
			}, this.audio
		));
	}
};

QuadrapusBoss.prototype.updateHitbox = function() {
	this.hitbox = {
		x: this.x + this.hitboxMetrics.x,
		y: this.y + this.hitboxMetrics.y,
		width: this.hitboxMetrics.width,
		height: this.hitboxMetrics.height
	};
};

QuadrapusBoss.prototype.explode = function(source) {
	if (source === "bullet") {
		this.lives--;
	}
	
	if (this.lives < 1) {
		this.active = false;
		this.world.platforms.forEach(
			function(platform) {
				platform.active = false;
			}
		);
        this.world.addOn.forEach(
            function(arm) {
                arm.active = false;
            }
        );
	}
};
